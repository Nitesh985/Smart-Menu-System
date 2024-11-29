import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import Test from './pages/Test.tsx'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import { AlertProvider } from './context/AlertContext.tsx'
import { AdminLayout, Dashboard, EditMenu, Orders } from './pages/admin'
import { NotFoundPage } from './pages'


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" >
      <Route path="admin/" element={<AdminLayout />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="edit-menu" element={<EditMenu />} />
        <Route path="orders" element={<Orders />} />
      </Route>
      <Route path="" element={<App />} />
      <Route path="test" element={<Test />} />
      <Route path="*" element={<NotFoundPage />} />
    </Route>
  )
)

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AlertProvider>
      <RouterProvider router={router} />
    </AlertProvider>
  </React.StrictMode>,
)
