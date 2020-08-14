import axios from 'axios'

const apiClient = axios.create({
  baseURL:
    'https://pibibox.com.br/api/v1/estabelecimentos/2842a995-f097-43d3-80e8-8870146179c9/',
  withCredentiais: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

export default {
  getCardapio () {
    return apiClient.get('/cardapio')
  },
  getProdutoById (id) {
    return apiClient.get('/produtos/' + id)
  }
}
