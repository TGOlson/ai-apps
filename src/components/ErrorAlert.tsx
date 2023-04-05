import React from 'react';

import Typography from '@mui/joy/Typography';
import Alert from '@mui/joy/Alert';
import IconButton from '@mui/joy/IconButton';

import ReportIcon from '@mui/icons-material/Report';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

type ErrorAlertProps = {
  description: string;
  onClose: () => void;
};

const ErrorAlert = ({description, onClose}: ErrorAlertProps) => {
  return (
    <Alert
      sx={{ alignItems: 'flex-start', mb: 2}}
      startDecorator={<ReportIcon sx={{mt: '2px', mx: '4px', fontSize: 'xl2'}} />}
      variant="soft"
      color='danger'
      endDecorator={
        <IconButton variant="soft" size="sm" color='danger' onClick={() => onClose()}>
          <CloseRoundedIcon />
        </IconButton>
      }
    >
      <div>
        <Typography fontWeight="lg" mt={0.25}>Heads Up!</Typography>
        <Typography fontSize="sm" sx={{ opacity: 0.8 }}>{description}</Typography>
      </div>
    </Alert>
  );
};

export default ErrorAlert;
