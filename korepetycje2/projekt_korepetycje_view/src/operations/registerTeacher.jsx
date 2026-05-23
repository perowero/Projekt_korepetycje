import { FormAddTeacher } from "../components/FormAddTeacher";

export const RegisterTeacher=()=>{
  const registerTeacher=async (data)=>{
      try{
        const response=await fetch('http://localhost:8080/api/register/teacher',{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
      });

      if(response.ok){
        alert("zarejestrowano nauczyciela");
      }
    }catch (error){
      console.error("błąd połączenia z javą",error);
    }
  };

  return(
    <>
    <h1>dodaj nauczyciela</h1>
    <FormAddTeacher onRegisterTeacher={registerTeacher}/>
    </>
  )
}