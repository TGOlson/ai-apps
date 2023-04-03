import React from 'react';

import Textarea from '@mui/joy/Textarea';

type PromptInputProps = {
  onChange: (text: string) => void;
};

const PromptInput = ({onChange}: PromptInputProps) => {
  return (
    <Textarea
      placeholder="Type Open AI prompt here."
      minRows={4}
      maxRows={4}
      onChange={e => onChange(e.target.value)}
    />
  );
};

export default PromptInput;
