/* eslint-disable react/jsx-no-undef */
/* eslint-disable quotes */
/* eslint-disable no-unused-vars */
import { Table, Form, Button } from 'react-bootstrap'
import './index.css'
import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import Togglable from './components/Togglable'
import userService from './services/users'
import { SuscessMessage, ErrorMessage } from './components/Notification'
import { suscessNotification } from './reducers/suscessReducer'
import { errorNotification } from './reducers/errorReducer'
import { initBlogs, likeBlog, removeBlog, createBlog, disCommentBlog } from './reducers/blogsReducer'
import { initUser, logOut, setUser } from './reducers/userReducer'
import { Switch, Route, Link, useParams } from 'react-router-dom'

const Users = ({ users }) => {
  return (
    <>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <td></td>
            <td><b>blogs created</b></td>
          </tr>
        </thead>
        <tbody>
          {users.map(user =>
            <tr key={user.id}>
              <td><Link to={`/users/${user.id}`}>{user.username}</Link></td>
              <td>{user.blogs.length}</td>
            </tr>)}
        </tbody>
      </table>
    </>
  )
}

const User = ({ users }) => {
  const id = useParams().id
  const user = users.find(u => u.id === id)
  if(!user) return null
  return (
    <>
      <h2>{user.username}</h2>
      <h3>Added blogs</h3>
      <ul>
        {user.blogs.map(blog => <li key={blog.id}><Link to={`/blogs/${blog.id}`}>{blog.title}</Link></li>)}
      </ul>
    </>
  )
}

const BlogRoute = ({ blogs, updateBlog, deleteBlog, currentUser, commentingBlog }) => {
  const id = useParams().id
  const blog = blogs.find(b => b.id === id)
  if(!blog) return null
  return (
    <Blog blog={blog} updateBlog={updateBlog} deleteBlog={deleteBlog} currentUser={currentUser} commentingBlog={commentingBlog}/>
  )
}

const MenuNav = ({ user }) => {
  const dispatch = useDispatch()
  const padding = {
    padding: 5,
  }
  return (
    <div style={{ backgroundColor: 'gray' }}>
      <Link to='/' style={padding}>blogs</Link>
      <Link to='/users' style={padding}>users</Link>
      {user.username} logged in
      <button id='logout' onClick={() => {
        dispatch(logOut())
      }}>log out</button>
    </div>
  )
}

const App = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [users, setUsers] = useState([])
  useEffect(() => {
    userService.getAll().then(response => {
      setUsers(response)
    })
  }, [])

  const blogFormRef = useRef()

  useEffect(() => {
    dispatch(initBlogs())
  }, [dispatch])

  useEffect(() => {
    dispatch(initUser())
  }, [dispatch])

  const comp = (a, b) => {
    if(a.likes > b.likes) return -1
    if(a.likes < b.likes) return 1
    return 0
  }

  blogs.sort(comp)

  const addBlog = blogObj => {
    blogFormRef.current.toggleVisibility()
    dispatch(createBlog(blogObj))
    dispatch(suscessNotification(`a new blog ${blogObj.title} by ${blogObj.author} has been added`, 5000))
  }
  const updateBlog = blogObj => {
    dispatch(likeBlog(blogObj.id))
  }

  const deleteBlog = async blogObj => {
    const id = blogObj.id
    const deletedOne = await blogService.getOne({ id })
    dispatch(removeBlog(blogObj.id))
    dispatch(suscessNotification(`blog ${deletedOne.title} by ${deletedOne.author} has been deleted`, 5000))
  }

  const commentingBlog = async blogObj => {
    dispatch(disCommentBlog(blogObj))
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try{
      dispatch(setUser(username, password))
    } catch(ex) {
      console.log('b')
      dispatch(errorNotification('wrong', 5000))
    }
  }

  if(user === null) {
    return (
      <>
        <ErrorMessage />
        <Togglable buttonLabel='login' cancelLabel='cancel'>
          <form onSubmit={handleLogin}>
            username
            <input
              type="text"
              id='username'
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
            <div>
              password
              <input
                type="password"
                id='password'
                value={password}
                name="Password"
                onChange={({ target }) => setPassword(target.value)}
              />
            </div>
            <button variant='primary' type='submit'>login</button>
          </form>
        </Togglable>
      </>
    )
  }
  return (
    <div className='container'>
      <SuscessMessage />
      <MenuNav user={user}/>
      <h2>blog app</h2>
      <Switch>
        <Route path='/users/:id'>
          <User users={users}/>
        </Route>
        <Route path='/users'>
          <Users users={users}/>
        </Route>
        <Route path='/blogs/:id'>
          <BlogRoute blogs={blogs} updateBlog={updateBlog} deleteBlog={deleteBlog} currentUser={user} commentingBlog={commentingBlog}/>
        </Route>
        <Route path='/'>
          <Togglable buttonLabel='create new blog' cancelLabel='cancel' ref={blogFormRef}>
            <BlogForm addBlog={addBlog} />
          </Togglable>
          <Table striped>
            <tbody>
              {blogs.map(blog =>
                <tr key={blog.id}>
                  <td><Link to={`/blogs/${blog.id}`}>{blog.title} by {blog.author}</Link></td>
                  <td>{blog.user.username}</td>
                </tr>
              )}
            </tbody>
          </Table>
        </Route>
      </Switch>
    </div>
  )
}

export default App