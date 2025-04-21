import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveUserData } from '../redux/slices/userSlice';
import { useTranslation } from 'react-i18next';
import { Button, Typography, Box } from '@mui/material';
import CustomTextField from '../components/CustomTextField';

const AboutYourself = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const status = useSelector((state) => state.user.status);

  const [formData, setFormData] = useState({ name: '', email: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    dispatch(saveUserData(formData));
  };

  return (
    <Box sx={{ maxWidth: 400, margin: 'auto', mt: 4 }}>
      <Typography variant="h5" gutterBottom>{t('aboutYourself')}</Typography>
      <CustomTextField
        label={t('name')}
        name="name"
        value={formData.name}
        onChange={handleChange}
      />
      <CustomTextField
        label={t('email')}
        name="email"
        value={formData.email}
        onChange={handleChange}
      />
      <Button variant="contained" onClick={handleSubmit} disabled={status === 'loading'}>
        {t('submit')}
      </Button>
    </Box>
  );
};

export default AboutYourself;
