const mongoose = require('mongoose')

if(process.argv.length < 3) {
    console.log('Missing argument. Try again !')
    process.exit(1)
}

const argument = process.argv

const password = argument[2]

const url = `mongodb+srv://Mumei:${password}@cluster0.7qap4.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name: String,
    number: String
})

const Person = mongoose.model('Person', personSchema)

if(argument.length > 3) {
    const person = new Person ({
        name: argument[3],
        number: argument[4]
    })

    person.save().then(() => {
        console.log(`added ${person.name} number ${person.number} to the phonebook`)
        mongoose.connection.close()
    })
}
else {
    console.log('phonebook:\n')
    Person.find({}).then(result => {
        result.forEach(person => {
            console.log(`${person.name} ${person.number}`)           
        })
        mongoose.connection.close()
    })
}