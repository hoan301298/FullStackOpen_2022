import { useLazyQuery, useQuery } from '@apollo/client'
import React, {useEffect, useState} from 'react'
import { ALL_BOOKS_BY_REC, ME } from '../queries'

const Recommendations = (props) => {
    const [favoriteGenre, result] = useLazyQuery(ALL_BOOKS_BY_REC)
    const [displayed, setDisplayed] = useState([])
    const user = useQuery(ME)
    useEffect(() => {
        if(user.data) {
            favoriteGenre({variables: {genre: user.data.me.favoriteGenre}})
        }
    }, [user.data, favoriteGenre])

    useEffect(() => {
        if(result.data) {
            setDisplayed(result.data.allBooks)
        }
    }, [result.data])
    if(!props.show) return null
    
    return (
    <>
        <h2>books in your favorite genre <em>{user.data.me.favoriteGenre}</em></h2>
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
          {displayed.map(a =>
            <tr key={a.id}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
    </>
    )
}

export default Recommendations