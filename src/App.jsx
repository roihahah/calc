import { useEffect, useState } from 'react'
import './App.css'
import Component from './components/Component'
function App() {
  let grade = 0;
  const [course , setCourse] = useState({
    points : 0,
    name : '',
    grade : 0,
    weight : 0
  })
  const [courses , setCourses] = useState([])
  
  useEffect(() => {
    const storedCourses = JSON.parse(localStorage.getItem("Courses")) || [];
    setCourses(storedCourses);
    setCourse(prevCourse => ({...prevCourse , id : storedCourses.length}));
  }, []);
  

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


 
  const addCourse = () => {
    const updatedCourses = [...courses, course];
    localStorage.setItem("Courses", JSON.stringify(updatedCourses));
    setCourses(updatedCourses);
    
    setCourse({
      points : 0,
      name : '',
      grade: 0,
      weight : 0
    })
  }
  const deleteComponent = (key) => {
    const updatedCourses = courses.filter((_, index) => index !== key);
    console.log(updatedCourses)
    localStorage.setItem("Courses" , JSON.stringify(updatedCourses))
    setCourses(updatedCourses)
    return updatedCourses

  }
  const updateComponent = (index , _course) => {
    const updatedCourses1 =  deleteComponent(index)
    const updatedCourses2 = [...updatedCourses1, _course];
    localStorage.setItem("Courses", JSON.stringify(updatedCourses2));
    setCourses(updatedCourses2);
    window.location.reload();
    
    
  }
  const Stats = () => {
    let totalWeightPoints = 0
    let totaGradePoints = 0
    let totalPoints = 0
    

    for(let c of courses){
      totaGradePoints += parseInt(c.grade) * parseInt(c.weight)
      totalWeightPoints += parseInt(c.weight)
      totalPoints += parseInt(c.points)
    }
    
    return [String(parseFloat((totaGradePoints / totalWeightPoints).toFixed(2))) , totalPoints ]
  }
  
  const cs = courses.map((course , index) => (
    <Component   
    key={index}
    index={index}
    course={course}
    deleteCourse={deleteComponent}
    updateCourse = {updateComponent}
    />
  ))
     
  grade = Stats();
  
  
  return (
    <>
      <div>
        {cs}
      </div>
      <label htmlFor='points'>נקודות זכות</label>
      <input id='points' onChange={handlePointsChange} value={course.points} placeholder='נקודות זכות' type='number' step={1}/>
      <label htmlFor='weight'>משקל</label>
      <input id='weight' onChange={handleWeightChange} value={course.weight} placeholder='משקל' type='number' step={1}/>
      <label htmlFor='grade' >ציון</label>
      <input id='grade' onChange={handleGradeChange} value={course.grade} placeholder='ציון' type='number' step={1} min={0} max={100}/>
      <label htmlFor='name'> שם הקורס</label>
      <input id='name' onChange={handleNameChange} value={course.name} placeholder='שם הקורס' type='text'/>
      <button onClick={addCourse}>add course</button>

      <p>ציון ממוצע : {grade[0]} </p>
      <p>נקודות זכות: {grade[1]} </p>
      
    </>
  )
}

export default App
