import axios from 'axios'

const urlBase = 'http://localhost:8800'

const Api = axios.create({
  baseURL: urlBase,
})

export default Api
