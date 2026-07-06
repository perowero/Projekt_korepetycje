import { FormAddFile } from "../components/FormAddFile";
import { useNavigate } from "react-router-dom";

export const AddFile=()=>{
  const navigate = useNavigate();
  const addFile=async ({filename,file})=>{
    const formData = new FormData();
    formData.append("file", file);
    const token = localStorage.getItem('token');
    try{
        const response=await fetch('http://localhost:8080/api/files/upload',{
          method: 'POST',
          headers:{'Authorization':`Bearer ${token}`},
          body:formData
        });

        if(response.ok){
          alert("zapisano plik");
        }
        navigate("/downloadFile")
      }catch(error){
        console.error('brak połączenia z javą',error);
      }
    };

    return(
      <>
      <h1>dodaj plik</h1>
      <FormAddFile onAddFile={addFile}/>
      </>
    )
}