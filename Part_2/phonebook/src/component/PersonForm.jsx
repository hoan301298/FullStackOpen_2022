import React, { useState } from 'react';

const PersonForm = (props) => {

    const [newName, setNewName] = useState('');
    const [newPhoneNumber, setNewPhoneNumber] = useState('');
    const [persons, setPersons] = useState([]);

    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }

    const handlePhoneNumberChange = (event) => {
        setNewPhoneNumber(event.target.value)
    }

    const addPerson = (event) => {
        event.preventDefault()
        let check = false;
        persons.map(p => {
          if(p.name.includes(newName)) {
              check = true
              return check
            }
          else {
            return null
          }
        })
        console.log(check)
        if(check === true) {
          alert(newName + " is already added to phonebook")
          return null
        }
        
        else {
          const personObject = {
            id: persons.length + 1,
            name: newName,
            phoneNumber: newPhoneNumber
          }  
          setPersons(persons.concat(personObject))
          setNewName('')
          setNewPhoneNumber('')
        }
    }

    return (
        <div>
            <form onSubmit={addPerson}>
                <div>
                    Name: <input value={newName} onChange={handleNameChange}/> <br/>
                    Phone Number: <input value={newPhoneNumber} onChange={handlePhoneNumberChange}/>
                </div>
                <div>
                    <button type="submit">Add</button>
                </div>
            </form>
        </div>  
    )
}

export default PersonForm;