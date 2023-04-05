import React from 'react';

import Input from '@mui/joy/Input';
import Tooltip from '@mui/joy/Tooltip';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

import { useOpenAIToken } from '../hooks/useOpenAIToken';

const TokenInput = () => {
  const [getToken, setToken] = useOpenAIToken();

  const onChange = (token: string) => setToken(token);

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
      defaultValue={getToken() ?? undefined} 
      onChange={event => onChange(event.target.value)}
      endDecorator={
        <Tooltip title={tooltip} variant="soft" size='sm'>
          <HelpOutlineIcon color='primary' />
        </Tooltip>
      
      }
    />
  );
};

export default TokenInput;
