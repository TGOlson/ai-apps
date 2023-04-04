import React from 'react';

import Input from '@mui/joy/Input';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import Tooltip from '@mui/joy/Tooltip';
import { Box, Typography } from '@mui/joy';
import KeyIcon from '@mui/icons-material/Key';
// import { IconButton } from '@mui/joy';

const TokenInput = () => {
  const initialValue = localStorage.getItem('opanai-token');

  const onChange = (token: string) => {
    localStorage.setItem('opanai-token', token);
  };

  const tooltip = (
    <Box sx={{width: 350}}>
      <Typography level='inherit'>
        If you don&apos;t already have an API key, you can create one for free at <a target='_blank' rel='noreferrer' href="https://platform.openai.com/account/api-keys">https://platform.openai.com/account/api-keys</a>.
      </Typography>
    </Box>
  );
  

  return (
    <Input 
      size='sm' 
      type='password'
      sx={{ width: 300 }}
      placeholder='OpenAI API Key' 
      defaultValue={initialValue ?? undefined} 
      onChange={event => onChange(event.target.value)}
      startDecorator={<KeyIcon />}
      endDecorator={
        <Tooltip title={tooltip} variant="soft" size='sm'>
          <HelpOutlineIcon color='primary' />
        </Tooltip>
      
      }
    />
  );
};

export default TokenInput;
