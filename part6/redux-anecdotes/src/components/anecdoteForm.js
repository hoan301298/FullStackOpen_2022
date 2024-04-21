import React from 'react'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { connect } from 'react-redux'

const AnecdoteForm = (props) => {
    const addAnecdote = async (event) => {
        event.preventDefault()
        const anec = event.target.anecdote.value
        event.target.anecdote.value = ''
        props.createAnecdote(anec)
    }

    return (
      <>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input name='anecdote'/></div>
        <button>create</button>
      </form>
      </>
    )
}

export default connect(
  null,
  {createAnecdote}
)(AnecdoteForm)