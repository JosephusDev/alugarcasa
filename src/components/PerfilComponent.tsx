import { User } from 'lucide-react'
import { MeuModal } from './MeuModal'
import { Button } from './ui/button'
import { SidebarMenuButton } from './ui/sidebar'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { toast } from '@/hooks/use-toast'
import { useState } from 'react'
import Api from '@/api'
import { useAuth } from '@/context/AuthContext'

export function PerfilComponent() {
  const { logout } = useAuth()
  const nomeIncial = localStorage.getItem('nome')
  const contatoInicial = localStorage.getItem('contato')

  const [nome, setNome] = useState(nomeIncial || '')
  const [contato, setContato] = useState(contatoInicial || '')
  const [senha, setSenha] = useState('')

  const editarPerfil = async () => {
    const id_usuario = localStorage.getItem('id')
    if (nome.trim() && contato.trim()) {
      await Api.put(`/usuario/${id_usuario}`, { nome, contato, senha })
        .then((response) => {
          const message = response?.data.message
          const detalhes = response?.data.detalhes
          if (message) {
            toast({
              description: message,
            })
            logout()
          } else if (detalhes) {
            toast({
              description: (
                <div className='font-bold'>
                  <ul>
                    {detalhes.map((d: string) => {
                      return <li key={d}>{d}</li>
                    })}
                  </ul>
                </div>
              ),
              variant: 'destructive',
            })
          }
        })
        .catch((error) => {
          console.error(error)
          toast({
            description: 'Erro ao editar perfil',
            variant: 'destructive',
          })
        })
    } else {
      toast({
        description: 'Preencha o Nome e Contato!',
        variant: 'destructive',
      })
    }
  }
  //
  return (
    <>
      <MeuModal
        title='Editar Perfil'
        trigger={
          <SidebarMenuButton asChild>
            <Button className='justify-start' variant={'ghost'}>
              <User />
              <span>{nomeIncial}</span>
            </Button>
          </SidebarMenuButton>
        }
        buttonTitle='Salvar'
        children={
          <>
            <div className='grid grid-rows-1 gap-1'>
              <Label htmlFor='nome'>Nome do Utilizador</Label>
              <Input
                id='nome'
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                className='col-span-3'
              />
            </div>
            <div className='grid grid-rows-1 gap-1'>
              <Label htmlFor='contato'>Contato do Utilizador</Label>
              <Input
                id='contato'
                value={contato}
                onChange={(e) => setContato(e.target.value)}
                className='col-span-3'
              />
            </div>
            <div className='grid grid-rows-1 gap-1'>
              <Label htmlFor='senha'>Palavra-passe</Label>
              <Input
                id='senha'
                type='password'
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                className='col-span-3'
              />
            </div>
          </>
        }
        onClick={editarPerfil}
      />
    </>
  )
}
