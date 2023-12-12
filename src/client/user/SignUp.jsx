import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import Typography from "@mui/material/Typography"
import TextField from '@mui/material/TextField';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Icon from '@mui/material/Icon';
import { makeStyles } from '@mui/styles';
import { useState } from "react";
import { Link } from "react-router-dom";
import {create} from "./api-user"

const useStyles=makeStyles(theme=>({
  card: {
    maxWidth: 600,
    margin: 'auto',
    textAlign: 'center',
    marginTop: theme.spacing(5),
    paddingBottom: theme.spacing(2)
  },
  error: {
    verticalAlign: 'middle'
  },
  title: {
    marginTop: theme.spacing(2),
    color: theme.palette.openTitle
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 300
  },
  submit: {
    margin: 'auto',
    marginBottom: theme.spacing(2)
  }
}))
const SignUp = () => {
  const classes=useStyles()
  const [values, setValues] = useState({
    name: '',
    password: '',
    email: '',
    open: false,
    error: ''
  })

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value })
  }

  const clickSubmit = () => {
    const user = {
      name: values.name || undefined,
      email: values.email || undefined,
      password: values.password || undefined
    }
    create(user).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error})
      } else {
        setValues({ ...values, error: '', open: true})
      }
    })
    // if(!user.name || !user.email|| !user.password){
    //   setValues({...values,error:"please fill out all fields"})
    // }else{
    //   setValues({ ...values, error: '', open: true})
    // }
  }
  return (
    <div>
      <Card className={classes.card}>
        <CardContent>
            <Typography variant="h6" className={classes.title}>
                Sign Up
            </Typography>
            <TextField id="name" label="Name" variant="standard" className={classes.textField} value={values.name} onChange={handleChange('name')} margin="normal" type="text"/><br/>

            <TextField id="email" label="Email" variant="standard" className={classes.textField} value={values.email} onChange={handleChange('email')} margin="normal" type="email"/><br/>
            <TextField id="password" label="Password" variant="standard" className={classes.textField} value={values.password} onChange={handleChange('password')} margin="normal" type="password"/>
            <br/> {
            values.error && (<Typography component="p" color="error">
              <Icon color="error" className={classes.error}>error</Icon>
              {values.error}</Typography>)
          }
        </CardContent>
        <CardActions color="primary" variant="contained">
      <Button color="primary" variant="contained" className={classes.submit} onClick={clickSubmit}>Submit</Button>
        </CardActions>
    </Card>
    <Dialog open={values.open}>
      <DialogTitle>New Account</DialogTitle>
      <DialogContent>
      <DialogContentText>New Account succesfully created</DialogContentText>
      </DialogContent>
      <DialogActions>
      <Link to="/signin">
      <Button color="primary" autoFocus="autoFocus" variant="contained">Sign In</Button>
      </Link>
      </DialogActions>
    </Dialog>
    </div>
  )
}
export default SignUp