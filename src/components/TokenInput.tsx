import React from 'react';

import Input from '@mui/joy/Input';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import FormHelperText from '@mui/joy/FormHelperText';

type TokenInputProps = {
  defaultValue?: string;
  onChange: (token: string) => void;
};

const TokenInput = ({defaultValue, onChange}: TokenInputProps) => {
  return (
    <FormControl>
      <FormLabel>Open AI API Key</FormLabel>
      <Input placeholder='sk-...' defaultValue={defaultValue} onChange={e => onChange(e.target.value)}/>
      <FormHelperText>Find yours at: https://platform.openai.com/account/api-keys</FormHelperText>
    </FormControl>
  );
};

export default TokenInput;
