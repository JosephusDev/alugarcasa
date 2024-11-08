import { Routes, Route, Navigate } from 'react-router-dom'

import LoginScreen from '@/pages/Login'
import CadastroScreen from '@/pages/Cadastro'
import { PropriedadeComponent } from '@/components/PropriedadeComponent'
import { HomeComponent } from '@/components/HomeComponent'
import { useAuth } from '@/context/AuthContext'

export default function Rotas() {
  const { isAuthenticated } = useAuth()
  return (
    <Routes>
      <Route
        path='/home'
        element={
          isAuthenticated ? <HomeComponent /> : <Navigate to={'/login'} />
        }
      />
      <Route
        path='/propriedades'
        element={
          isAuthenticated ? (
            <PropriedadeComponent />
          ) : (
            <Navigate to={'/login'} />
          )
        }
      />
      <Route path='/login' element={<LoginScreen />} />
      <Route path='/cadastro' element={<CadastroScreen />} />
      <Route
        path='*'
        element={<Navigate to={isAuthenticated ? '/home' : '/login'} />}
      />
    </Routes>
  )
}
