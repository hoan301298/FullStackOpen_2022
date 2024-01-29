const Header = (props) => {
  return (
    <div>
      {props.course}
    </div>
  )
}

const Part = (props) => {
  return (
    <div>
      {props.p} {props.ex}
    </div>
  )
}

const Content = (props) => {
  return (
    <div>
      <Part p={props.parts[0].name} ex={props.parts[0].exercises}/>
      <Part p={props.parts[1].name} ex={props.parts[1].exercises}/>
      <Part p={props.parts[2].name} ex={props.parts[2].exercises}/>
    </div>
  )
}

const Total = (props) => {
  return(
    <div>
      Total: {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises} courses!
    </div>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }


  return (
    <div>
      <Header course={course.name}/>
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
    </div>
  )
}

export default App