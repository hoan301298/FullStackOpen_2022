import axios from 'axios'
const baseUrl = '/api/blogs'
let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const update = async object => {
  const response = await axios.put(`${baseUrl}/${object.id}`, object)
  return response.data
}

const upload = async object => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.post(baseUrl, object, config)
  return response.data
}

const clearOut = async object => {
  try {
    const config = {
      headers: { Authorization: token }
    }
    await axios.delete(`${baseUrl}/${object.id}`, config)
  } catch (e) {
    console.trace(e)
  }
}

const object = { getAll, setToken, upload, update, clearOut }
export default object