import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { FormLogin } from '../components/FormLogin';
import { Logout } from '../components/Logout';

export const Login=()=>{
  const [isLogin,setIsLogin]=useState(false);
  const [role,setRole]=useState(null);
  const login=async (data)=>{
      try{
        const response=await fetch('http://localhost:8080/api/auth/login',{
          method: 'POST',
          headers:{
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });

        if(response.ok){
          setIsLogin(true);
          const resData = await response.json();
          console.log("Odpowiedź z Javy:", resData);
          localStorage.setItem('token', resData.token);
          localStorage.setItem('username', resData.username);
          localStorage.setItem('userRole', resData.role);
          setRole(resData.role);
          alert("zalogowano");
        }
      }catch(error){
        console.error('brak połączenia z javą',error);
      }
    };

    return(
      <>
      {console.log(role)}
      <FormLogin onLogin={login}/>
        {role === "teacher" && <Navigate to="/teacher/calendary" replace />}
        {role === "student" && <Navigate to="/student/paymentsStudent" replace />}
      </> 
    );
  };