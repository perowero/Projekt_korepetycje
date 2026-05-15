import { useState } from 'react'

import './App.css'
import { FormAddStudent } from './components/FormAddStudent.jsx';

function App() {
  const [students,setStudent]=useState([]);

  const addStudent=(data)=>{
    const newStudent=[...students,data];
    setStudent(newStudent);
  }


  return (
    <>
      <h1>Dodaj ucznia</h1>
      <FormAddStudent onAddStudent={addStudent}/>
    </>
  );
    
}

export default App
