import { userContext } from '@/context/userContext';
import { useState, useCallback, useContext } from 'react';

export default function useUserMutation() {
  const {token, setToken} = useContext(userContext)

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  /**
   * Generic function to handle mutations
   * @param {string} url - The URL for the API request
   * @param {string} method - HTTP method (POST, PUT, DELETE)
   * @param {Object} body - The request payload
   */
  const mutation = useCallback(async (url, method, body = null) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json', Authorization : token },
        body: body ? JSON.stringify(body) : null,
      });

      if (!response.ok ) {
        if(response.status === 401){
          setToken(null)
          throw new Error('Unauthorized');
        }else {
          throw new Error('Network response was not ok');
        }
      }

      const responseData = await response.json();
      console.log(responseData)
      setData(responseData);
      return responseData;
    } catch (err) {
      if(err.name === 'Unauthorized'){
        setToken(null)
      }
      setError(err.name);
    } finally {
      setLoading(false);
    }
  }, []);

  const createUser = (userData) => mutation('https://axentech-backend.vercel.app/api/users', 'POST', userData);
  const updateUser = (id, userData) => mutation(`https://axentech-backend.vercel.app/api/users/${id}`, 'PUT', userData);
  const deleteUser = (id) => mutation(`https://axentech-backend.vercel.app/api/users/${id}`, 'DELETE');

  return {
    createUser,
    updateUser,
    deleteUser,
    loading,
    error,
    data,
  };
}
