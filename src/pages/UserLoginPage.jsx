import { userContext } from '@/context/userContext';
import { useToast } from '@/hooks/use-toast';
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

const UserLoginPage = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const {token, setToken} = useContext(userContext)
  const {toast} = useToast()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('https://axentech-backend.vercel.app/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', 
      },
      body : JSON.stringify(formData)
    })
    if (!response.ok) {
      toast({
        title: 'Error',
        description: 'Username or Password is Incorrect',
        variant: 'destructive'
      })
    }
    const data = await response.json();
    if(data.token){
      localStorage.setItem('token', data.token)
      setToken(data.token)
    }
  };

  const navigate = useNavigate()
  useEffect(() => {
    if(token) {
      localStorage.setItem('token', token)
      navigate('/', {replace: true})
    }
  },[token])

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-md shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-700">Login</h2>
        <form onSubmit={handleSubmit} className="mt-6">
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700 text-left"
            >
              Username
            </label>
            <input
              type="text"
              name="username"
              id="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200 focus:border-blue-400"
              placeholder="Enter your username"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 text-left"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200 focus:border-blue-400"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserLoginPage;
