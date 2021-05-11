import React, { useEffect, useState } from 'react';

//navigation
import { Link } from 'react-router-dom';

//redux
import { useSelector, useDispatch } from 'react-redux';
import { rbook } from '../redux/combineActions';

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

const Signup = () => {
  const classes = useStyles();
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
    showPassword: false,
    showPassword2: false
  });
  const [openSnackBar, setOpenSnackBar] = useState(false);

  const { name, email, password, password2 } = values;

  const { loading, userInfo, error } = useSelector(state => state.userRegister);
  const dispatch = useDispatch();

  useEffect(() => {
    if (userInfo) {
     //
    }
    return () => {
      //
    };
  }, [userInfo]);

  const submitHandler = (event) => {
    event.preventDefault();
    dispatch(rbook.user.register(name, email, password, password2));
    setOpenSnackBar(true);
  }

  const handleChange = name => event => {
      setValues({...values, [name]: event.target.value});
  };

  const handleClickShowPassword = () => {
    setValues({...values, showPassword: !values.showPassword});
  };

  const handleClickShowPassword2 = () => {
    setValues({...values, showPassword2: !values.showPassword2});
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
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

  const signUpForm = () => (
    <>
      <center className = 'welcomeTitle'>Sign Up here</center>
      <div className = 'container'>
        {error && showError()}
        <form onSubmit = {submitHandler} className = 'form-container'>
          <FormControl className={(classes.margin, classes.textField)}>
            <InputLabel color="primary">Name</InputLabel>
            <Input
              color="primary"
              id="name"
              type='text'
              name='name'
              required
              value={values.name}
              onChange={handleChange('name')}
            />
          </FormControl>
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
            /  >
          </FormControl>
          <FormControl className={(classes.margin, classes.textField)}>
            <InputLabel color="primary">Confirm Password</InputLabel>
              <Input
                color="primary"
                id="password2"
                name="password2"
                required
                type={values.showPassword2 ? 'text' : 'password'}
                value={values.password2}
                onChange={handleChange('password2')}
                endAdornment={
                  <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword2}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {values.showPassword2 ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                  </InputAdornment>
                }
              />
          </FormControl>
          <Button style = {{marginTop: '5%'}} variant="contained" type="submit">Sign Up</Button>
          <div style = {{marginTop: '5%', fontSize:20}}>Have an account? <Link style = {{color: 'gray', textDecoration:'none'}} to = '/signin'>Sign In</Link></div>
        </form>
      </div>
    </>
  )

  document.title='Recipebook';

  return (
    loading? <center className='loading1' ><CircularProgress color = 'inherit' /></center> :
    <>
     {signUpForm()}
    </>
  )
}

export default Signup;
