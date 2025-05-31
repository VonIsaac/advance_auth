import LogIn from './components/LogIn';
import SignUp from './components/SignUp';
import Page from './components/Page';
import NewPassword from './components/UI/NewPassword';
import GetEmail from './components/UI/GetEmail';

import { createBrowserRouter, RouterProvider, useRouteError,  Navigate } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './utils/http';
import AdminPage from './components/AdminPages';
import ProtectedRoutes from './ProtectedRoutes';
import AuthProvider from './components/store/AuthProvider';
import { ErrorBoundary } from './components/UI/ErrorBoundary';






//const isLoggedIns = JSON.parse(localStorage.getItem("keepLoggedIn"));

const router = createBrowserRouter([
  { path: '/', element:   <Navigate to={'/login'} />  , errorElement: <ErrorBoundary useRouteError={useRouteError} /> },
  { path: '/login', element: <LogIn />, errorElement: <ErrorBoundary useRouteError={useRouteError} /> },
  { path: '/signup', element: <SignUp />, errorElement: <ErrorBoundary useRouteError={useRouteError} /> },
  {
    path: '/page',
    element: (
      <ProtectedRoutes >
        <Page />
      </ProtectedRoutes>
    ),
    errorElement: <ErrorBoundary useRouteError={useRouteError} />
  },
  {
    path: '/admin',
    element: (
      <ProtectedRoutes  >
        <AdminPage />
      </ProtectedRoutes>
    ),
    errorElement: <ErrorBoundary  useRouteError={useRouteError}/>
  },
  { path: '/reset-email', element: <GetEmail />, errorElement: <ErrorBoundary useRouteError={useRouteError} /> },
  { path: '/new-password/:token', element: <NewPassword />, errorElement: <ErrorBoundary useRouteError={useRouteError} /> },
  {
    path: "*",
    element: (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
          <p className="mb-4">The page you&apos;re looking for doesn&apos;t exist.</p>
          <button
            onClick={() => window.location.href = '/'}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Go Home
          </button>
        </div>
      </div>
    )
  }
]);

export default function App() {
 
  return (
    <div className='bg-gray-900 min-h-screen'>
      <QueryClientProvider client={queryClient}>
        
        <AuthProvider>
         
          <RouterProvider router={router} />
        </AuthProvider>
      </QueryClientProvider>
    </div>
  );
}
