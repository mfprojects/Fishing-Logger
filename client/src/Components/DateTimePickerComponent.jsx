// imports
import React from 'react';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import TextField from '@mui/material/TextField';

const DateTimePickerComponent = ({ value, onChange }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DateTimePicker
        ampm={false}
        renderInput={(props) => <TextField {...props} fullWidth />}
        label="Date & Time"
        value={value}
        //Denne gjorde den til max størrelse, eneste måten
        slotProps={{ textField: { fullWidth: true } }}
        onChange={onChange}
      />
    </LocalizationProvider>
  );
};

export default DateTimePickerComponent;
