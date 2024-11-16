import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import '../style/signin.scss'
import { signinFailure, signinStart, signinSuccess } from '../redux/user/userSlice';
import GoogleAuth from '../components/GoogleAuth';

const Signin = () => {
  const [formData, setFormData] = useState({});
  const {loading, error} = useSelector((state)=> state.user)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e)=>{
    setFormData({...formData, [e.target.id]: e.target.value})

  }

  const handleSubmit = async(e)=>{
    e.preventDefault();

    try {
      dispatch(signinStart())
      const res = await fetch('/api/user/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
  
      });
      
      const data = await res.json();
    
      if(!data.rest){
       dispatch(signinFailure(data.message))
        return;
      }

     dispatch(signinSuccess(data));
    navigate('/')
  
    } catch (error) {
      dispatch(signinFailure(error.message))
    }
    
    
  }

  

  return (
    <div className='container'>
      <h3>Sign In</h3>

      <form onSubmit={handleSubmit} className='mainform'>
        <input type="email" placeholder='email' id='email' onChange={handleChange}  />
        <input type="password" placeholder='password' id='password' onChange={handleChange} />
        <button disabled={loading} className='btn' type="submit">{loading ? 'Loading' : 'Sign In'}</button>
        <GoogleAuth />
        <p>{error}</p>
      </form>

     <p>Have an account <Link to={'/signup'}>Sign Up</Link>  </p>
    </div>
  )
}

export default Signin