import React, { useState } from 'react';
import validator from 'validator';

const Signup = () => {
  const [signupInput, setSignupInput] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState('');

  const handleChange = (e: Change) => {
    setSignupInput({
      ...signupInput,
      [e.target.name]: e.target.value,
    });
  };

  const handleClick = (e: Click) => {
    e.preventDefault();

    if (!validator.isEmail(signupInput.email)) {
      return setError('The email you input is invalid');
    } else if (signupInput.password.length < 5) {
      return setError(
        'The password you entered should contain 5 or more characters',
      );
    } else if (signupInput.password !== signupInput.confirmPassword) {
      return setError(`The passwords don't match. Try again`);
    }
  };

  return (
    <div className='container my-5'>
      <form>
        <div className='mb-3'>
          <label htmlFor='email' className='form-label'>
            Email Address
          </label>
          <input
            type='email'
            id='email'
            name='email'
            value={signupInput.email}
            onChange={handleChange}
            className='form-control'
          />
        </div>
        <div className='mb-3'>
          <label htmlFor='password' className='form-label'>
            Password
          </label>
          <input
            type='password'
            id='password'
            name='password'
            value={signupInput.password}
            onChange={handleChange}
            className='form-control'
          />
        </div>
        <div className='mb-3'>
          <label htmlFor='confirm-password' className='form-label'>
            Confirm Password
          </label>
          <input
            type='password'
            id='confirm-password'
            name='confirmPassword'
            value={signupInput.confirmPassword}
            onChange={handleChange}
            className='form-control'
          />
        </div>
        {error && <p className='text-danger'>{error}</p>}
        <button type='submit' className='btn btn-primary' onClick={handleClick}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default Signup;
