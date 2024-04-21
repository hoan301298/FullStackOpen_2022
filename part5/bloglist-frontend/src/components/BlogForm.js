import { React, useState } from 'react'

const BlogForm = ({ addBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [likes, setLikes] = useState(0)

  const handleBlog = (event) => {
    event.preventDefault()
    addBlog({
      title: title,
      author: author,
      url: url,
      likes: likes
    })
    setAuthor('')
    setTitle('')
    setUrl('')
    setLikes(0)
  }

  return (
    <>
      <form onSubmit={handleBlog}>
        <h2>Creating new blog</h2>
        Title:<input type='text' id='title' value={title} onChange={({ target }) => setTitle(target.value)}/><br />
        Author:<input type='text' id='author' value={author} onChange={({ target }) => setAuthor(target.value)}/><br />
        Url:<input type='text' id='url' value={url} onChange={({ target }) => setUrl(target.value)}/><br />
        Likes:<input type='number' id='likes' value={likes} onChange={({ target }) => setLikes(target.value)} /> <br />
        <button type='submit'>Create</button>
      </form>
    </>
  )
}

export default BlogForm