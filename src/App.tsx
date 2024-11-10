import '@/index.css'
import MainScreen from './pages/MainScreen'
import { ThemeProvider } from '@/context/ThemeContext'

function App() {
  return (
    <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
      {<MainScreen />}
    </ThemeProvider>
  )
}

export default App
