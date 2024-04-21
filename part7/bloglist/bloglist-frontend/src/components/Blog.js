import React, { useState } from 'react'
import { useHistory } from 'react-router'

const Blog = ({ blog, updateBlog, deleteBlog, currentUser, commentingBlog }) => {
  const history = useHistory()
  const [comment, setComment] = useState('')

  const updatingBlog = () => {
    updateBlog({
      id: blog.id
    })
  }

  const confirmDelete = () => {
    deleteBlog({
      id : blog.id,
      user: blog.user
    })
    history.push('/')
  }

  const commentTheBlog =  (event) => {
    event.preventDefault()
    commentingBlog({
      id: blog.id,
      author: blog.author,
      likes: blog.likes,
      comment
    })
    setComment('')
  }

  return (
    <>
      <h2> {blog.title} by {blog.author}</h2>
      {blog.url} <br />
      likes : {blog.likes} <button onClick={updatingBlog}>Like</button><br />
      {blog.user.username} <br />
      {blog.user.username !== currentUser.username ? <></>: <><button onClick={() => {window.confirm(`Delete ${blog.title} by ${blog.author} ?`) ? confirmDelete(): <></>}}>Delete</button> <br /></>}
      <form onSubmit={commentTheBlog}>
        <input type='text' value={comment} onChange={({ target }) => setComment(target.value)}/>
        <button type='submit'>Comment</button>
      </form>
      <h3>Comments</h3>
      <ul>
        {blog.comments.map(comment => <li key={comment}>{comment}</li>)}
      </ul>
    </>
  )
}

export default Blog