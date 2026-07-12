import {useState, useEffect} from "react";
export const ListIndividualUnpaid=({username})=>{
    const [paids,setPaids]=useState([]);
    const token = localStorage.getItem('token');

    useEffect(()=>{
            fetch(`http://localhost:8080/api/lessons/teacher-unpayments-student/${username}`, {
                headers:{
                    'Authorization': `Bearer ${token}`
                }
            })
            .then((response)=>{
                if(!response.ok){
                    console.error("Bład odpowiedzi wyświetlania płatności")
                }
                return response.json();
            })
            .then((data)=>{
                setPaids(data);
            })
            .catch(err=>console.error("Błąd wyświetlania płatności",err));
        },[token,username]);
    
        return(
            <div className="p-4 space-y-2">
          <h2 className="text-xl font-bold text-white mb-4">Historia Płatności</h2>
          
          {paids.length === 0 ? (
            <p className="text-slate-400 text-sm">Brak zarejestrowanych płatności.</p>
          ) : (
            paids.map((paid) => (
              <div 
                key={paid.id} 
                className="p-4 bg-slate-900 border border-slate-800 rounded-xl text-slate-300 text-sm"
              >
                <p>Płatność #{paid.id}</p>
                <p>Cena: <span className="text-emerald-400 font-semibold">{paid.prize} zł</span></p>
                <p>Data zajęć: {paid.data ? new Date(paid.data).toLocaleString() : "Brak daty"}</p>
              </div>
            ))
          )}
        </div>
        )
}