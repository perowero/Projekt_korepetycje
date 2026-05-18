import {useState} from "react";

export const FormAddTeacher=({onAddTeacher})=>{
    const [name,setName]=useState("");
    const [surname,setSurname]=useState("");

    return (
        <form
            onSubmit={(e)=>{
                e.preventDefault();
                onAddTeacher({name,surname});
            }}
        >

            <div>
                <input
                    defaultValue={name}
                    onChange={(e)=>{
                        setName(e.target.value);
                    }}
                    type="text"
                    name="name"
                    placeholder="imię"
                    >
                </input>
            </div>

            <div>
                <input
                    defaultValue={surname}
                    onChange={(e)=>{
                        setSurname(e.target.value)
                    }}
                    type="text"
                    name="surname"
                    placeholder="nazwisko"
                    >
                </input>
            </div>
            <button>dodaj</button>

        </form>
    )
}