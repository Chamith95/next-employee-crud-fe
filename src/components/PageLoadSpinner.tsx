import * as React from 'react';
import { Box, CircularProgress } from '@mui/material';

export default function PageLoadSpinner() {
  return (
    <Box className="flex w-full items-center justify-center">
      <CircularProgress size={180} />
    </Box>

  );
}