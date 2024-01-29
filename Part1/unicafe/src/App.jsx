import { useState } from 'react'

const Button = ({handleClick, text}) => {
  return (
    <button onClick={handleClick}>{text}</button>
  )
}

const Statistics = ({goodValue, neutralValue, badValue}) => {
  const total = goodValue + neutralValue + badValue
  if (total == 0) return (
    <div>
      <p>No Feedback Given</p>
    </div>
  )
  else{
    const average = (goodValue - badValue) / total
    const positive = goodValue / total
    return (
      <div>
        <tr>
          <td width={100}>All</td> 
          <td>{total}</td>
        </tr>
        <tr>
          <td>Average</td> 
          <td>{average}</td>
        </tr>
        <tr>
          <td>Positive</td> 
          <td>{positive}%</td>
        </tr>
      </div>
    )
  }
}

const StatisticLine = ({text, value}) => {
  // if(value == 0) return (null)
  return (
    <div>
      <td width={100}>
        {text}
      </td>
      <td>
        {value}
      </td>
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleClickGood = () => setGood(good + 1)
  const handleClickNeutral = () => setNeutral(neutral + 1)
  const handleClickBad = () => setBad(bad + 1)
  var condition = new Boolean(true)
  let total = good + neutral + bad
  if(total == 0) condition = false
  return (
    <div>
      <h1>Give Feedback</h1>
      <Button handleClick={handleClickGood} text='Good'/>
      <Button handleClick={handleClickNeutral} text='Neutral'/>
      <Button handleClick={handleClickBad} text='Bad'/> <br />
      <h1>Statistics</h1>
      <table>
        {condition ? 
          <tr>
            <StatisticLine text="Good" value ={good} />
            <StatisticLine text="Neutral" value ={neutral} />
            <StatisticLine text="Bad" value ={bad} />
          </tr>
        : null
        }
        <tr>
          <Statistics goodValue={good} neutralValue={neutral} badValue={bad}/>
        </tr>
      </table>
    </div>
  )
}

export default App