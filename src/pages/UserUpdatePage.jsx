import UpdateForm from '@/components/UpdateForm'
import { userContext } from '@/context/userContext'
import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function UserUpdatePage() {


  return (
    <div className='flex justify-center items-center min-h-[80dvh]'>
      <UpdateForm />
    </div>
  )
}
