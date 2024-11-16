import React, { useRef } from 'react'
import {useSelector} from 'react-redux'

const Profile = () => {
  const fileRef = useRef(null)
  const {user} = useSelector((state)=> state.user)
  return (
    <>
    <div>
      <h1>Profile</h1>
      <form>
        <input type="file" name="file" id="file" accept='image/*' ref={fileRef} hidden />
        <img onClick={()=>fileRef.current.click()} src={user.avatar || user.rest.avatar} alt="" />

        <input type="text" placeholder='username' id='username' name='username' />
        <input type="email" name="email" id="email" placeholder='email' />
        <input type="password" name='password' id='password' placeholder='password' />
        <button type="submit">update </button>
      </form>
      <div>
        <button>delete account</button>
        <button>signout</button>
      </div>
    </div>
    </>
  )
}

export default Profile