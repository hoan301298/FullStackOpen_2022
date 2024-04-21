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

const getOne = async object => {
  const response = await axios.get(`${baseUrl}/${object.id}`)
  return response.data
}

const likeBlog = async object => {
  const updated = { ...object, likes: object.likes+1 }
  const response = await axios.put(`${baseUrl}/${object.id}`, updated)
  return response.data
}

const commentBlog = async object => {
  const updated = { ...object.blog, comments: object.needBlog.comments.concat([object.comment]), author: object.author, likes: object.likes }
  const response = await axios.put(`${baseUrl}/${object.needBlog.id}`, updated)
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

const object = { getAll, setToken, upload, likeBlog, clearOut, getOne, commentBlog }
export default object