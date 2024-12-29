import UserTable from '@/components/UserTable'
import { userContext } from '@/context/userContext'
import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function UserListPage() {


  return (
    <div>
      <UserTable />
    </div>
  )
}
