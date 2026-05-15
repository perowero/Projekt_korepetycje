import {useState} from "react"

export const FormAddStudent=({onAddStudent}) => {
    const[name, setName]= useState("");
    const[surname, setSurname]= useState("");
    const[address, setAddress]=useState("");
    const[schoolclass, setSchoolclass]=useState("");

    return(
        <form
            onSubmit={(e) =>{
                e.preventDefault();
                onAddStudent({name,surname,address,schoolclass})
            }

            }
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
                        setSurname(e.target.value);
                    }}
                    type="text"
                    name="surname"
                    placeholder="nazwisko"
                >
                </input>
            </div>

            <div>
                <input
                    defaultValue={address}
                    onChange={(e)=>{
                        setAddress(e.target.value);
                    }}
                    type="text"
                    name="address"
                    placeholder="adres"
                >
                </input>
            </div>

            <div>
                <input
                    defaultValue={schoolclass}
                    onChange={(e)=>{
                        setSchoolclass(e.target.value);
                    }}
                    type="text"
                    name="schoolclass"
                    placeholder="klasa"
                >
                </input>
            </div>
            <button>dodaj</button>
        </form>

    );
};