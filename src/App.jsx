//import React from 'react'
import LogIn from './components/LogIn'
import SignUp from './components/SignUp'
import Page from './components/Page'
import NewPassword from './components/UI/NewPassword'
import GetEmail from './components/UI/GetEmail'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './utils/http'
import AdminPage from './components/AdminPages'
import ProtectedRoutes from './utils/ProtectedRoutes'
import AuthProvider from './components/store/AuthProvider'
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
        element: (
          <ProtectedRoutes requiredRole="user">
            <Page />
          </ProtectedRoutes>
        )
    },
    {
        path: '/reset-email',
        element: <GetEmail />
    },
    {
        path: '/new-password/:token',
        element: <NewPassword />
    },
    {
      path: "/admin",
      element: (
          <ProtectedRoutes requiredRole="admin">
              <AdminPage />
          </ProtectedRoutes>
      ),
  },
]);
  return (
   <div className='bg-gray-900'>
     <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
     </QueryClientProvider>
   </div>
  )
}
