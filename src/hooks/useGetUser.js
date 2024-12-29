import { userContext } from '@/context/userContext';
import { useContext, useEffect, useState } from 'react';

const getUser = async (signal, token) => {
  try {
    const response = await fetch('https://axentech-backend.vercel.app/api/users',  {
      signal,
      headers: {
        Authorization : token
      }
    });
    if (!response.ok && response.status === 401) {
      throw new Error('Unauthorized');
    }
    const data = await response.json();
    return Object.values(data);
  } catch (error) {
    if (error.name === 'AbortError') {
      console.log('Fetch aborted');
    } else {
      console.error('Fetch error:', error);
      throw error; // Rethrow so we can catch it later
    }
  }
}

export default function useGetUser() {
  const {token} = useContext(userContext)
  const [savedUsers, setSavedUsers] = useState([]);
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const {setToken} = useContext(userContext)

  const filterUser = (cb) => {
    setUser(cb(savedUsers));
  }


  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    setLoading(true)
    getUser(signal, token)
      .then((data) => {
        if (data) {
          setSavedUsers(data);
          setUser(data);
        }
      })
      .catch((error) => {
        if(error.message === 'Unauthorized'){
          setToken(null)
          setError(error?.message)
         }
      })
      .finally(() => setLoading(false));

    // Cleanup function to abort fetch if the component unmounts
    return () => controller.abort();
  }, []);

  return { user, loading, error, filterUser };
}
