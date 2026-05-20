import {useState} from "react"

export const FormAddStudent=({onAddStudent,onRegisterStudent}) => {
    const[name, setName]= useState("");
    const[surname, setSurname]= useState("");
    const[address, setAddress]=useState("");
    const[schoolclass, setSchoolclass]=useState("");
    const[username, setUsername]=useState("");
    const[email,setEmail]=useState("");
    const[password,setPassword]=useState("");

    return(
        <form
            onSubmit={(e) =>{
                e.preventDefault();
                onAddStudent({name,surname,address,schoolclass});
                onRegisterStudent({username,email,password});
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

             <div>
                <input
                    defaultValue={username}
                    onChange={(e)=>{
                        setUsername(e.target.value);
                    }}
                    type="text"
                    name="username"
                    placeholder="nazwa użytkownika"
                >
                </input>
            </div>

             <div>
                <input
                    defaultValue={email}
                    onChange={(e)=>{
                        setEmail(e.target.value);
                    }}
                    type="text"
                    name="email"
                    placeholder="email"
                >
                </input>
            </div>

             <div>
                <input
                    defaultValue={password}
                    onChange={(e)=>{
                        setPassword(e.target.value);
                    }}
                    type="text"
                    name="password"
                    placeholder="hasło"
                >
                </input>
            </div>
            <button>dodaj</button>
        </form>

    );
};