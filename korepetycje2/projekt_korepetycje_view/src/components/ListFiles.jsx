import { useState, useEffect } from "react";
import  downloadFile  from "../operations/DownloadFile.js";

export const ListFiles=()=>{
    const [files,setFiles]=useState([]);
    const token=localStorage.getItem('token');

    useEffect(()=>{
        fetch("http://localhost:8080/api/files", {
            headers: {
            'Authorization': `Bearer ${token}`
        }
        })
        .then((response)=>{
            if(!response.ok){
                console.log("blad polaczenia wyswietlanie plików");
            }
            return response.json();
        })
        .then((data)=>{
            setFiles(data);
        })
    },[token]);

    return(
        <div>
            <h1>Lista plików</h1>
            <ul>
                {files.map((file)=>(
                    <li key={file.filename}>
                        <button onClick={()=>downloadFile({id:file.id, filename: file.filename})}>pobierz</button>
                    </li>
                ))}
            </ul>
        </div>
    )
}