import './App.css'
import {  Route, Routes } from 'react-router-dom'
import Layout from './layout/Layout'
import UserListPage from './pages/UserListPage'
import UserUpdatePage from './pages/UserUpdatePage'
import UserLoginPage from './pages/UserLoginPage'
import { useContext, useEffect } from 'react'
import { userContext } from './context/userContext'

function App() {
  const {token, setToken} = useContext(userContext)
  useEffect(() => {
    const localToken = localStorage.getItem('token')
    setToken(token)
  }, [token])

  return (
    <Layout>
      <Routes>
        <Route path='' element={<UserListPage />}/>
        <Route path='/update' element={<UserUpdatePage /> }/>
        <Route path="/login" element={<UserLoginPage />} />
      </Routes>
    </Layout>
  )
}

export default App
