import axios from 'axios'
const baseUrl = '/api/persons'

const getAll = () => {
  return axios.get(baseUrl).then(response => response.data)
}

const create = newObject => {
  return axios.post(baseUrl, newObject).then(response => response.data)
}

const terminate = (Object) => {
    return axios.delete(`${baseUrl}/${Object.id}`, Object).then(response => response.data)
}

const update = (Object) => {
    return axios.put(`${baseUrl}/${Object.id}`, Object).then(response => response.data)
}

const allActions = {getAll,  create, terminate, update}

export default allActions;