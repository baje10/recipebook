import React, { useEffect, useState } from 'react';

//redux
import { useSelector, useDispatch } from 'react-redux';
import { rbook } from '../redux/combineActions';

//navigation
import { Link } from 'react-router-dom';

//material-UI
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import CircularProgress from '@material-ui/core/CircularProgress';
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';


//styling for material ui
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  margin: {
    margin: theme.spacing(1),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    marginTop: '3%',
    width: '100%',
    '& label.Mui-focused': {
      color: '#FF3F16',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#FF3F16',
    },
  },
}));

const Signin = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [values, setValues] = useState({
      email: "",
      password: "",
      showPassword: false
  });
  const [openSnackBar, setOpenSnackBar] = useState(false);

  const { loading, user, error } = useSelector(state => state.userSignin);
  const { email, password } = values;

  useEffect (() => {
    if(user){
      //
    }
    return () => {
      //
    };
  },[user])

  const handleChange = name => event => {
      setValues({ ...values, [name]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({...values, showPassword: !values.showPassword});
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const submitHandler = (event) => {
    event.preventDefault();
    dispatch(rbook.user.login(email, password));
    setOpenSnackBar(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
      setOpenSnackBar(false);
  };

  const showError = () => (
    <Snackbar anchorOrigin={{ vertical: "top", horizontal: "center" }} open={openSnackBar} autoHideDuration={3000} onClose={handleClose}>
      <Alert severity="error">{error}</Alert>
    </Snackbar>
  );

  const signInForm = () => (
    <>
      <center className = 'welcomeTitle'>Sign In</center>
      <div  className = 'container'>
        {error && showError()}
        <form className = 'form-container' onSubmit = {submitHandler}>
          <FormControl className={(classes.margin, classes.textField)}>
            <InputLabel color="primary">Email</InputLabel>
            <Input
              color="primary"
              id="email"
              type='email'
              name='email'
              required
              value={values.email}
              onChange={handleChange('email')}
            />
          </FormControl>
          <FormControl className={(classes.margin, classes.textField)}>
            <InputLabel color="primary">Password</InputLabel>
              <Input
                color="primary"
                id="password"
                name="password"
                required
                type={values.showPassword ? 'text' : 'password'}
                value={values.password}
                onChange={handleChange('password')}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                     {values.showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
             />
          </FormControl>
          <Button style = {{marginTop: '5%'}} variant="contained" type="submit">Sign In</Button>
          <div style = {{marginTop: '5%', fontSize:20}}>Don't have an account? <Link style = {{color: 'gray', textDecoration:'none'}} to = '/signup'>Sign Up</Link></div>
        </form>
      </div>
    </>
  )

  document.title='Recipebook';

  return (
      loading? <center className='loading1' ><CircularProgress color = 'inherit' /></center> :
      <>
       {signInForm()}
      </>
  )
}

export default Signin;
