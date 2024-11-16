import { Routes, Route, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

import LoginScreen from '@/pages/Login'
import CadastroScreen from '@/pages/Cadastro'
import { PropriedadeComponent } from '@/components/PropriedadeComponent'
import { HomeComponent } from '@/components/HomeComponent'
import { useAuth } from '@/context/AuthContext'
import Api from '@/api'

export default function Rotas() {
  const { isAuthenticated, logout } = useAuth()
  const [loading, setLoading] = useState(true) // Estado de carregamento
  const token = localStorage.getItem('token')

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const response = await Api.get('/verify-token', {
          headers: { Authorization: `Bearer ${token}` },
        })
        if (!response.data.valide) {
          logout()
        }
      } catch (error) {
        console.error('Erro ao verificar token:', error)
        logout()
      } finally {
        setLoading(false) // Finaliza o carregamento
      }
    }

    if (token) {
      verifyToken()
    } else {
      setLoading(false) // Nenhum token, carregamento é concluído
    }
  }, [token, logout])

  if (loading) {
    return <></> // Renderiza uma tela de carregamento
  }

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
