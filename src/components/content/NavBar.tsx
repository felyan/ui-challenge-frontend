import { Search } from "@mui/icons-material";
import { AppBar, Divider, InputBase, Menu, MenuItem, styled, Toolbar, Typography } from "@mui/material"
import { useState } from "react";
import { Link } from "react-router-dom"

const StyledToolbar = styled(Toolbar)({
    display: "flex",
    justifyContent: "space-between"
});

const NavBar = () => {
    const [open, setOpen] = useState(false)
  return (
    <AppBar position="sticky">
      <StyledToolbar>
        <Typography
          variant="h6"
        >
          NEWS
        </Typography>
        <Search><InputBase placeholder="search..." /></Search>
        <Typography 
          variant="h6"
          sx={{width:30, height:30}}
          onClick={e => setOpen(true)}
        >
          MENU
        </Typography>
      </StyledToolbar>
        <Menu
            id="demo-positioned-menu"
            aria-labelledby="demo-positioned-button"
              open={open}
              onClose={e => setOpen(false)}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
        >
        <Typography variant="h5">Public</Typography>
          <MenuItem> <Link to="/profile">Profile</Link></MenuItem>
          <MenuItem><Link to="/login">Login</Link></MenuItem>
          <MenuItem> <Link to="/register">Register</Link></MenuItem>
        <Divider />
        <Typography variant="h5">Private</Typography>
          <MenuItem><Link to="/editor">Editors Page</Link></MenuItem>
          <MenuItem><Link to="/admin">Admin Page</Link></MenuItem>
      </Menu>
    </AppBar >
  )
}

export default NavBar