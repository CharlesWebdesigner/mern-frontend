import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import Typography from "@mui/material/Typography"
import TextField from '@mui/material/TextField';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import {read,update} from "./api-user"
import auth from "../auth/auth-helper"
import { makeStyles } from '@mui/styles';
import { useState,useEffect } from "react";
import { Navigate,useParams } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 600,
    margin: 'auto',
    textAlign: 'center',
    marginTop: theme.spacing(5),
    paddingBottom: theme.spacing(2)
  },
  title: {
    margin: theme.spacing(2),
    color: theme.palette.protectedTitle
  },
  error: {
    verticalAlign: 'middle'
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
const EditProfile = () => {
  const classes = useStyles()
  const [values, setValues] = useState({
    name: '',
    password: '',
    email: '',
    open: false,
    error: '',
    redirectToProfile: false
  })
  const jwt = auth.isAuthenticated()
  const { userId } = useParams();

  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal

    read({
      userId:userId
    }, {t: jwt.token}, signal).then((data) => {
      if (data && data.error) {
        setValues({...values, error: data.error})
      } else {
        setValues({...values, name: data.name, email: data.email})
      }
    })
    return function cleanup(){
      abortController.abort()
    }

  }, [userId])

  const clickSubmit = () => {
    const user = {
      name: values.name || undefined,
      email: values.email || undefined,
      password: values.password || undefined
    }
    update({
      userId: userId
    }, {
      t: jwt.token
    }, user).then((data) => {
      if (data && data.error) {
        setValues({...values, error: data.error})
      } else {
        setValues({...values, userId: data._id, redirectToProfile: true})
      }
    })
  }
  const handleChange = name => event => {
    setValues({...values, [name]: event.target.value})
  }

    if (values.redirectToProfile) {
      return (<Navigate to={'/user/' + values.userId}/>)
    }
  return (
    <Card  className={classes.card}>
        <CardContent>
            <Typography variant="h6" className={classes.title}>
                Edit Profile
            </Typography>
            <TextField id="name" label="Name" variant="standard" className={classes.textField} value={values.name} onChange={handleChange('name')}/><br/>
            <TextField id="email" label="Email" variant="standard" className={classes.textField} value={values.email} onChange={handleChange('email')}/><br/>
            <TextField id="password" label="Password" variant="standard" className={classes.textField} value={values.password} onChange={handleChange('password')}/>
            <br/>
            {
            values.error && (<Typography component="p" color="error">
              <Icon color="error" className={classes.error}>error</Icon>
              {values.error}
            </Typography>)
          }
        </CardContent>
        <CardActions>
            <Button color="primary" variant="contained" onClick={clickSubmit} className={classes.submit}>Submit</Button>
        </CardActions>
    </Card>
  )
}
export default EditProfile