import UpdateForm from '@/components/UpdateForm'
import { userContext } from '@/context/userContext'
import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function UserUpdatePage() {
const {token} = useContext(userContext)
  const navigate = useNavigate()
  useEffect(() => {
    if(!token) {
      navigate('/login', {replace : true})
    }
  },[token])

  return (
    <div className='flex justify-center items-center min-h-[80dvh]'>
      <UpdateForm />
    </div>
  )
}
