const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const middleware = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    .populate('user', {username: 1, name: 1})
    response.status(200).json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id).populate('user', {username: 1, name: 1})
    if (blog) {
      response.status(200).json(blog.toJSON())
    } else {
      response.status(404).end()
    }
})

blogsRouter.post('/', middleware.userExtractor, async (request, response) => {
  const {body, user}  = request

  const blog = new Blog({
    title: body.title,
    author: body.author || "Anonymous",
    url: body.url,
    likes: body.likes || 0,
    user: user,
    comments: body.comments || []
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  response.status(200).json(savedBlog.toJSON())
})

blogsRouter.delete('/:id', middleware.userExtractor, async (request, response) => {
    const {user} = request 
    const blog = await Blog.findById(request.params.id)
    if(blog.user.toString() === user.id) {
      await blog.remove()
      return response.status(204).end()
    }
    return response.status(403).json({
      error: "user is not allowed"
    })
})

blogsRouter.put('/:id', async (request, response) => {
  const {body} = request 
  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    comments: body.comments || []
  }
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {new: true}).populate('user', {username: 1, name: 1})
  response.status(200).json(updatedBlog.toJSON())
})

module.exports = blogsRouter