import React from 'react'
import {getAuth, GoogleAuthProvider, signInWithPopup} from 'firebase/auth'
import {app} from '../firebase'
import { useDispatch, useSelector } from 'react-redux';
import { signinSuccess } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';

const GoogleAuth = () => {

  const diapatch = useDispatch();
  const navigate = useNavigate();

    const handleGoogleClick = async()=>{

        try {
            const provider = new GoogleAuthProvider();
            const auth = getAuth(app);
            const result = await signInWithPopup(auth, provider);
            console.log(result.user.displayName.split(" ").join('').toLowerCase());
            
            
            const res = await fetch('/api/user/google', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                name: result.user.displayName, email: result.user.email, photo: result.user.photoURL
              })
            })
            const data = await res.json();
            diapatch(signinSuccess(data))
            navigate('/')
            console.log(data);
            
        } catch (error) {
            console.log('adnan', error);
            
        }
    }

  return (
    <button className='btn bg-danger' type='button' onClick={handleGoogleClick}>GoogleAuth</button>
  )
}

export default GoogleAuth