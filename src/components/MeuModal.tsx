import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import React from 'react'

interface ModalProps {
  children: React.ReactNode
  title: string
  buttonTitle?: string
  trigger: React.ReactNode
  onClick?: () => void
  visibleFooter?: boolean
}

export function MeuModal({
  children,
  title,
  buttonTitle,
  onClick,
  trigger,
  visibleFooter = true,
}: ModalProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className='sm:max-w-[60%px]'>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className='grid gap-4 py-4'>{children}</div>
        {
          visibleFooter && (
            <DialogFooter>
              <Button onClick={onClick} type='submit'>
                {buttonTitle}
              </Button>
            </DialogFooter>
          )
        }
      </DialogContent>
    </Dialog>
  )
}
