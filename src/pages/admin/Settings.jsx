import React, { useState } from 'react';
import {
  Container,
  Typography,
  Grid,
  Paper,
  TextField,
  Button,
  Switch,
  FormControlLabel,
} from '@mui/material';

export default function Settings() {
  const [settings, setSettings] = useState({
    libraryName: 'Government Polytechnic College Library',
    maxBooksPerUser: 5,
    loanDuration: 14,
    lateFeePerDay: 0.50,
    enableEmailNotifications: true,
    enableSmsNotifications: false,
  });

  const handleChange = (event) => {
    const { name, value, checked } = event.target;
    setSettings({
      ...settings,
      [name]: event.target.type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Here you would typically save the settings to your backend
    console.log('Settings saved:', settings);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        System Settings
      </Typography>
      <Paper sx={{ p: 3 }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                disabled="true"
                label="Library Name"
                name="libraryName"
                value={settings.libraryName}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Max Books Per User"
                name="maxBooksPerUser"
                type="number"
                value={settings.maxBooksPerUser}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Loan Duration (days)"
                name="loanDuration"
                type="number"
                value={settings.loanDuration}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Late Fee Per Day"
                name="lateFeePerDay"
                type="number"
                value={settings.lateFeePerDay}
                onChange={handleChange}
                InputProps={{
                  startAdornment: <Typography>$</Typography>,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.enableEmailNotifications}
                    onChange={handleChange}
                    name="enableEmailNotifications"
                    color="primary"
                  />
                }
                label="Enable Email Notifications"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.enableSmsNotifications}
                    onChange={handleChange}
                    name="enableSmsNotifications"
                    color="primary"
                  />
                }
                label="Enable SMS Notifications"
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary">
                Save Settings
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
}