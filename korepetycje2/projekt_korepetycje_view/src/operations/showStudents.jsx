import {useState} from 'react';
import {ListStudents} from '../components/ListStudents';

export const ShowStudents=()=>{
const [showStudents,setShowStudents]=useState(false);

return(
      <>
            <button onClick={()=>setShowStudents(true)}> lista studentow</button>
                  {showStudents&&<ListStudents/>}
                  {console.log(showStudents)}
      </>
)
}