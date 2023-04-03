import React from 'react';

import Textarea from '@mui/joy/Textarea';

type ResponseDisplayProps = {
  value: null | string;
};

const ResponseDisplay = ({value}: ResponseDisplayProps) => {
  return (
    <Textarea
      placeholder="Nothing to see here yet..."
      value={value ?? ''}
      minRows={6}
      size='md'
    />
  );
};

export default ResponseDisplay;
