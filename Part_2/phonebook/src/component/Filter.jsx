import React, { useState, useEffect } from 'react';

const Filter = (props) => {

    const persons = props.persons;
    const handleFilterChange = props.handleFilterChange;

    const [newFilterValue, setNewFilterValue] = useState('')
    const [newFilteredArray, setNewFilteredArray] = useState([])

    const handleChange = (event) => {
        const newValue = event.target.value.toLowerCase();
        console.log(newValue);
        setNewFilterValue(newValue);
        handleFilterChange(newValue);
    }
    
    useEffect(() => {
        // This effect runs whenever newFilterValue changes
        setNewFilteredArray(persons.filter(p => p.name.toLowerCase().includes(newFilterValue)));
    }, [newFilterValue, persons]);

    return (
        <div>
            Filter shown with: <input value={newFilterValue} onChange={handleChange}/>
        </div>
    )
}

export default Filter;