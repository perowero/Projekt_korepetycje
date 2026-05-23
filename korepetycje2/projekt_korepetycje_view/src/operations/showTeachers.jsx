import { ListTeachers } from '../components/ListTeachers';
import {useState} from 'react';

export const ShowTeachers=()=>{
      const [showTeachers,setShowTeachers]=useState(false);
      return(
      <>
      <button onClick={()=>setShowTeachers(true)}> lista nauczycieli</button>
            {showTeachers&&<ListTeachers/>}
            {console.log(showTeachers)}
      </>
      )
}