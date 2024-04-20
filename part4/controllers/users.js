const bcrypt = require('bcryptjs')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) =>{
    const users = await User.find({})
    .populate('blogs', {title:1, author:1, url:1, likes:1})
    response.status(200).json(users.map(user => user.toJSON()))
})

usersRouter.get('/:id', async (request, response) => {
    const user = await User.findById(request.params.id)
    if(user) {
        response.status(200).json(user.toJSON())
    } else {
        response.status(404).end()
    }
})

usersRouter.post('/', async (request, response) => {
    const {body} = request

    if(!body.username || !body.password) {
        return response.status(400).json({
            error: "password or username is missing"
        })
    } 
    if(body.username.length < 3) {
        return response.status(400).json({
            error: "username must be 3 characters or longer"
        })
    }
    if(body.password.length < 3) {
        return response.status(400).json({
            error: "password must be 3 characters or longer"
        })
    }
    
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
        username: body.username || "Default user",
        name: body.name,
        passwordHash
    })

    const savedUser = await user.save()

    response.status(201).json(savedUser)
})

module.exports = usersRouter