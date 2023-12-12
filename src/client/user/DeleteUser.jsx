import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from "@mui/material/IconButton"
import Button from "@mui/material/Button"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import DialogTitle from "@mui/material/DialogTitle"
import {Navigate} from "react-router-dom"
import PropTypes from 'prop-types'; 
import { useState } from 'react';
import auth from "../auth/auth-helper"
import { remove } from './api-user';

const DeleteUser = (props) => {
    const [open, setOpen] = useState(false)
    const [redirect, setRedirect] = useState(false)
    DeleteUser.propTypes = {
        userId: PropTypes.string.isRequired
      }
  
    const jwt = auth.isAuthenticated()
    const clickButton = () => {
      setOpen(true)
    }
    const deleteAccount = () => { 
      remove({
        userId: props.userId
      }, {t: jwt.token}).then((data) => {
        if (data && data.error) {
          console.log(data.error)
        } else {
          auth.clearJWT(() => console.log('deleted'))
          setRedirect(true)
        }
      })
    }
    const handleRequestClose = () => {
      setOpen(false)
    }
  
    if (redirect) {
      return <Navigate to='/'/>
    }
  return (
    <span>
        <IconButton aria-label="Delete" color="secondary" onClick={clickButton}>
        <DeleteIcon/>
        </IconButton>
        <Dialog open={open} onClose={handleRequestClose}>
            <DialogTitle>{"Delete account"}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    confirm to delete your account
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button color="primary" onClick={handleRequestClose}>
                    cancel
                </Button>
                <Button color="secondary" autoFocus="autoFocus" onClick={deleteAccount} >
                    confirm
                </Button>
            </DialogActions>
        </Dialog>
    </span>
  )
}

export default DeleteUser