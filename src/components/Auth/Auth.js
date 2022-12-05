import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { signin, signup } from '../../actions/auth'
import logo from '../../images/logo.png'
import './Auth.css'

const Auth = () => {
  const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' }
  const [showPassword, setShowPassword] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();

    if(isSignup) {
      dispatch(signup(formData, history));
    } else {
      dispatch(signin(formData, history));
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const switchMode = () => {
    setIsSignup((prev) => !prev);
    setShowPassword(false);
  }

  return (
    <div className='auth'>
      <div className='auth__header'>
        <img src={logo} className='auth__img' />
        <h4 className='auth__title'>{isSignup ? 'Sign Up' : 'Sign In'}</h4>
      </div>
      <form onSubmit={handleSubmit} className='auth__form'>
        {isSignup && (
            <>
              <input className='auth__form-input' name='firstName' placeholder='First Name' onChange={handleChange} autoFocus />
              <input className='auth__form-input' name='lastName' placeholder='Last Name' onChange={handleChange} />
            </>
          )}

        <input className='auth__form-input' name='email' placeholder='Email Address' onChange={handleChange} type='email' />
        <input className='auth__form-input' name='password' placeholder='Password' onChange={handleChange} />
        { isSignup && <input className='auth__form-input' name='confirmPassword' placeholder='Repeat Password' onChange={handleChange} type='password' />}

        <button type='submit' className='btn'>{isSignup ? 'Sign Up' : 'Sign In'}</button>

        <button onClick={switchMode} className='btn-transparent' style={{color: "var(--secondary-color)"}}>
          { isSignup ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
        </button>
      </form>
    </div>
  )
}

export default Auth