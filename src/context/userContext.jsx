import  { createContext, useEffect, useState } from 'react';

export const userContext = createContext()

export  const UserContextProvider = ({children}) => {
  const [token, setToken] = useState(null)
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const localToken = localStorage.getItem('token');
    if (localToken) setToken(localToken);
    setLoading(false)
  }, []);
  

  return (
    <userContext.Provider value={{token, setToken, loading}}>
      {children}
    </userContext.Provider>
  )
}
