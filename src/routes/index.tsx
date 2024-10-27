import { Routes, Route, Navigate } from 'react-router-dom'

import LoginScreen from '@/pages/Login'
import CadastroScreen from '@/pages/Cadastro'
import HomeScreen from '@/pages/Home'

export default function Rotas() {
  return (
    <Routes>
      <Route path='/login' element={<LoginScreen />} />
      <Route path='/cadastro' element={<CadastroScreen />} />
      <Route path='/home' element={<HomeScreen />} />
      <Route path='*' element={<Navigate to='/login' />} />
    </Routes>
  )
}
