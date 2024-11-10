import { User } from 'lucide-react'
import { MeuModal } from './MeuModal'
import { Button } from './ui/button'
import { SidebarMenuButton } from './ui/sidebar'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { toast, useToast } from '@/hooks/use-toast'
import { useState } from 'react'
import Api from '@/api'

export function PerfilComponent() {
  const nomeIncial = localStorage.getItem('nome')
  const [nome, setNome] = useState(nomeIncial || '')
  const [senha, setSenha] = useState('')

  const editarPerfil = async () => {
    const id_usuario = localStorage.getItem('id')
    const token = localStorage.getItem('token')

    try {
      const response = await Api.put(
        `/usuario/editar/${id_usuario}`,
        { nome, senha },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      )
      toast({
        description: 'Perfil atualizado com sucesso',
      })
    } catch (error) {
      toast({
        description: 'Erro ao editar perfil',
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
              <span>{nome}</span>
            </Button>
          </SidebarMenuButton>
        }
        buttonTitle='Editar'
        children={
          <>
            <div className='grid grid-rows-1 gap-1'>
              <Label htmlFor='nome'>Nome de Usuário</Label>
              <Input
                id='nome'
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                className='col-span-3'
              />
            </div>
            <div className='grid grid-rows-1 gap-1'>
              <Label htmlFor='senha'>Senha</Label>
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
