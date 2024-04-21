import React from 'react'
import Togglable from './Togglable'


const Blog = ({ blog, updateBlog, deleteBlog, currentUser }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const updatingBlog = object => {
    updateBlog({
      likes: blog.likes+1,
      author: blog.author,
      id: blog.id
    })
  }

  const confirmDelete = object => {
    deleteBlog({
      id : blog.id,
      user: blog.user
    })
  }

  return (
    <div style={blogStyle}>
      {blog.title} by {blog.author} <br />
      <Togglable buttonLabel='show' cancelLabel='hide'>
        {blog.url} <br />
    likes : {blog.likes} <button onClick={updatingBlog}>Like</button><br />
        {blog.user.username} <br />
        {blog.user.username !== currentUser.username ? <></>: <><button onClick={() => {window.confirm(`Delete ${blog.title} by ${blog.author} ?`) ? confirmDelete(): <></>}}>Delete</button> <br /></>}
      </Togglable>
    </div>
  )}

export default Blog