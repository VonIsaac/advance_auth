//import React from 'react'
import LogIn from './components/LogIn'
import SignUp from './components/SignUp'
import Page from './components/Page'
import NewPassword from './components/UI/NewPassword'
import GetEmail from './components/UI/GetEmail'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './utils/http'
export default function App() {


  const router = createBrowserRouter([
    {
      path: '/',
      element: <LogIn />
    },
    {
      path: '/signup',
      element: <SignUp />
    },
    {
      path: '/page',
      element: <Page />
    },

    {
      path: '/new-password',
      element: <NewPassword />
    },

    {
      path: '/get-email',
      element: <GetEmail />
    }
  ])

  return (
   <div className='bg-gray-900'>
     <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
     </QueryClientProvider>
   </div>
  )
}
