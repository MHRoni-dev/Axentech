import  { createContext, useEffect, useState } from 'react';

export const portContext = createContext()

export  const PortContextProvider = ({children}) => {
  const [port, setPort] = useState(50)
  useEffect(() => {
      const portLocal = localStorage.getItem('port');
      if(portLocal) {
        setPort(portLocal)
      }
  },[])

  return (
    <portContext.Provider value={{port, setPort}}>
      {children}
    </portContext.Provider>
  )
}
