import React, { useState } from 'react';
import { Link , useNavigate} from 'react-router-dom';
import axios from 'axios';

/**Material ui and bootstrap imports*/
import { Button, Form } from 'react-bootstrap';
import SignupImg from '../images/Sign up-amico.png';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';


const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [notification, setNotification] = useState({ message: '', type: '' });

  const navigate = useNavigate();

  const handleChange = (prop) => (event) => {
    setFormData({ ...formData, [prop]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Client-side validation
    if (!formData.username || formData.username.length < 4) {
      setNotification({ message: 'Username should contain at least 4 characters', type: 'error' });
      return;
    }

    if (!validateEmail(formData.email)) {
      setNotification({ message: 'Invalid email format', type: 'error' });
      return;
    }

    if (formData.password.length === 0 || !(formData.password.length >= 8) || !validatePassword(formData.password)) {
      setNotification({ message: 'Invalid password format (must have atleast 8 characters, containing at least one special character and one number)', type: 'error' });
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setNotification({ message: 'Passwords do not match', type: 'error' });
      return;
    }

    try {
      const response = await axios.post('http://localhost:8000/api/signup', formData);

      if (response.status === 201) {
        setNotification({ message: response.data.msg, type: 'success' });
        setTimeout(()=>{
          navigate('/');
        },2000);
      } else {
        setNotification({ message: response.data.error || 'Signup failed', type: 'error' });
      }
    }catch (error) {
      console.error('Error during signup:', error);
    
      // Get a meaningful error message
      const errorMessage = error.response.data.error || 'An error occurred during signup';
    
      // Set the notification with the error message
      setNotification({ message: errorMessage, type: 'error' });
    }
    
  };
  

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleNotificationClose = () => setNotification({ message: '', type: '' });

  const validateEmail = (email) => {
    // Regular expression for a simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    // Regular expression for password with special character, number, and length between 8 and 12
    const passwordRegex = /^(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*\d)(?=.*[a-zA-Z]).{8,12}$/;
    if (!passwordRegex.test(password)) {
      return {
        valid: false,
        message: 'Password must contain at least one special character, one number, and be between 8 and 12 characters',
      };
    }
    return { valid: true };
  };
  
  
  return (
    <div className='container w-[60vw] h-[70vh] my-[15vh] mx-auto shadow-xl flex justify-between'>
      <div className='w-3/5 bg-slate-200'>
        <img src={SignupImg} className='w-100 min-h-[40vh] max-h-[60vh]' alt='Login' />
      </div>
      <div className='container flex-col w-2/5 p-5'>
        <h1 className='text-5xl font-semibold text-[#7A3986]'>Signup</h1>
        <div className='flex my-3 text-xl'>
          <p>Have an account?</p>
          <Link to='/' className='text-[#BA68C8] underline'>
            Login
          </Link>
        </div>
        {notification.message && (
          <div
            className={`p-3 mb-4 text-lg text-white ${
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
          className='mt-[2vh] mb-[2vh] h-[42vh] flex flex-col justify-between'
          onSubmit={handleSubmit}
        >
          <FormControl className='my-3 w-full bg-[#f2e2f5]' variant='outlined'>
            <InputLabel htmlFor='component-outlined'>Username</InputLabel>
            <OutlinedInput
              id='component-outlined'
              value={formData.username}
              onChange={handleChange('username')}
              label='Username'
            />
          </FormControl>
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
          <FormControl className='my-3 w-full bg-[#f2e2f5]' variant='outlined'>
            <InputLabel htmlFor='outlined-adornment-password'>Confirm Password</InputLabel>
            <OutlinedInput
              id='outlined-adornment-password'
              type={showPassword ? 'text' : 'password'}
              value={formData.confirmPassword}
              onChange={handleChange('confirmPassword')}
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
              label='ConfirmPassword'
            />
          </FormControl>
          <Button
            variant='primary'
            type='submit'
            className='bg-[#7A3986] text-white p-2.5 text-xl rounded hover:bg-[#693173]'
          >
            Signup
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Signup;
