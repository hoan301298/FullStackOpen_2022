import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const needAnec = async (object) => {
  const response = await axios.get(`${baseUrl}/${object.id}`)
  return response.data
}

const createNew = async (anecdote) => {
  const object = {content: anecdote, votes: 0}
  const response = await axios.post(baseUrl, object)
  return response.data
}

const likeVotes = async (anecdote) => {
  const object = {...anecdote, votes: anecdote.votes+1}
  const response = await axios.put(`${baseUrl}/${object.id}`, object)
  return response.data
}

const objectExport = { getAll, createNew, likeVotes, needAnec }

export default objectExport