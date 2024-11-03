import { Routes, Route, Navigate } from 'react-router-dom'

import LoginScreen from '@/pages/Login'
import CadastroScreen from '@/pages/Cadastro'
import { PropriedadeComponent } from '@/components/PropriedadeComponent'
import { HomeComponent } from '@/components/HomeComponent'
import { PerfilComponent } from '@/components/PerfilComponent'

export default function Rotas() {
  const token = localStorage.getItem("token")

  console.log("token: " + token)

  const RoutesAuth = (
    <Routes>
      <Route path='/home' element={<HomeComponent />} />
      <Route path='/propriedades' element={<PropriedadeComponent />} />
      <Route path='/perfil' element={<PerfilComponent />} />
      <Route path='*' element={<Navigate to='/home' />} />
    </Routes>
  )

  const RoutesPublic = (
    <Routes>
      <Route path='/login' element={<LoginScreen />} />
      <Route path='/cadastro' element={<CadastroScreen />} />
      <Route path='*' element={<Navigate to='/login' />} />
    </Routes>
  )

  const ComponentReturn = token && token.length > 0 ? RoutesAuth : RoutesPublic

  return ComponentReturn
  
}
