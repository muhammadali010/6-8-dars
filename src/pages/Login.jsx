import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const loginData = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    fetch('https://auth-rg69.onrender.com/api/auth/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginData),
    })
      .then((response) => {
        if (response) {
            response.status == 200
          return response.json();
        } else {
          throw new Error('Login failed');
        }
      })
      .then((result) => {
        console.log('Login success:', result);
        navigate('/home'); 
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input  type="email"  ref={emailRef} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" required />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700">Password</label>
          <input  type="password"  ref={passwordRef} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" required />
        </div>
        <button type="submit" className="w-full bg-indigo-500 text-white py-2 rounded-md hover:bg-indigo-600 transition duration-300" > Login</button>
        <p className="mt-4 text-center"> Agar hisobingiz bo'lmasa, <a href="/register" className="text-indigo-600 hover:underline">Ro'yxatdan o'ting</a> </p>
      </form>
    </div>
  );
};

export default Login;
