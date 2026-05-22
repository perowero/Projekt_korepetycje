import {useState} from "react";

export const FormAddTeacher=({onRegisterTeacher})=>{
    const [name,setName]=useState("");
    const [surname,setSurname]=useState("");
    const [username,setUsername]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");

    return (
        <form
            onSubmit={(e)=>{
                e.preventDefault();
                onRegisterTeacher({name,surname,username,email,password});
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
    )
}