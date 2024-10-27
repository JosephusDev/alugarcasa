// Função para login do usuário
const fazerLogin = async (username, password) => {
  try {
    const response = await fetch('https://api.exemplo.com/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({ username, password }),
    })

    if (response.ok) {
      const dados = await response.json()
      setToken(dados.token) // Define o token recebido no estado
      console.log('Login bem-sucedido')
    } else {
      console.error('Erro no login')
    }
  } catch (error) {
    console.error('Erro de rede:', error)
  }
}
