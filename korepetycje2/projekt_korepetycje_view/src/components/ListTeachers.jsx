import { useState, useEffect } from "react";

export const ListTeachers=()=>{
    const [teachers,setTeachers]=useState([]);

    useEffect(()=>{
        fetch("http://localhost:8080/api/teachers")
        .then((response)=>{
            if(!response.ok){
                console.log("blad polaczenia wyswietlanie nauczycieli");
            }
            return response.json();
        })
        .then((data)=>{
            setTeachers(data);
        })
    },[]);

    return(
        <div>
            <h1>Lista nauczycieli</h1>
            <ul>
                {teachers.map((teacher)=>(
                    <li key={teacher.id}>{teacher.name} {teacher.surname} </li>
                ))}
            </ul>
        </div>
    )
}