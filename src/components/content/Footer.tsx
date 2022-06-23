import { Typography } from '@mui/material';
import React from 'react'

const Footer = () => {
    const today = new Date();
  return (
    <footer>
      <Typography variant="body2">Copyright &copy; {today.getFullYear()}</Typography>
    </footer>
  )
}

export default Footer
