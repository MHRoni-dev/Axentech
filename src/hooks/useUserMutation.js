import { useState, useCallback } from 'react';

export default function useUserMutation() {
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
        headers: { 'Content-Type': 'application/json' },
        body: body ? JSON.stringify(body) : null,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Something went wrong');
      }

      const responseData = await response.json();
      console.log(responseData)
      setData(responseData);
      return responseData;
    } catch (err) {
      console.log(err)
      setError(err.message);
      throw err; // Re-throw the error so it can be caught in the component
    } finally {
      setLoading(false);
    }
  }, []);

  const createUser = (userData) => mutation('http://localhost:3000/api/users', 'POST', userData);
  const updateUser = (id, userData) => mutation(`http://localhost:3000/api/users/${id}`, 'PUT', userData);
  const deleteUser = (id) => mutation(`http://localhost:3000/api/users/${id}`, 'DELETE');

  return {
    createUser,
    updateUser,
    deleteUser,
    loading,
    error,
    data,
  };
}
