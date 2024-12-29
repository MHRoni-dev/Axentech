import useGetUserList from '../hooks/useGetUser'
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from './ui/table'
import {Input} from './ui/input'
import { useEffect, useState } from 'react'
import { Edit } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import LoadingPage from '@/pages/LoadingPage'

export default function UserTable() {
  const {user: users, filterUser, loading} = useGetUserList()
  const [name, setName] = useState()
  const navigate = useNavigate()

  const editClickHandler = (user) => {
    navigate('/update', { state : user})
  }

  useEffect(() => {
    filterUser(users => users.filter(user => user.name.toLowerCase().includes(name)))
  }, [name])
  console.log(loading)
  if(users.length === 0) {
    return <LoadingPage />
  }

  return (
  <div className='w-full'>
    <div className='bg-white sticky top-0 z-10 py-4'>
      <Input className= 'w-1/2 mx-auto  ' value={name} onChange={e=>setName(e.target.value)}/>
    </div>
    <div className='relative'>
      <div className='max-h-[80vh] overflow-hidden overflow-y-auto border rounded-md relative'>
          <Table className="border " >
            <TableHeader className="opacity-0">
              <TableRow className="bg-slate-200 font-medium ">
                <TableHead className="font-bold">Server</TableHead>
                <TableHead className="font-bold">Name</TableHead>
                <TableHead className="font-bold">Password</TableHead>
                <TableHead className="font-bold">Profile</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="max-h-[80vh] overflow-hidden overflow-y-auto relative">
              {
                users.length ? users.map(user => <TableRow key={user['.id']} className="even:bg-slate-50 group">
                  <TableCell  className='text-left'>{user['server']}</TableCell>
                  <TableCell  className='text-left flex justify-between '>{user['name']} <Edit className='opacity-0 group-hover:opacity-100 h-4 w-4' onClick={()=>editClickHandler(user)}/></TableCell>
                  <TableCell className='text-left'>{Array(user?.['password']?.length ?? 0).fill('*').join('')}</TableCell>
                  <TableCell  className='text-left'>{user['profile']}</TableCell>
                </TableRow>)
                : <TableRow>
                  <TableCell  colSpan={6} className="table-cell text-center">No User Found</TableCell>
                </TableRow>
              }
            </TableBody>
          </Table>
      </div>
      <div className='absolute top-0 z-10 w-full'>
        <Table className="border sticky top-0 left-0 z-20" >
            <TableHeader className="">
              <TableRow className="bg-slate-200 font-medium ">
                <TableHead className="font-bold text-left">Server</TableHead>
                <TableHead className="font-bold text-left">Name</TableHead>
                <TableHead className="font-bold text-left">Password</TableHead>
                <TableHead className="font-bold text-left">Profile</TableHead>
              </TableRow>
            </TableHeader>
          </Table>
      </div>
    </div>
  </div>
  )
}
