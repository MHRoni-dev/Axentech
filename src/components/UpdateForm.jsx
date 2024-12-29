import React, { useEffect, useState } from 'react';
import { Input } from './ui/input';
import useUserMutation from '../hooks/useUserMutation';
import { useLocation, useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

export default function UpdateForm() {
  const location = useLocation()
  const {toast} = useToast()
  const initialState = location.state ?? {}
  const [formData, setFormData] = useState({
    id: initialState['.id'], // Read-only
    server: initialState['server'] ?? '', // Read-only
    name: initialState['name'] ?? '',
    password: initialState['password'] ?? '',
    profile: initialState['profile'] ?? '' // Read-only
  });
  const navigate = useNavigate()

  const {updateUser, error, data} = useUserMutation()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUser(initialState['.id'], formData)
    
  };

  useEffect(()=>{
    if(error){
      toast({
        title: 'Error',
        description: 'Something went wrong',
        variant: 'destructive'
      })
      console.log(error)
    }
    else if(data){
      toast({
        title : 'Success',
        description: 'User Updated Successfully',
        variant: 'success'
      })
      navigate('/')
    }
  },[error, data])

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg text-left w-full">
      {/* ID Field - Readonly */}
      <div className="mb-4">
        <label htmlFor="id" className="block text-sm font-medium text-gray-700">ID</label>
        <Input
          type="text"
          id="id"
          name="id"
          value={formData.id}
          readOnly
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm bg-gray-100 cursor-not-allowed"
        />
      </div>

      {/* Server Field - Readonly */}
      <div className="mb-4">
        <label htmlFor="server" className="block text-sm font-medium text-gray-700">Server</label>
        <Input
          type="text"
          id="server"
          name="server"
          value={formData.server}
          readOnly
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm bg-gray-100 cursor-not-allowed"
        />
      </div>

      {/* Name Field - Editable */}
      <div className="mb-4">
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
        <Input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          readOnly
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm bg-gray-100 cursor-not-allowed"
          placeholder="Enter your name"
        />
      </div>

      {/* Password Field - Editable */}
      <div className="mb-4">
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
        <Input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          placeholder="Enter your password"
        />
      </div>

      {/* Profile Field - Readonly */}
      <div className="mb-4">
        <label htmlFor="profile" className="block text-sm font-medium text-gray-700">Profile</label>
        <Input
          type="text"
          id="profile"
          name="profile"
          value={formData.profile}
          readOnly
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm bg-gray-100 cursor-not-allowed"
        />
      </div>

      {/* Submit Button */}
      <div className="mt-6">
        <button
          type="submit"
          className="w-full px-4 py-2 text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Submit
        </button>
      </div>
    </form>
  );
}
