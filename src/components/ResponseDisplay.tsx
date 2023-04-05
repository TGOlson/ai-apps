import React from 'react';

import Textarea from '@mui/joy/Textarea';
import Typography from '@mui/joy/Typography';

type ResponseDisplayProps = {
  value: null | string;
};

const ResponseDisplay = ({value}: ResponseDisplayProps) => {
  return (
    <Textarea
      placeholder="Results will display here!"
      value={value ?? ''}
      minRows={6}
      size='md'
      endDecorator={
        <Typography level="body3" sx={{ ml: 'auto' }}>
          {value ? value.length : 0} character(s)
        </Typography>
      }
    />
  );
};

export default ResponseDisplay;
