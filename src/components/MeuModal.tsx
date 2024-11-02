import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { PlusCircle } from 'lucide-react'

interface ModalProps {
  children: React.ReactNode
  title?: string
  buttonTitle?: string
  onClick?: () => void
}

export function MeuModal({
  children,
  title = 'Adicionar Propriedade',
  buttonTitle = 'Cadastrar',
  onClick,
}: ModalProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className='gap-2'>
          <PlusCircle size={15} /> Adicionar
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[60%px]'>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className='grid gap-4 py-4'>{children}</div>
        <DialogFooter>
          <Button onClick={onClick} type='submit'>
            {buttonTitle}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
