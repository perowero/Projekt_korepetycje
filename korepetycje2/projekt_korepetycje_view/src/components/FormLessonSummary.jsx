import { useState} from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";


export const FormLessonSummary=()=>{
    const {issummary}=useParams();
    const {id}=useParams();
    const [topic, setTopic]=useState("");
    const [description, setDescription]=useState("");
    const [ishomework, setIshomework]=useState(false);
    const [homework, setHomework]=useState("");
    const token = localStorage.getItem('token');
    const navigate=useNavigate();

    const addLessonSummary=async (data)=>{
      try{
        const response=await fetch(`http://localhost:8080/api/lessons/addLessonSummary/${id}`,{
          method: 'POST',
          headers:{
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(data),
        });

        if(response.ok){
          alert("dodano podsumowanie");
          navigate("/teacher/calendary")
        }
      }catch(error){
        console.error('brak połączenia z javą',error);
      }
    };

    useEffect(() => {
        if (!issummary) return
        fetch(`http://localhost:8080/api/lessons/showLessonSummary/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
          .then((response) => {
            if (!response.ok) {
              console.log("bledna odpowiedz przy wysylaniu listy podsumowan");
            }
            return response.json();
          })
          .then((data) => {
            setTopic(data.topic);
            setDescription(data.description);
            setIshomework(data.ishomework);
            setHomework(data.homework);
          })
          .catch(err => console.error("Błąd sieci uczniów:", err));
      }, [token,issummary,id]);

    return(
        <div className="min-h-[85vh] w-full flex flex-col justify-center items-center font-sans antialiased text-slate-200 p-4">
      
      <div className="bg-slate-900 shadow-2xl border border-slate-800 px-6 sm:px-10 py-8 w-full max-w-xl rounded-2xl transition-all">
        
        <div className="text-center w-full mb-2">
          <h2 className="font-bold text-2xl text-white tracking-tight">
            Opis lekcji
          </h2>
        </div>
        
        <div className="w-full bg-slate-850 my-5 h-[1px]"></div>
        
          <form

            onSubmit={(e)=>{

                e.preventDefault();

                addLessonSummary({topic,description,ishomework,homework,id})

            }}

        >
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-slate-400 uppercase tracking-wider">Temat</label>
              <input
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                type="text"
                name="topic"
                placeholder="topic"
                className="py-2.5 px-4 bg-slate-950 border border-slate-800 rounded-xl w-full text-white placeholder-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all"
                required
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-slate-400 uppercase tracking-wider">Opis</label>
              <input
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                type="text"
                name="description"
                placeholder="description"
                className="py-2.5 px-4 bg-slate-950 border border-slate-800 rounded-xl w-full text-white placeholder-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all"
                required
              />
            </div>
          </div>

          <div className="flex items-center gap-3 py-2">
            <input 
              type="checkbox" 
              id="homeworkCheck"
              checked={ishomework}
              onChange={(e) => setIshomework(e.target.checked)}
              className="w-4 h-4 accent-sky-500 rounded cursor-pointer"
            />
            <label htmlFor="homeworkCheck" className="text-sm font-medium text-slate-300 cursor-pointer">
              Zadano pracę domową
            </label>
          </div>

          {ishomework&&
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-slate-400 uppercase tracking-wider">Praca domowa</label>
            <input
              value={homework}
              onChange={(e) => setHomework(e.target.value)}
              type="text" 
              name="homework"
              placeholder="homework"
              className="py-2.5 px-4 bg-slate-950 border border-slate-800 rounded-xl w-full text-white placeholder-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all"
            />
          </div>
        }

        <button  className="w-full bg-sky-600 hover:bg-sky-500 text-white font-semibold py-3 mt-4 rounded-xl shadow-lg transition-all">
            Zapisz podsumowanie
          </button>

        </form>
      </div>
    </div>

    )}
