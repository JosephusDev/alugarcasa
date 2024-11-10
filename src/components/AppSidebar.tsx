import { Home, Inbox, LogOut, Moon, Sun } from 'lucide-react'

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import { Button } from './ui/button'
import { useAuth } from '@/context/AuthContext'
import { useTheme } from '@/context/ThemeContext'
import { PerfilComponent } from './PerfilComponent'

// Menu items.
const items = [
  {
    title: 'Home',
    url: '/home',
    icon: Home,
  },
  {
    title: 'Propriedades',
    url: '/propriedades',
    icon: Inbox,
  },
]

export function AppSidebar() {
  const { logout } = useAuth()
  const { theme, setTheme } = useTheme()

  const alterarTema = () => {
    if (theme === 'light') {
      setTheme('dark')
    } else {
      setTheme('light')
    }
  }

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem key='theme'>
            <SidebarMenuButton asChild>
              <Button
                className='justify-start'
                onClick={alterarTema}
                variant={'ghost'}
              >
                {theme === 'light' ? <Moon /> : <Sun />}
                <span>Alternar Tema</span>
              </Button>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem key='perfil'>
            <PerfilComponent />
          </SidebarMenuItem>
          <SidebarMenuItem key='logout'>
            <SidebarMenuButton asChild>
              <Button
                className='justify-start'
                onClick={logout}
                variant={'ghost'}
              >
                <LogOut />
                <span>Terminar sessão</span>
              </Button>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
