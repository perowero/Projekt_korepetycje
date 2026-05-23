import {useState} from "react";

export const FormLogin=({onLogin})=>{
    const [username,setUsername]=useState("");
    const [password,setPassword]=useState("");
    const [role,setRole]=useState("");
    

    return (
        <form
            onSubmit={(e)=>{
                e.preventDefault();
                onLogin({username,role,password});
            }}
        >

            <div>
                <input
                    defaultValue={username}
                    onChange={(e)=>{
                        setUsername(e.target.value);
                    }}
                    type="text"
                    name="login"
                    placeholder="login"
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

            <div>
                <input 
                    type="radio" 
                    defaultValue={role}
                    onChange={(e)=>{setRole(e.target.value);}}
                    name="role"
                    value="student"
                    checked={role==="student"}
                    />Uczeń
            </div>
             <div>
                <input 
                    type="radio" 
                    onChange={(e)=>{setRole(e.target.value);}}
                    name="role"
                    value="teacher"
                    checked={role==="teacher"}
                    />Nauczyciel
            </div>
            <button>zaloguj się</button>

        </form>
    )
}