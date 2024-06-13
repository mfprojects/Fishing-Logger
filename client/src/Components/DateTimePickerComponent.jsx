//imports
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
          TextField={(props) => <TextField {...props} />}
          label="Date & Time"
          value={value}
          onChange={onChange}
        />
      </LocalizationProvider>
    );
  };

export default DateTimePickerComponent