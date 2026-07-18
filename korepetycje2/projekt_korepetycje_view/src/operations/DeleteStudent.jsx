   export const deleteStudent=async (student_id)=>{
    const token=localStorage.getItem('token');
        try{
            const response=await fetch(`http://localhost:8080/api/students/${student_id}`,{
            method: 'DELETE',
            headers:{'Authorization':`Bearer ${token}`},
            });

            if(response.ok){
            alert("usunieto ucznia");
            }
            
        }catch(error){
            console.error('brak połączenia z javą',error);
        }
        }; 

