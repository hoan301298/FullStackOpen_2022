import { useEffect, useState } from "react"
import { useDebounce } from "use-debounce";
import TextInput from "./TextInput";
import * as React from 'react';


const FilterInput = ({ setFilter, filter }) => {
    const [input, setInput] = useState(filter);
    const [debounce] = useDebounce(input, 100);

    useEffect(() => {
        setFilter(debounce)
    }, [input]);

    return (
        <TextInput 
        value={input}
        onChangeText={setInput}
        placeholder="Filter"
        />
    )
}

export default FilterInput;