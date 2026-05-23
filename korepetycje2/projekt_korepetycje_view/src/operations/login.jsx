import {useState} from 'react';
import { FormLogin } from '../components/FormLogin';
import { Logout } from '../components/Logout';

export const Login=()=>{
  const [isLogin,setIsLogin]=useState(false);
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
          localStorage.setItem('token', resData.token);
          localStorage.setItem('username', resData.username);
          localStorage.setItem('userRole', resData.role);
          alert("zalogowano");
        }
      }catch(error){
        console.error('brak połączenia z javą',error);
      }
    };

    return(
      <>
      <h1>zaloguj się</h1>
      <FormLogin onLogin={login}/>
        {isLogin&&<Logout setIsLogin={setIsLogin}/>}
      </>
    );
  };