import { List, TextField } from '@mui/material';
import React from 'react';

const SingleUser = ({ user }: { user: { user: string }}) => {
  return (
    <List className="item">
      <TextField
        label={user.user}
      />        
    </List>
  )
}

export default SingleUser