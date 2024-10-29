import Api from '@/api'
import { useToast } from '@/hooks/use-toast'
import { createContext, useContext } from 'react'
import { useNavigate } from 'react-router-dom'

interface AuthType {
  login: (nome: string, senha: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { toast } = useToast()
  const navigate = useNavigate()

  const login = async (nome: string, senha: string) => {
    if (nome && senha) {
      const response = await Api.post('/usuario/login', { nome, senha })

      if (response.data.token) {
        localStorage.setItem('autenticado', 'true')
        localStorage.setItem('id', response.data.id)
        localStorage.setItem('nome', response.data.nome)
        localStorage.setItem('token', response.data.token)
        navigate('/home')
      } else {
        toast({
          description: (
            <div className='font-bold'>Utilizador não encontrado!</div>
          ),
        })
      }
    } else {
      toast({
        description: <div className='font-bold'>Preencha todos os campos!</div>,
      })
    }
  }

  const logout = () => {
    localStorage.removeItem('autenticado')
    localStorage.removeItem('id')
    localStorage.removeItem('nome')
    localStorage.removeItem('token')
  }

  return (
    <AuthContext.Provider value={{ login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
