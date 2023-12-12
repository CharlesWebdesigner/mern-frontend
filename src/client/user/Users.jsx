import Paper from "@mui/material/Paper"
import Typography from "@mui/material/Typography"
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import PersonIcon from '@mui/icons-material/Person';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ListItemText from '@mui/material/ListItemText';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import IconButton from '@mui/material/IconButton';
import {list} from "./api-user"
import { useEffect,useState } from "react";
import { Link } from "react-router-dom";
const Users = () => {
    const [users, setUsers] = useState([])
    useEffect(()=>{
        const abortController= new AbortController()
        const signal =abortController.signal
        list(signal).then((data)=>{
        if(data){
            setUsers(data)
        }else{
            console.log("fetch user data error")
        }
        })
        return function cleanup(){
            abortController.abort()
        }
    },[])
  return (
    <Paper elevation={4}>
        <Typography variant="h6">
            All Users
        </Typography>
        <List dense>
         {users.map((item,i)=>{
            return <Link to={"/user/" + item._id} key={i} style={{textDecoration:"none",color:"#000"}}>
               <ListItem>
            <ListItemAvatar>
                <Avatar>
                    <PersonIcon/>
                </Avatar>
            </ListItemAvatar>
            <ListItemText primary={item.name}/>
            <ListItemSecondaryAction>
                <IconButton>
                    <ArrowForwardIosIcon/>
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>    
            </Link>
         })
         }        
        </List>
    </Paper>
  )
}
export default Users