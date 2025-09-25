import React from 'react'
import Navbar from '../components/Navbar'
import { Outlet } from 'react-router'
import { Toaster } from 'sonner'


const Layout = () => {
  return (
    <>
    <Navbar />
    <Outlet />
    <Toaster richColors/>
    </>
  )
}

export default Layout