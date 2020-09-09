import axios from 'axios'

const apiClient = axios.create({
  baseURL:
    'https://pibibox.com.br/api/v1/estabelecimentos/',
  withCredentiais: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

export default {
  getCardapio (id) {
    return apiClient.get(`${id}/cardapio/`,)
  },
  getProdutoById (id) {
    return apiClient.get('/produtos/' + id)
  },
  postPedido (payload) {
    return apiClient.post('https://pibibox.com.br/api/v1/pedidos/', payload)
  }
}
