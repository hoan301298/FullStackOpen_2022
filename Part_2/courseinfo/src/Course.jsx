const Total = ({ parts }) => {
    const total = parts.reduce((s, p) => s + p.exercises, 0)
    return (
        <div>
            <b>Total of {total} exercises</b>
        </div>
    )
}

const Content = ({ parts }) => {
    const part = parts.map(part => <p key={part.id}>{part.name} {part.exercises}</p>)
    return (
        <div>
            {part}
        </div>
    )
}

const Header = (props) => {
    const { name } = props
    return (
        <div>
            <h2>{name}</h2>
        </div>
    )
}

const Course = (props) => {
    const { course } = props
    return (
        <div>
            <Header name={course.name}/>
            <Content parts={course.parts}/>
            <Total parts={course.parts} />
        </div>
    )
}

export default Course;