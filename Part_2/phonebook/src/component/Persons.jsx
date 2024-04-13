const Person = ({ filteredPersons }) => {
    return (
        <div>
            {filteredPersons.map(person => (
                <p key={person.id}>{person.name} {person.number}</p>
            ))}
        </div>
    )
}

export default Person;