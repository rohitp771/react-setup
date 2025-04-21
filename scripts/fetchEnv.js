import { SSM } from 'aws-sdk';
import { writeFileSync } from 'fs';
import dotenv from 'dotenv';
import process from 'process';

dotenv.config();

const ssm = new SSM({ region: process.env.AWS_REGION || 'ap-south-1' });

// No envName — parameter path is hardcoded per environment config
const parameterPath = `/my-app/`;

const fetchParameters = async () => {
  const params = {
    Path: parameterPath,
    Recursive: true,
    WithDecryption: true,
  };

  let result = [];
  let nextToken = null;

  do {
    const response = await ssm.getParametersByPath({ ...params, NextToken: nextToken }).promise();
    result = result.concat(response.Parameters);
    nextToken = response.NextToken;
  } while (nextToken);

  return result;
};

const buildEnvFile = async () => {
  const parameters = await fetchParameters();

  if (parameters.length === 0) {
    console.error(`❌ No parameters found at ${parameterPath}`);
    process.exit(1);
  }

  const envContent = parameters
    .map((param) => {
      const key = param.Name.split('/').pop().toUpperCase();
      return `VITE_${key}=${param.Value}`;
    })
    .join('\n');

  writeFileSync('.env', envContent);
  console.log(`✅ .env file generated`);
};

buildEnvFile().catch((err) => {
  console.error('❌ Error generating .env file:', err);
  process.exit(1);
});
