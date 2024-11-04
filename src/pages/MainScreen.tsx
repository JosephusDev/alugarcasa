import { AppSidebar } from '@/components/AppSidebar'
import { Button } from '@/components/ui/button'
import { useSidebar } from '@/components/ui/sidebar'
import { useAuth } from '@/context/AuthContext'
import Rotas from '@/routes'
import { Menu } from 'lucide-react'

export default function MainScreen() {
  const { toggleSidebar } = useSidebar()

  const { isAuthenticated } = useAuth()

  return (
    <>
      {isAuthenticated ? (
        <>
          <AppSidebar />
          <main className='w-full'>
            <Button
              className='m-1'
              size={'icon'}
              onClick={toggleSidebar}
              variant={'ghost'}
            >
              <Menu size={15} />
            </Button>
            <Rotas />
          </main>
        </>
      ) : (
        <Rotas />
      )}
    </>
  )
}
