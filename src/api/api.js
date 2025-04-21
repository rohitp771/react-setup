import axios from 'axios';

export const fetchSectionData = async () => {
  const [configRes, contentRes] = await Promise.all([
    axios.get('/sectionConfig.json'),
    axios.get('/getNextSectionAPI.json'),
  ]);

  // logic to filter using contentRes.data.fields
  return {
    sectionConfig: configRes.data,
    currentStep: contentRes.data.currentStep,
  };
};
  
export const saveSectionData = (currentStep, data) => {
  return axios.post(`/api/sections/${currentStep}/save`, data, {
    headers: { 'Content-Type': 'application/json' },
  })
  .then(res => res.data);
};


export const dummySaveSectionData = async (currentStep, data) => {
  return new Promise((resolve) => {
    console.log('Saving Section Data:', { currentStep, data });

    setTimeout(() => {
      // Simulate next section config coming from backend after save
      resolve({
        currentStep: "PERSONAL_INFO",
        fields:["firstName","phone"]
      });
    }, 3000);
  });
};
  