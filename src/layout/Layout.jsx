import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import  AppSidebar  from "./Sidebar"
import { Toaster } from '@/components/ui/toaster'
import { Button } from '@/components/ui/button'
import { useContext, useEffect } from 'react'
import { userContext } from '@/context/userContext'
import { useNavigate } from 'react-router-dom'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { portContext } from '@/context/portContext'

export default function Layout({ children }) {
  const {token,setToken} = useContext(userContext)
  const {port, setPort} = useContext(portContext)
  const navigate = useNavigate()
  const handleLogout = () => {
    setToken(null)
    localStorage.setItem('token', null)
    localStorage.setItem('port', null)
  }
  const handlePortSet = (port) => {
    setPort(port)
    localStorage.setItem('port', port)
    location.reload()
  }
 
  return (
    // <SidebarProvider className="">
      // <AppSidebar />
      <main className='w-full relative'>
        {token && <nav className='flex justify-between gap-4'>
          <div>
          <DropdownMenu>
            <DropdownMenuTrigger><Button variant="outline">RouterOS Port : {port}</Button></DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>RouterOS Port</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup value={port?.toString()} onValueChange={handlePortSet}>
                <DropdownMenuRadioItem value={"50"} >50</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value={"443"} >443</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          </div>
          <div className='flex gap-4 items-center'>
            <Button variant="secondary" onClick={() => navigate('/')}>Users</Button>
            <Button variant="outline" onClick={handleLogout}>Logout</Button>
          </div>
          </nav>}
        {children}
        <Toaster />
      </main>
    // </SidebarProvider>
  )
}
