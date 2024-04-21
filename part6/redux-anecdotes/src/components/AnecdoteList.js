import React from 'react'
import { likeAnecdote } from '../reducers/anecdoteReducer'
import { createNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

const Anecdote = ({anecdote, likeAnecdote, createNotification}) => {
    const vote = (anecdote) => {
        likeAnecdote(anecdote.id)
        createNotification(`you voted '${anecdote.content}'`, 5000)
    }
    return (
        <div>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
    )
}

const AnecdoteList = (props) => {
    const {likeAnecdote, createNotification} = props
    return (
        <>
        {props.anecdotes.sort((mine, yours) => yours.votes - mine.votes) 
        .map(anecdote =>
            <Anecdote anecdote={anecdote} likeAnecdote={likeAnecdote} createNotification={createNotification} key={anecdote.id} />
            )}
        </>
    )
}

const mapStateToProps = (state) => {
    if(state.filterWord === null) return {anecdotes : state.anecdotes}
    return {anecdotes : state.anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(state.filterWord.toLowerCase()))}
}

const mapDispatchToProps = {
    likeAnecdote,
    createNotification
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)