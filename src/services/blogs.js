import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async (body, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  }
  const response = await axios.post(baseUrl, body, config)
  return response.data
}

const update = async (id, body) => {
  const response = await axios.put(`${baseUrl}/${id}`, body)
  return response.data
}

export default { getAll, create, update }