import {useState} from 'react';
import { FormAddLesson } from '../components/FormAddLesson';

export const AddLesson=()=>{
  const [lessons,setLesson]=useState([]);
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

    return(
      <>
      <h1>dodaj lekcje</h1>
      <FormAddLesson onAddLesson={addLesson}/>
      </>
    )
}