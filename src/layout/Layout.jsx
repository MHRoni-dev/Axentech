import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import  AppSidebar  from "./Sidebar"
import { Toaster } from '@/components/ui/toaster'

export default function Layout({ children }) {
  return (
    // <SidebarProvider className="">
      // <AppSidebar />
      <main className='w-full relative'>
        {children}
        <Toaster />
      </main>
    // </SidebarProvider>
  )
}
