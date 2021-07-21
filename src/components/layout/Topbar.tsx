import { IconButton, Toolbar } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import MenuIcon from '@material-ui/icons/Menu';
import React from 'react';
import { AppBarWrapper, TopbarTitle } from './TopbarStyle';

export function Topbar(): JSX.Element {
  return (
    <AppBarWrapper position='static'>
      <Toolbar>
        <IconButton edge='start' color='inherit' aria-label='menu'>
          <MenuIcon />
        </IconButton>
        <TopbarTitle variant='h6'>Create your roadmap</TopbarTitle>
        <Button color='inherit'>Login</Button>
      </Toolbar>
    </AppBarWrapper>
  );
}
