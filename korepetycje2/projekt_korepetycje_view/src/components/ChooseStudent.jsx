import {useState,useEffect} from 'react';

export const ChooseStudent=({onSelectStudent,selectedStudent})=>{
    const [students,setStudents]=useState([]);

     useEffect(()=>{
            fetch("http://localhost:8080/api/students")
            .then((response)=>{
                if(!response.ok){
                    console.log("blad polaczenia wyswietlanie studentow");
                }
                return response.json();
            })
            .then((data)=>{
                setStudents(data);
            })
        },[]);

    const handleChange=(event)=>{
        onSelectStudent(event.target.value);
    };

    return(
        <form>
            {students.map((student)=>(
                <div
                    key={student.id}>
                    <input
                        type="radio"
                        value={student.id}
                        onChange={handleChange}
                        checked={selectedStudent===String(student.id)}
                        name="student"
                    />
                    <label>{student.name} {student.surname}</label>
                </div>
            ))};
        </form>
    )
}