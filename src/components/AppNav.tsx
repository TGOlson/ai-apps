import React from 'react';
import List from '@mui/joy/List';
// import ListItem from '@mui/joy/ListItem';
import MenuList from '@mui/joy/MenuList';
import MenuItem from '@mui/joy/MenuItem';
import { useNavigate } from 'react-router-dom';
// import Typography from '@mui/joy/Typography';

const AppNav = () => {
  const navigate = useNavigate();


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
        // boxShadow: 'sm',
        // flexGrow: 0,
        minWidth: 200,
        maxWidth: 200,
        // maxHeight: 240,
        overflow: 'auto',
      }}
    >
      <List >
      {items.map(({name, path}, index) => (
        <MenuItem selected={index === 0} key={index} onClick={() => navigate(path)}>
          {name}
        </MenuItem>
      ))}
      </List>
    </MenuList>
  );
};

export default AppNav;
