import axios from 'axios'

const urlBase = 'https://alugarcasa-api.vercel.app'

const Api = axios.create({
  baseURL: urlBase,
})

export default Api
