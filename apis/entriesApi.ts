import axios from 'axios'

const entriesApi = axios.create({
  baseURL: '/api', //Como esta dentro del mismo dominio se pone solo asi
})

export default entriesApi
