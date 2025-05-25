import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import UserContext from '../../allcontext';
import { useContext } from 'react';
export default function Navbar() {
  const { setUser } = useContext(UserContext);
  const { setlogindone} = useContext(UserContext);
  const handlelogout = () => {
    setlogindone(0);
    setUser({});    
    localStorage.removeItem('user');
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{
          background: 'linear-gradient(to right, #3b82f6, #8b5cf6, #bfdbfe)',
          borderRadius: 2,
          boxShadow: 4,
          px: 2,
        }}
      >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, fontWeight: 'bold' }}
          >
            Welcome
          </Typography>
          <Button
          onClick={handlelogout}
            variant="contained"
            sx={{
              backgroundColor: 'white',
              color: '#3b82f6',
              fontWeight: 'bold',
              '&:hover': {
                backgroundColor: '#e0e7ff',
              },
              borderRadius: 2,
              textTransform: 'none',
            }}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
