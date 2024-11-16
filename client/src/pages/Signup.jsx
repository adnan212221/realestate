import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import '../style/signup.scss'
import GoogleAuth from '../components/GoogleAuth';

const Signup = () => {

  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e)=>{
    setFormData({...formData, [e.target.id]: e.target.value})

  }

  const handleSubmit = async(e)=>{
    e.preventDefault();

    try {
      setLoading(true)
      const res = await fetch('/api/user/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
  
      });
      
      const data = await res.json();
    
      if(!data.success){
        setLoading(false)
        setErrors(data.message)
        return;
      }
      setLoading(false)
      setErrors(null)
      navigate('/signin')
    } catch (error) {
      setLoading(false);
    }
    
    
  }

  console.log(formData);
  

  return (
    <div className='container'>
      <h3>Sign up</h3>

      <form onSubmit={handleSubmit} className='mainform'>
        <input type="text" placeholder='username' id='username' onChange={handleChange} />
        <input type="email" placeholder='email' id='email' onChange={handleChange}  />
        <input type="password" placeholder='password' id='password' onChange={handleChange} />
        <button disabled={loading} className='btn' type="submit">Sign up</button>
        <GoogleAuth />
        <p>{errors}</p>
      </form>

     <p>Have an account <Link to={'/signin'}>Sign In</Link>  </p>
    </div>
  )
}

export default Signup