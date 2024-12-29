import UserTable from '@/components/UserTable'
import { userContext } from '@/context/userContext'
import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function UserListPage() {
  const {token} = useContext(userContext)
  const navigate = useNavigate()
  useEffect(() => {
    if(!token) {
      navigate('/login', {replace : true})
    }
  },[token])

  return (
    <div>
      <UserTable />
    </div>
  )
}
