import { useState } from 'react'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router'
import Layout from './layouts/Layout'
import Homepage from './pages/Homepage'
import SignUpPage from './pages/SignUpPage'
import Login from './pages/Login'
import Venues from './pages/Venues'
import AddVenue from './pages/AddVenue'
import AddEvent from './pages/AddEvent'
import AddRsvp from './pages/AddRsvp'
import Profile from './pages/Profile'
import Eventpage from './pages/Eventpage'
import EditEvent from './pages/EditEvent'
import EditVenue from './pages/EditVenue'


function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element= {<Layout/>}>
        <Route index element={ <Homepage />} />
        <Route path='/signup' element={<SignUpPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/venues" element={<Venues />} />
        <Route path="/venues/:id" element={<EditVenue />} />
        <Route path="/venues/add" element={<AddVenue />} />
        <Route path="/events/add" element={<AddEvent />} />
        <Route path="/events/:id/rsvp" element={<AddRsvp />} />
        <Route path="/profile" element={<Profile />} />
        <Route path='/events/:id' element={<Eventpage/>} />
        <Route path="/events/:id/edit" element={<EditEvent/>} />

      </Route>
    )
  )
  return (
    <RouterProvider router={router}/>
  )
}

export default App
