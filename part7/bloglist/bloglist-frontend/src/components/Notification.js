import '../index.css'
import React from 'react'
import { useSelector } from 'react-redux'

export const SuscessMessage = () => {
  const suscessMessage = useSelector(state => state.suscessMess)
  if(suscessMessage === null) return null
  return (
    <div className="suscess">
      {suscessMessage}
    </div>
  )
}

export const ErrorMessage = () => {
  const errorMessage = useSelector(state => state.errorMess)
  if(errorMessage === null) return null
  return (
    <div className="error">
      {errorMessage}
    </div>
  )
}

const notification = { ErrorMessage, SuscessMessage }

export default notification