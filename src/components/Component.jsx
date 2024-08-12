import { useEffect, useState } from "react"


export default function Component(props) {
  const [course , setCourse] = useState({
    points : 0,
    name : '',
    grade : 0,
    weight : 0
  })  

  useEffect(() => {
    setCourse(props.course)
  } , [])

  const handleWeightChange = (e) => {
    setCourse({...course , weight : e.target.value})
  }
  const handleNameChange = (e) => {
    setCourse({...course , name : e.target.value})
  }
  const handleGradeChange = (e) => {
    setCourse({...course , grade : e.target.value})
  }
  const handlePointsChange = (e) => {
    setCourse({...course , points : e.target.value})
  }

  return (
    <div>
      <input type='number' value={course.points} onChange={handlePointsChange}/>
      <input type='number' value={course.weight} onChange={handleWeightChange}/>
      <input type='number' value={course.grade} min={0} max={100} onChange={handleGradeChange}/>
      <input type='text' value={course.name} onChange={handleNameChange} />
      <button onClick={() => props.deleteCourse(props.index)}>delete</button>
      <button onClick={() => props.updateCourse(props.index , course)}>Update</button>
    </div>
  )
}
