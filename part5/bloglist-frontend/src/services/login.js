import axios from 'axios'
const baseUrl = '/api/login'

const login = async object => {
  const response = await axios.post(baseUrl, object)
  return response.data
}

const object = { login }

export default object