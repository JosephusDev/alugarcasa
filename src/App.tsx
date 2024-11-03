import '@/index.css'
import MainScreen from './pages/Home'
import Rotas from './routes'

function App() {
  const token = localStorage.getItem("token")

  console.log("token: " + token)

  const ComponentReturn = token && token.length > 0 ? <MainScreen/> : <Rotas/>

  return ComponentReturn
}

export default App
