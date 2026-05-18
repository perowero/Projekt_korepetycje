import { useState, useEffect } from "react";

export const ListStudents=()=>{
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

    return(
        <div>
            <h1>Lista uczniow</h1>
            <ul>
                {students.map((student)=>(
                    <li key={student.id}>{student.name} {student.surname} </li>
                ))}
            </ul>
        </div>
    )
}