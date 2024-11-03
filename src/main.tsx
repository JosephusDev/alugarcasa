import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { Toaster } from './components/ui/toaster.tsx'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext.tsx'
import { SidebarProvider } from './components/ui/sidebar.tsx'
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <SidebarProvider>
          <App />
        </SidebarProvider>
      </AuthProvider>
    </BrowserRouter>
    <Toaster />
  </StrictMode>,
)
