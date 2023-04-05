import React from 'react';
import { useNavigate } from 'react-router-dom';

import Sheet from '@mui/joy/Sheet';
import Button from '@mui/joy/Button';

import TokenInput from './TokenInput';

const Header = () => {
  const navigate = useNavigate();

  return (
    <Sheet color="neutral" sx={{ p: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
      <Button size="sm" variant="plain" onClick={() => navigate('/')}>AI Apps</Button>
      <TokenInput />
    </Sheet>
  );
};

export default Header;
