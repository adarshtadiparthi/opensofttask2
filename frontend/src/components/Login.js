import React, { useState } from 'react';
import { Link , useNavigate} from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';

/**Material Ui and Bootstrap imports */
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
    username: '',
    password: '',
  });
  const [notification, setNotification] = useState({ message: '', type: '' });
  
  const navigate = useNavigate();

  const handleChange = (prop) => (event) => {
    setFormData({ ...formData, [prop]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if(!formData.username){
      setNotification({message:"Username is required.",type:'error'});
      return;
    }
    if (!formData.password) {
      setNotification({message:"Password is required.",type:'error'});
      return;
    }

    try {
      const response = await axios.post('http://localhost:8000/api/login', formData);

      if (response.status === 200) {
          const token = response.data.token;
          setNotification({ message: response.data.msg, type: 'success' });

          // Store the token securely (e.g., in a cookie or local storage)
          Cookies.set('token', token); // Example using js-cookie

          // Navigate to the dashboard
          setTimeout(()=>{
            navigate('/dashboard', { state: { username: formData.username } });
          },1000);
      } else {
          setNotification({ message: response.data.error || 'Login failed', type: 'error' });
      }
    } catch (error) {
      console.error('Error during login:', error);
    
      // Log the entire error object
      console.error(error);
    
      // Set a generic error message
      setNotification({ message: 'Login failed. Please try again.', type: 'error' });
    }
    
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleNotificationClose = () => setNotification({ message: '', type: '' });

  return (
    <div className='container w-[60vw] h-[70vh] my-[15vh] mx-auto shadow-xl flex justify-between'>
      <div className='container flex-col w-2/5 p-5'>
        <h1 className='text-5xl font-semibold text-[#7A3986]'>Login</h1>
        <div className='flex my-4 text-xl'>
          <p>Don't have an account?</p>
          <Link to='/signup' className='text-[#BA68C8] underline'>
            Signup
          </Link>
        </div>
        {notification.message && (
          <div
            className={`p-3 mb-4 text-white text-lg ${
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
          className='mt-[4vh] mb-[2vh] h-[22.5vh] flex flex-col justify-between'
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
