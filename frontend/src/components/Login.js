import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import LoginImg from '../images/Login-amico.png';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [notification, setNotification] = useState({ message: '', type: '' });

  const handleChange = (prop) => (event) => {
    setFormData({ ...formData, [prop]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validateEmail(formData.email)) {
      setNotification({ message: 'Invalid email format', type: 'error' });
      return;
    }

    if (!formData.password) {
      setNotification({
        message: 'Password should be entered',
        type: 'error',
      });
      return;
    }

    // Simulate incorrect username or password
    setNotification({ message: 'Incorrect username or password', type: 'error' });
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleNotificationClose = () => setNotification({ message: '', type: '' });

  const validateEmail = (email) => {
    // Regular expression for a simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <div className='container w-[60vw] h-[60vh] my-[20vh] mx-auto shadow-xl flex justify-between'>
      <div className='container flex-col w-2/5 p-10'>
        <h1 className='text-5xl font-semibold text-[#7A3986]'>Login</h1>
        <div className='flex my-4 text-xl'>
          <p>Don't have an account?</p>
          <Link to='/signup' className='text-[#BA68C8] underline'>
            Signup
          </Link>
        </div>
        {notification.message && (
          <div
            className={`p-3 mb-4 text-white ${
              notification.type === 'error' ? 'bg-red-500' : 'bg-green-500'
            }`}
          >
            {notification.message}
            <button
              className='float-right'
              onClick={handleNotificationClose}
            >
              &#x2715;
            </button>
          </div>
        )}
        <Form
          className='mt-[4vh] mb-[2vh] h-[20vh] flex flex-col justify-between'
          onSubmit={handleSubmit}
        >
          <FormControl className='my-3 w-full bg-[#f2e2f5]' variant='outlined'>
            <InputLabel htmlFor='component-outlined'>Email</InputLabel>
            <OutlinedInput
              id='component-outlined'
              value={formData.email}
              onChange={handleChange('email')}
              label='Email'
            />
          </FormControl>
          <FormControl className='my-3 w-full bg-[#f2e2f5]' variant='outlined'>
            <InputLabel htmlFor='outlined-adornment-password'>Password</InputLabel>
            <OutlinedInput
              id='outlined-adornment-password'
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={handleChange('password')}
              endAdornment={
                <InputAdornment position='end'>
                  <IconButton
                    aria-label='toggle password visibility'
                    onClick={handleClickShowPassword}
                    edge='end'
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label='Password'
            />
          </FormControl>
          <Button
            variant='primary'
            type='submit'
            className='bg-[#7A3986] text-white p-2.5 text-xl rounded hover:bg-[#693173]'
          >
            Login
          </Button>
        </Form>
        <div className='flex my-4 text-xl'>
          <p>Forgot Password?</p>
          <Link to='' className='text-[#BA68C8] underline'>
            Click here
          </Link>
        </div>
        <div style={{ borderBottom: '1px dotted #7A3986', margin: '10px 0' }}></div>
        <div className='text-center'>
          <h1 className='text-2xl bold mb-6'>Sign in with:</h1>
        </div>
        <div className='flex justify-evenly'>
          <Button>
            <FacebookIcon className='text-[#7A3986]' fontSize='large' />
          </Button>
          <Button>
            <GoogleIcon className='text-[#7A3986]' fontSize='large' />
          </Button>
        </div>
      </div>
      <div className='w-3/5 bg-slate-200'>
        <img src={LoginImg} className='w-100 min-h-[40vh] max-h-[60vh]' alt='Login' />
      </div>
    </div>
  );
};

export default Login;
