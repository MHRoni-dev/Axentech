import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import  AppSidebar  from "./Sidebar"
import { Toaster } from '@/components/ui/toaster'
import { Button } from '@/components/ui/button'
import { useContext } from 'react'
import { userContext } from '@/context/userContext'

export default function Layout({ children }) {
  const {token,setToken} = useContext(userContext)
  const handleLogout = () => {
    setToken(null)
    localStorage.setItem('token', null)
  }
  return (
    // <SidebarProvider className="">
      // <AppSidebar />
      <main className='w-full relative'>
        {token && <nav className='flex justify-end'><Button variant="outline" onClick={handleLogout}>Logout</Button></nav>}
        {children}
        <Toaster />
      </main>
    // </SidebarProvider>
  )
}
