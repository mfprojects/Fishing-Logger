import React from 'react';
import { Card, CardContent, CardMedia, Box, Button } from '@mui/material';

const StyledCard = ({ image, alt, details, onDelete }) => {
  return (
    <Card 
      sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'left', 
        height: '100%',
        transition: 'transform 0.3s, box-shadow 0.3s',
        '&:hover': {
          transform: 'translateY(-10px)',
          boxShadow: '0 10px 20px rgba(0,0,0,0.15)',
        },
      }}
    >
      <CardMedia
        component="img"
        image={image}
        alt={alt}
        sx={{
          width: '100%',
          height: '200px',
          objectFit: 'contain',
          marginBottom: '1em',
          marginTop: '1em',
          transition: 'transform 0.3s',
          '&:hover': {
            transform: 'scale(1.05)',
          },
        }}
      />
      <CardContent sx={{ textAlign: 'left', flexGrow: 1 }}>
        {details}
      </CardContent>
      <Box sx={{ display: 'flex', paddingTop: 2, justifyContent: 'center', marginBottom: '1em' }}>
        <Button size='small' variant='contained' color='delete' onClick={onDelete}>
          Delete
        </Button>
      </Box>
    </Card>
  );
};

export default StyledCard;
