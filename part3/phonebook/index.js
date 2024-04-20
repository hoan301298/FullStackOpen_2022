require('dotenv').config()
const express = require('express')
const app = express()
var morgan = require('morgan')
var cors = require('cors')

morgan.token('strjson', function(req) {return JSON.stringify(req.body)})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :strjson'))
app.use(express.json())
app.use(cors())
app.use(express.static('build'))


var today = new Date()
var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()
var time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds()

const Person = require('./models/person')

const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    }

    next(error)
}

app.get('/', (request, response) => {
    response.send('<h1>This is back end</h1>')
})
  
app.get('/api/persons', (request, response, next) => {
    Person.find({}).then(person => {
        response.json(person)
    })
        .catch(error => next(error))
})

app.get('/info', (request, response, next) => {
    Person.find({}).then(result => {
        const info = {
            length : result.length,
            date : date,
            time : time 
        }
        response.json(info)
    })
        .catch(error => next(error))
})

app.get('/api/persons/:id', (request, response) => {
    Person.findById(request.params.id)
        .then(person => {
            if (person) {
                response.json(person)
            } else {
                response.status(404).end() 
            }
        })
        .catch(error => {
            console.log(error)
            response.status(400).send({ error: 'malformatted id' })
        })
})

app.delete('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndRemove(request.params.id)
        .then(() => {
            response.status(204).end()
        })
        .catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
    const body = request.body
    if(!body.name) {
        return response.status(400).json({
            error: 'name missing'
        })
    }

    if(!body.number) {
        return response.status(400).json({
            error: 'number missing'
        })
    }
    
    const person = new Person({
        name : body.name,
        number : body.number
    })
    
    person.save().then(saved => {
        response.json(saved)
    })
        .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
    const body = request.body

    const person = {
        name: body.name,
        number: body.number,
    }

    Person.findByIdAndUpdate(request.params.id, person, { new: true })
        .then(updatedPerson => {
            response.json(updatedPerson)
        })
        .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

app.use(errorHandler)


const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
