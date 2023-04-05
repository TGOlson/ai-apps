import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import List from '@mui/joy/List';
import MenuList from '@mui/joy/MenuList';
import MenuItem from '@mui/joy/MenuItem';

const AppNav = () => {
  const navigate = useNavigate();
  const currentPath = useLocation().pathname;

  const items = [{
    name: 'Code Review',
    path: '/apps/code-review',
  }, {
    name: 'Tweet Gen',
    path: '/apps/tweet-gen',
  }, {
    name: 'Chatbot',
    path: '/apps/chatbot',
  }];

  return (
    <MenuList
      component="div"
      variant="outlined"
      size="sm"
      sx={{
        minWidth: 200,
        maxWidth: 200,
        overflow: 'auto',
      }}
    >
      <List >
      {items.map(({name, path}, index) => (
        <MenuItem selected={path === currentPath} key={index} onClick={() => navigate(path)}>
          {name}
        </MenuItem>
      ))}
      </List>
    </MenuList>
  );
};

export default AppNav;
