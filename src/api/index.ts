import axios from 'axios'

const urlBase = 'http://192.168.0.6:8800'

const Api = axios.create({
  baseURL: urlBase,
})

export default Api
