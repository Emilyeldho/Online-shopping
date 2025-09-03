import React from 'react';
import { Typography as MuiTypography } from '@mui/material';

const Typography = ({ 
  children, 
  variant = 'body1', 
  component, 
  color = 'textPrimary',
  align = 'inherit',
  gutterBottom = false,
  noWrap = false,
  sx = {},
  ...props 
}) => {

  return (
    <MuiTypography
      variant={variant}
      component={component}
      align={align}
      gutterBottom={gutterBottom}
      noWrap={noWrap}
      sx={{
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        fontWeight: 400,
        lineHeight: 1.5,
        letterSpacing: '0.00938em',
        ...sx
      }}
      {...props}
    >
      {children}
    </MuiTypography>
  );
};


export default Typography;