import { useState } from "react";
import { ChooseStudent } from "./ChooseStudent";
import { ChooseTeacher } from "./ChooseTeacher";

export const FormAddLesson=({onAddLesson})=>{
    const[data,setData]=useState("");
    const[prize,setPrize]=useState("");
    const[student,setStudent]=useState("");
    const[teacher,setTeacher]=useState("");
    const[showStudents,setShowStudents]=useState(false);
    const[showTeachers,setShowTeachers]=useState(false);

    return(
        <form onSubmit={(e)=>{
            e.preventDefault();
            onAddLesson({
                data: data ? `${data}T00:00:00` : null,
                prize: parseFloat(prize) || 0.0,       // Konwersja do double
                student: student ? { id: parseInt(student) } : null, 
                teacher: teacher ? { id: parseInt(teacher) } : null   
            });
        }}>
            <div>
                <input 
                    defaultValue={data}
                    onChange={(e)=>{
                        setData(e.target.value);
                    }}
                    type="date"
                    name="date"
                    placeholder="data"
                />
            </div>

            <div>
                <input
                    defaultValue={prize}
                    onChange={(e)=>{
                        setPrize(e.target.value);
                    }}
                    type="text"
                    name="prize"
                    placeholder="cena"
                />
            </div>

            <div>
                <button type="button" onClick={()=>setShowStudents(true)}>wybierz ucznia</button>
                <button type="button" onClick={()=>setShowTeachers(true)}>wybierz nauczyciela</button>
                {showStudents&&<ChooseStudent onSelectStudent={setStudent} selectedStudent={student}/>}
                {showTeachers&&<ChooseTeacher onSelectTeacher={setTeacher} selectedTeacher={teacher}/>}
            </div>

            <button>dodaj</button>

        </form>
    )
}