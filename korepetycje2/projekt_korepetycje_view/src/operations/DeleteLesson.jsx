   export const deleteLesson=async (lesson_id)=>{
    const token=localStorage.getItem('token');
        try{
            const response=await fetch(`http://localhost:8080/api/lessons/${lesson_id}`,{
            method: 'DELETE',
            headers:{'Authorization':`Bearer ${token}`},
            });

            if(response.ok){
            alert("usunieto lekcje");
            }
            
        }catch(error){
            console.error('brak połączenia z javą',error);
        }
        }; 

