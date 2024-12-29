import './App.css'
import {  Route, Routes } from 'react-router-dom'
import Layout from './layout/Layout'
import UserListPage from './pages/UserListPage'
import UserUpdatePage from './pages/UserUpdatePage'
import UserLoginPage from './pages/UserLoginPage'
import { useContext, useEffect } from 'react'
import { userContext } from './context/userContext'
import PrivateRoute from './pages/PrivateRoute'

function App() {
 

  return (
    <Layout>
      <Routes>
        <Route path='' element={<PrivateRoute><UserListPage /></PrivateRoute>}/>
        <Route path='/update' element={<PrivateRoute><UserUpdatePage /></PrivateRoute> }/>
        <Route path="/login" element={<UserLoginPage />} />
      </Routes>
    </Layout>
  )
}

export default App
