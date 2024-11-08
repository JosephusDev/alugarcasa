import { User } from 'lucide-react'
import { MeuModal } from './MeuModal'
import { Button } from './ui/button'
import { SidebarMenuButton } from './ui/sidebar'
import { Label } from './ui/label'
import { Input } from './ui/input'

const nome = localStorage.getItem('nome')

export function PerfilComponent() {
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
                value={nome?.toString()}
                className='col-span-3'
              />
            </div>
            <div className='grid grid-rows-1 gap-1'>
              <Label htmlFor='senha'>Senha</Label>
              <Input id='senha' className='col-span-3' />
            </div>
          </>
        }
      />
    </>
  )
}
