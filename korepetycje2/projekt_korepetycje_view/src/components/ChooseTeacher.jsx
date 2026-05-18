import {useState,useEffect} from 'react';

export const ChooseTeacher=({onSelectTeacher,selectedTeacher})=>{
    const [teachers,setTeachers]=useState([]);

     useEffect(()=>{
            fetch("http://localhost:8080/api/teachers")
            .then((response)=>{
                if(!response.ok){
                    console.log("blad polaczenia wyswietlanie studentow");
                }
                return response.json();
            })
            .then((data)=>{
                setTeachers(data);
            })
        },[]);

    const handleChange=(event)=>{
        onSelectTeacher(event.target.value);
    };

    return(
        <form>
            {teachers.map((teacher)=>(
                <div
                    key={teacher.id}>
                    <input
                        type="radio"
                        value={teacher.id}
                        onChange={handleChange}
                        checked={selectedTeacher===String(teacher.id)}
                        name="teacher"
                    />
                    <label>{teacher.name}{teacher.surname}</label>
                </div>
            ))};
        </form>
    )
}