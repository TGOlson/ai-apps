import React from 'react';

import { Outlet } from 'react-router-dom';

import { CssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import Stack from '@mui/joy/Stack';
import Box from '@mui/joy/Box';

import Header from '../components/Header';
import AppNav from '../components/AppNav';

const Root = () => {  
  return (
    <CssVarsProvider>
      <CssBaseline />
      <Header />

      <Stack direction='row' sx={{gap: 2, m: 2, height: '100vh'}}>
        <Box>
          <AppNav />
        </Box>
        <Stack 
          direction='row' 
          sx={{gap: 4}}
          flexGrow={1}
          justifyContent="center"
          alignItems="flex-start"
        >
          <Outlet />
        </Stack>
      </Stack>
    </CssVarsProvider>
  );
};

export default Root;
