import React from 'react';
import {assertNever} from "assert-never";

interface header {
  courseName: string;
}

interface CoursePartBase {
  name: string;
  exerciseCount: number;
  type: string;
}

interface CourseNormalPart extends CoursePartBase {
  type: "normal";
  description: string;
}
interface CourseProjectPart extends CoursePartBase {
  type: "groupProject";
  groupProjectCount: number;
}

interface CourseSubmissionPart extends CoursePartBase {
  type: "submission";
  description: string;
  exerciseSubmissionLink: string;
}

interface CourseSpecialPart extends CoursePartBase {
  type: "special";
  requirements: string[];
  description: string;
}

type CoursePart = CourseNormalPart | CourseProjectPart | CourseSubmissionPart | CourseSpecialPart;

const Header = ({courseName}: header) => {
    return (
      <h1>{courseName}</h1>
    )
}

const Courses = ({courseParts} : {courseParts: Array<CoursePart>}) => {
  return (
    <>
    {courseParts.map(part => {
      switch(part.type) {
        case "normal" :
          return (
            <>
            <p><b>{part.name} {part.exerciseCount}</b><br />
            <em>{part.description}</em></p>
            </>
          )
        case "groupProject": 
          return (
            <>
            <p><b>{part.name} {part.exerciseCount}</b><br />
            project exercises {part.groupProjectCount}</p>
            </>
          )
        case "submission":
          return (
            <>
            <p><b>{part.name} {part.exerciseCount}</b><br />
            <em>{part.description}</em><br />
            submit to {part.exerciseSubmissionLink}</p>
            </>
          )
        case "special":
          return (
            <p><b>{part.name} {part.exerciseCount}</b><br />
            <em>{part.description}</em><br />
            required skills: {part.requirements.join(',')}</p>
          )
        default:
          return assertNever(part);
      }
    })}
    </>
  )
}

const Total = ({courseParts} : {courseParts: Array<CoursePart>}) => {
  return (
    <p>
        Number of exercises{" "}
        {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
    </p>
  )
}

const App = () => {
  const courseName = 'Half Stack application development';
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is the leisured course part",
      type: "normal"
    },
    {
      name: "Advanced",
      exerciseCount: 7,
      description: "This is the harded course part",
      type: "normal"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      type: "groupProject"
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev",
      type: "submission"
    },
    {
      name: "Backend development",
      exerciseCount: 21,
      description: "Typing the backend",
      requirements: ["nodejs", "jest"],
      type: "special"
    }
  ]

  return (
    <div>
      <Header courseName={courseName} />
      <Courses courseParts={courseParts} />
      <Total courseParts={courseParts} />
    </div>
  );
};

export default App;