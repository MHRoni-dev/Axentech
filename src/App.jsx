import './App.css'
import UpdateForm from './components/UpdateForm'
import {  Route, Routes } from 'react-router-dom'
import Layout from './layout/Layout'
import UserListPage from './pages/UserListPage'
import UserUpdatePage from './pages/UserUpdatePage'

function App() {

  return (
    <Layout>
      <Routes>
        <Route path='' element={<UserListPage />}/>
        <Route path='/update' element={<UserUpdatePage /> }/>
      </Routes>
    </Layout>
  )
}

export default App
