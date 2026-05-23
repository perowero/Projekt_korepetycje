import { FormAddStudent } from "../components/FormAddStudent";

export const RegisterStudent=()=>{
  const registerStudent=async (data)=>{
      try{
        const response=await fetch('http://localhost:8080/api/register/student',{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
      });

      if(response.ok){
        alert("zarejestrowano ucznia");
      }
    }catch (error){
      console.error("błąd połączenia z javą",error);
    }
  };

  return(
    <>
      <h1>Dodaj ucznia</h1>
      <FormAddStudent  onRegisterStudent={registerStudent}/>
    </>
  )
}
