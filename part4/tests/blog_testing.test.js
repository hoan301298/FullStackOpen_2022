const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('./blog_helper')
const jwt = require('jsonwebtoken')

const api = supertest(app)

const storage = {}

beforeEach(async () => {
    await Blog.deleteMany({})
    await User.deleteMany({})

    const users = helper.hashedUsers.map(user => new User(user))
    const promiseArr = users.map(user => user.save())
    await Promise.all(promiseArr)

    const usedUser = {
        username: users[0].username,
        id: users[0].id
    }

    const notUsedUser = {
        username: users[1].username,
        id: users[1].id
    }

    const usedToken = jwt.sign(usedUser, process.env.SECRET)
    const notUsedToken = jwt.sign(notUsedUser, process.env.SECRET)

    storage.usedToken = `bearer ${usedToken}`
    storage.notUsedToken = `bearer ${notUsedToken}`

    const usedId = users[0].id

    const blogs = helper.testingBlogs.map(blog => new Blog({...blog, user:usedId}))
    const promiseArray = blogs.map(blog => blog.save())
    await Promise.all(promiseArray)
})

describe('get method', () => {
    test('get method returned as json and same length', async () => {
        const response = await api.get('/api/blogs')
        .expect(200).expect('Content-Type', /application\/json/)
        expect(response.body.length).toBe(helper.testingBlogs.length)
    })

    test('returned 400 if invalid id', async () => {
        const invalidId = 'djasdjasdjasdjasd'
        await api.get(`/api/blogs/${invalidId}`).expect(400)
    })

    test('there is id property', async () => {
        const response = await api.get('/api/blogs').expect(200).expect('Content-Type', /application\/json/)
        expect(response.body[0].id).toBeDefined()
    })
    
})

test('post method saved correctly and increase the length', async () => {
    await api.post('/api/blogs').set('Content-Type', 'application/json')
    .set('Authorization', storage.usedToken)
    .send(helper.validBlog).expect(200)
    const updatedBlogs = await helper.blogsInDb()
    expect(updatedBlogs.length).toBe(helper.testingBlogs.length+1)
    const titles = updatedBlogs.map(blog => blog.title)
    expect(titles).toContain('Matsuri')
})

test('unique username only', async () => {
    const replicateUser = {
        username : "username1",
        name : "name1",
        password : "password1"
    }
     await api.post('/api/users').set('Content-Type', 'application/json')
    .send(replicateUser).expect(400)
})

test('likes in default is 0', async () => {
    const response = await api.post('/api/blogs').set('Content-Type', 'application/json')
    .set('Authorization', storage.usedToken)
    .send(helper.missingLikesBlog).expect(200)
    expect(response.body.likes).toBe(0)
})

test('deleting return 204 and not containing the title', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const deletingBlog = blogsAtStart[0]
    await api.delete(`/api/blogs/${deletingBlog.id}`)
    .set('Authorization', storage.usedToken)
    .expect(204)
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd.length).toBe(helper.testingBlogs.length-1)
    const titles = blogsAtEnd.map(blog => blog.title)
    expect(titles).not.toContain(deletingBlog.title)
})

test('updating a blog', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const updatingBlog = blogsAtStart[0]

    await api.put(`/api/blogs/${updatingBlog.id}`).set('Content-Type', 'application/json')
    .set('Authorization', storage.usedToken)
    .send(helper.updatingBlog).expect(200)
    const blogsAtEnd = await helper.blogsInDb() 
    expect(blogsAtEnd.length).toBe(helper.testingBlogs.length)
    const likes = blogsAtEnd.map(blog => blog.likes)
    expect(likes).toContain(23189)
})

test('invalid if missing url or title', async () => {
    await api.post('/api/blogs').set('Content-Type', 'application/json')
    .set('Authorization', storage.usedToken)
    .send(helper.missingTitleBlog).expect(400)

    await api.post('/api/blogs').set('Content-Type', 'application/json')
    .set('Authorization', storage.usedToken)
    .send(helper.missingUrlBlog).expect(400)
})


afterAll(() => {
    mongoose.connection.close()
})