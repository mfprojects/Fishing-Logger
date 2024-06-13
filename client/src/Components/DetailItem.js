import React from 'react';
import { Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const DetailItem = ({ label, value }) => {
  const theme = useTheme();
  return (
    <Typography component="div" sx={{ marginBottom: '0.5em' }}>
      <Box component="span" sx={{ fontWeight: theme.typography.fontWeightBold }}>{`${label}: `}</Box>
      <Box component="span" sx={{ fontWeight: theme.typography.fontWeightRegular }}>{value}</Box>
    </Typography>
  );
};

export default DetailItem;
