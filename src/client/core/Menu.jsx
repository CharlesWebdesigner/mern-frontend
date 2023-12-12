import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import HomeIcon from '@mui/icons-material/Home';
import Button from "@mui/material/Button"
import { useNavigate, Link, useLocation } from "react-router-dom";
import auth from '../auth/auth-helper';

const Menu = () => {  
  let navigate = useNavigate();
  let location = useLocation();

  const isActive = (path) => {
    if (location.pathname === path) {
      return { color: "#ff4081" };
    } else {
      return { color: "#fff" };
    }
  }

  const redirect = useNavigate();

  const handleSignOut = () => {
    auth.clearJWT(() => {
      redirect('/');
    });
  };

  return (
    <AppBar position='static'>
      <Toolbar>
        <Typography variant="h6" color="inherit">
          Mern Skeleton
        </Typography>
        <Link to="/">
          <IconButton aria-label="Home" style={isActive('/')}>
            <HomeIcon />
          </IconButton>
        </Link>
        <Link to="/users">
          <Button style={isActive('/users')}>Users</Button>
        </Link>
        {
          !auth.isAuthenticated() && (
            <span>
              <Link to="/signup">
                <Button style={isActive('/signup')}>Sign up</Button>
              </Link>
              <Link to="/signin">
                <Button style={isActive('/signin')}>Sign In</Button>
              </Link>
            </span>
          )
        }
        {
          auth.isAuthenticated() && (
            <span>
              <Link to={"/user/" + auth.isAuthenticated().user._id}>
                <Button style={isActive("/user/" + auth.isAuthenticated().user._id)}>My Profile</Button>
              </Link>
              <Button color="inherit" onClick={handleSignOut}>
                Sign out
              </Button>
            </span>
          )
        }
      </Toolbar>
    </AppBar>
  )
}

export default Menu;
