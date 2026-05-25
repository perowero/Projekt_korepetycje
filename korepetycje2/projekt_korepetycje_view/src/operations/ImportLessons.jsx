export const ImportLessons= async (dataStart,dataEnd)=>{
        const token=localStorage.getItem('token');
        const response=await fetch(`http://localhost:8080/api/lessons/calendar?dataStart=${dataStart}&dataEnd=${dataEnd}`,{
            method: 'GET',
            headers:{
                'Content-Type':'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        if(response.ok){
            const lesson=await response.json();
            return lesson;
        }
        return [];
    }
