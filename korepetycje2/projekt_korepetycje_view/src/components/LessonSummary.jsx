import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const LessonSummary = () => {
  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('userRole');

  const { id } = useParams();

  const navigate= useNavigate()

  useEffect(() => {
    if (!id) return;
    
    fetch(`http://localhost:8080/api/lessons/showLessonSummary/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Błąd połączenia lub brak podsumowania");
        }
        return response.json();
      })
      .then((data) => {
        setLesson(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Błąd sieci:", err);
        setLesson(null);
        setLoading(false);
      });
  }, [token, id]);

  if (loading) {
    return (
      <div className="w-full flex justify-center items-center pt-24 text-slate-400 font-sans text-sm">
        <span className="animate-spin mr-2">🌀</span> Ładowanie podsumowania...
      </div>
    );
  }

  if (!lesson) {
    return (
      <div className="min-h-[60vh] w-full flex flex-col items-center justify-start font-sans antialiased text-slate-200 p-4 pt-24">
        <div className="bg-slate-900 shadow-2xl border border-slate-800 p-6 sm:p-8 w-full max-w-xl rounded-2xl text-center">
          <p className="text-slate-400 text-sm italic">Brak podsumowania dla tej lekcji.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[60vh] w-full flex flex-col items-center justify-start font-sans antialiased text-slate-200 p-4 pt-24">
      
      <div className="bg-slate-900 shadow-2xl border border-slate-800 p-6 sm:p-8 w-full max-w-xl rounded-2xl transition-all relative overflow-hidden">
        
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-sky-500"></div>

        <div className="mb-4">
          <h2 className="font-bold text-2xl text-white tracking-tight uppercase">
            PODSUMOWANIE LEKCJI
          </h2>
        </div>

        <div className="w-full bg-slate-800 h-[1px] my-5"></div>

        <div className="space-y-4 text-sm text-left">
          
          <div className="p-3.5 bg-slate-950/60 border border-slate-800 rounded-xl space-y-1">
            <span className="text-slate-400 text-xs font-medium uppercase tracking-wider block">
              Temat lekcji
            </span>
            <span className="font-semibold text-white text-base block">
              {lesson.topic || "Brak tematu"}
            </span>
          </div>

          <div className="p-3.5 bg-slate-950/60 border border-slate-800 rounded-xl space-y-1">
            <span className="text-slate-400 text-xs font-medium uppercase tracking-wider block">
              Opis zajęć
            </span>
            <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-line">
              {lesson.description || "Brak opisu zajęć."}
            </p>
          </div>

          {lesson.ishomework && (
            <div className="p-4 bg-sky-950/30 border border-sky-800/50 rounded-xl space-y-1.5">
              <span className="text-sky-400 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                 Praca domowa
              </span>
              <p className="text-slate-200 text-sm font-medium">
                {lesson.homework || "Brak treści zadania domowego."}
              </p>
            </div>
          )}

        </div>
      </div>

      <button 
            onClick={() => navigate(`/${role}/calendary`)}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold rounded-xl border border-slate-700 active:scale-[0.97] transition-all duration-150 cursor-pointer flex items-center gap-2 shadow-sm"
            >
            <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-4 w-4" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
            >
                <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M10 19l-7-7m0 0l7-7m-7 7h18" 
                />
            </svg>
            Powrót do kalendarza
        </button>
    </div>
  );
};