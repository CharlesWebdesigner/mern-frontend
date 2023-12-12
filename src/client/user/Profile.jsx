import Paper from "@mui/material/Paper"
import Typography from "@mui/material/Typography"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemAvatar from "@mui/material/ListItemAvatar"
import Avatar from "@mui/material/Avatar"
import PersonIcon from '@mui/icons-material/Person';
import ListItemText from "@mui/material/ListItemText"
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import Divider from '@mui/material/Divider';
import {read} from "./api-user"
import DeleteUser from "./DeleteUser"
import { makeStyles } from '@mui/styles';
import auth from "./../auth/auth-helper"
import {Link,Navigate,useParams} from "react-router-dom"
import { useState, useEffect } from "react"

const useStyles = makeStyles(theme => ({
    // root: theme.mixins.gutters({
    //   maxWidth: 600,
    //   margin: 'auto',
    //   padding: theme.spacing(3),
    //   marginTop: theme.spacing(5)
    // }),
    title: {
      marginTop: theme.spacing(3),
      color: theme.palette.protectedTitle
    }
  }))

const Profile = () => {
    const classes = useStyles()
    const [user, setUser] = useState({})
    const [redirectToSignin, setRedirectToSignin] = useState(false)
    const jwt = auth.isAuthenticated()
    const { userId } = useParams();

    useEffect(() => {
      // console.log('useEffect called');
      const abortController = new AbortController();
      const signal = abortController.signal;
  
      if (userId) {
        read({ userId: userId }, { t: jwt.token }, signal).then((data) => {
          // console.log(data);
          if (data && data.error) {
            setRedirectToSignin(true);
            console.log('error');
          } else {
            setUser(data);
          }
        });
        }      
        return function cleanup() {
          abortController.abort();
        };
      }, [userId]);
      
    
      if (redirectToSignin) {
        return <Navigate to='/signin'/>
      }
  return (
   <Paper elevation={4}>
    <Typography variant="h6" className={classes.title}>
        profile
    </Typography>
    <List dense>
    <ListItem>
        <ListItemAvatar>
            <Avatar>
            <PersonIcon/>
            </Avatar>
        </ListItemAvatar>
        <ListItemText primary={user.name} secondary={user.email}/>
        {
            auth.isAuthenticated().user && auth.isAuthenticated().user._id == user._id && (
                    <ListItemSecondaryAction>
        <Link to={"/user/edit/" + user._id}>
      <IconButton  aria-label="Edit" color="primary">
        <EditIcon/>
      </IconButton>
    </Link>

        <DeleteUser userId={user._id}/>
        </ListItemSecondaryAction>
            )
        }
    </ListItem>
    <Divider/>
    <ListItem>
        <ListItemText primary={"joined: " +(
            new Date(user.created).toDateString()           
        )}/>
    </ListItem>
    </List>
   </Paper>
  )
}
export default Profile