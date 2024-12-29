import  { createContext, useState } from 'react';

export const userContext = createContext()

export  const UserContextProvider = ({children}) => {
  const [token, setToken] = useState(null)
  return (
    <userContext.Provider value={{token, setToken}}>
      {children}
    </userContext.Provider>
  )
}
