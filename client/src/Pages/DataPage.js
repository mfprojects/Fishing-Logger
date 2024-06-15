import * as React from 'react';
import Box from '@mui/material/Box';
import './Waves.css';  // Import the waves.css file
import PageWrapper from '../Components/PageWrapper';
import { BarChart } from '@mui/x-charts/BarChart';
const DataPage = () => {

  return (
    <PageWrapper>
        <Box 
            sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            height: '90vh', 
            width: '100%' 
            }}>

            <BarChart
            series={[
            { data: [35, 44, 24, 34] },
            { data: [51, 6, 49, 30] },
            { data: [15, 25, 30, 50] },
            { data: [60, 50, 15, 25] },
            ]}
            height={290}
            xAxis={[{ data: ['Q1', 'Q2', 'Q3', 'Q4'], scaleType: 'band' }]}
            margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
            />
            
        </Box>
    </PageWrapper>
  );
};

export default DataPage;
