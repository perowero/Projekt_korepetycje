import { useState, useEffect } from "react";

export const ListLessons=()=>{
    const [lessons,setLessons]=useState([]);

    useEffect(()=>{
        fetch("http://localhost:8080/api/lessons")
        .then((response)=>{
            if(!response.ok){
                console.log("blad polaczenia wyswietlanie lekcji");
            }
            return response.json();
        })
        .then((data)=>{
            setLessons(data);
        })
    },[]);

    return(
        <div>
            <h1>Lista uczniow</h1>
            <ul>
                {lessons.map((lesson)=>(
                    <li key={lesson.id}>{lesson.data} {lesson.student} {lesson.teacher} </li>
                ))}
            </ul>
        </div>
    )
}