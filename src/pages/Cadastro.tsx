import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { UserPlus } from 'lucide-react'
import ImageAvatar from '@/assets/img/avatar.jpg'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import Api from '@/api'
import { useToast } from '@/hooks/use-toast'

export default function CadastroScreen() {
  const { toast } = useToast()
  const [nome, setNome] = useState('')
  const [senha, setSenha] = useState('')
  const Cadastrar = async () => {
    await Api.post('/usuario', { nome, senha })
      .then((response) => {
        const sucesso = response?.data.message
        const detalhes = response?.data.detalhes
        if (sucesso) {
          toast({
            description: (
              <div className='font-bold'>
                Utilizador cadastrado com sucesso!
              </div>
            ),
          })
          navigate('/login')
        } else if (detalhes) {
          toast({
            description: <div className='font-bold'>{detalhes}</div>,
          })
        }
      })
      .catch((error) => console.error(error))
  }

  const navigate = useNavigate()

  return (
    <div className='justify-center items-center w-screen h-screen flex'>
      <Card className='w-[30%] bg-primary-foreground'>
        <CardHeader className='flex justify-center items-center'>
          <Avatar className='w-20 h-20'>
            <AvatarImage src={ImageAvatar} />
          </Avatar>
          <CardTitle className='text-2xl'>Meu Kubico</CardTitle>
          <CardDescription>Cria uma conta para acessar</CardDescription>
        </CardHeader>
        <CardContent>
          <Label htmlFor='nome'>Utilizador</Label>
          <Input
            onChange={(e) => setNome(e.target.value)}
            type='text'
            id='nome'
            placeholder='Utilizador'
            className='my-3'
          />

          <Label htmlFor='senha'>Senha</Label>
          <Input
            onChange={(e) => setSenha(e.target.value)}
            type='password'
            id='senha'
            placeholder='Senha'
            className='my-3'
          />

          <Button onClick={Cadastrar} className='my-3 w-full gap-x-3'>
            <UserPlus size={15} /> Criar
          </Button>
          <div className='flex items-center justify-center'>
            <Button onClick={() => navigate('/login')} variant={'link'}>
              Já tenho uma conta
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
