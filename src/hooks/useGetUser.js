import { useEffect, useState } from 'react';

const getUser = async (signal) => {
  try {
    const response = await fetch('https://axentech.api.cloudmikrotik.com//api/users', { signal });
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    console.log('User Data:', data);
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
  const [savedUsers, setSavedUsers] = useState([]);
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const filterUser = (cb) => {
    setUser(cb(savedUsers));
  }


  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    getUser(signal)
      .then((data) => {
        if (data) {
          setSavedUsers(data);
          setUser(data);
        }
      })
      .catch((error) => setError(error))
      .finally(() => setLoading(false));

    // Cleanup function to abort fetch if the component unmounts
    return () => controller.abort();
  }, []);

  return { user, loading, error, filterUser };
}
