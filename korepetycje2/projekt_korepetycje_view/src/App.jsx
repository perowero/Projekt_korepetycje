import { useState } from 'react'

import './App.css'
import { FormAddStudent } from './components/FormAddStudent.jsx';
import { FormAddTeacher } from './components/FormAddTeacher.jsx';
import {FormAddLesson} from './components/FormAddLesson.jsx';
import {ListStudents} from './components/ListStudents.jsx';
import {ListTeachers} from './components/ListTeachers.jsx'
import { FormLogin } from './components/FormLogin.jsx';
import { Logout } from './components/Logout.jsx';

function App() {
 
  const [lessons,setLesson]=useState([]);
  const [showStudents,setShowStudents]=useState(false);
  const [showTeachers,setShowTeachers]=useState(false);
  const [isLogin,setIsLogin]=useState(false);


const registerStudent=async (data)=>{
    try{
      const response=await fetch('http://localhost:8080/api/register/student',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if(response.ok){
      alert("zarejestrowano ucznia");
    }
  }catch (error){
    console.error("błąd połączenia z javą",error);
  }
};

  const registerTeacher=async (data)=>{
    try{
      const response=await fetch('http://localhost:8080/api/register/teacher',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if(response.ok){
      alert("zarejestrowano nauczyciela");
    }
  }catch (error){
    console.error("błąd połączenia z javą",error);
  }
};

  const addLesson=async (data)=>{
    try{
      const response=await fetch('http://localhost:8080/api/lessons',{
        method: 'POST',
        headers:{
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if(response.ok){
        const savedLesson=await response.json();
        setLesson([...lessons,savedLesson]);
        alert("zapisano lekcję");
      }
    }catch(error){
      console.error('brak połączenia z javą',error);
    }
  };

  const Login=async (data)=>{
    try{
      const response=await fetch('http://localhost:8080/api/auth/login',{
        method: 'POST',
        headers:{
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if(response.ok){
        setIsLogin(true);
        alert("zalogowano");
      }
    }catch(error){
      console.error('brak połączenia z javą',error);
    }
  };


  return (
    <>
      <h1>Dodaj ucznia</h1>
      <FormAddStudent  onRegisterStudent={registerStudent}/>
    
      <h1>dodaj nauczyciela</h1>
      <FormAddTeacher onRegisterTeacher={registerTeacher}/>

      <h1>dodaj lekcje</h1>
      <FormAddLesson onAddLesson={addLesson}/>

      <button onClick={()=>setShowStudents(true)}> lista studentow</button>
      {showStudents&&<ListStudents/>}
      {console.log(showStudents)}

      <button onClick={()=>setShowTeachers(true)}> lista nauczycieli</button>
      {showTeachers&&<ListTeachers/>}
      {console.log(showTeachers)}

      <h1>zaloguj się</h1>
      <FormLogin onLogin={Login}/>

      {isLogin&&<Logout setIsLogin={setIsLogin}/>}
    </>
  );
    
}

export default App
