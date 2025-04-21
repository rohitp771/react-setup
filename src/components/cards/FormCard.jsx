import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Paper } from '@mui/material';

const FormCard = ({ card, onSubmit }) => {
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
      <Typography variant="h6" gutterBottom>
        {card.title}
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate>
        {card.fields.map((field) => (
          <TextField
            key={field.name}
            label={field.label}
            name={field.name}
            value={formData[field.name] || ''}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
        ))}

        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
        >
          Submit
        </Button>
      </Box>
    </Paper>
  );
};

export default FormCard;
