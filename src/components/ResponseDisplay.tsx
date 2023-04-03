import React from 'react';

import Textarea from '@mui/joy/Textarea';

type ResponseDisplayProps = {
  value: null | string;
};

const ResponseDisplay = ({value}: ResponseDisplayProps) => {
  return (
    <Textarea
      placeholder="Response will be displayed here."
      minRows={12}
      maxRows={12}
      value={value ?? ''}
    />
  );
};

export default ResponseDisplay;
