import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate(); 

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };
  
  function Validate(){
    if (usernameRef.current.value.length < 3) {
        alert('username is not valid')
        usernameRef.current.focus()
        usernameRef.current.style.outlineColor ='red'
        return false
    }
    return true
    }
  const handleRegister = (e) => {
    e.preventDefault();
    const isvalid = Validate()
    if (!isvalid) {
        return;
    }
    
    const userData = {
      username: usernameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    fetch('https://auth-rg69.onrender.com/api/auth/signup', {
     method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })
      .then((response) => {
        if (response.status == 200) {
          return response.json();
        } 
      })
      .then((result) => {
        console.log('Register success:', result);
        navigate('/');
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form onSubmit={handleRegister} className="bg-Awhite p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        <div className="mb-4">
          <label className="block text-gray-700">Username</label>
          <input type="text" ref={usernameRef} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" required/>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input type="email" ref={emailRef} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" required/>
        </div>
        <div className="mb-6">
          <label className="block text-gray-700">Password</label>
          <input type="password" ref={passwordRef} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" required/>
        </div>
        <button type="submit" className="w-full bg-indigo-500 text-white py-2 rounded-md hover:bg-indigo-600 transition duration-300"> Ro'yxatdan o'tish</button>
        <p className="mt-4 text-center">Agar hisobingiz bo'lsa: <a href="/" className="text-indigo-600 hover:underline">Login</a>  </p>
      </form>
    </div>
  );
};

export default Register;
