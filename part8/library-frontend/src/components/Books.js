import React, { useState } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'
import Select from 'react-select'

const Books = (props) => {
  const [genre, setGenre] = useState({value: 'all', label:'all'})
  const result = useQuery(ALL_BOOKS)
  if (!props.show) {
    return null
  }
  if(result.loading) {
    return (
      <>Wait a bit....</>
    )
  }
  const genres = [{value: 'all', label: 'all'}] 
  let books = result.data.allBooks
  books.forEach(book => book.genres.forEach(genre => genres.push({value: genre, label: genre})))
  if(genre.value !== 'all') books = books.filter(book => book.genres.includes(genre.value))
  return (
    <div>
      <h2>books</h2>
      <h3>{genre.value === 'all' ? <>All choices</> : <>In genre {genre.value}</>}</h3>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books.map(a =>
            <tr key={a.id}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      List of genres: <Select options={genres} onChange={setGenre}/>
    </div>
  )
}

export default Books