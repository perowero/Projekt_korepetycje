import { useEffect, useState } from "react";
import { deleteLesson } from "../operations/DeleteLesson";
import { useNavigate, useParams } from "react-router-dom";

export const LessonInformation = () => {
  const [lesson, setLesson] = useState(null);
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('userRole');
  const navigate = useNavigate();
  const { id } = useParams();
  const [issummary, setIssummary]= useState(false);

  useEffect(() => {
    fetch(`http://localhost:8080/api/lessons/${id}`, {
      method: 'GET',      
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then((response) => response.ok ? response.json() : null)
      .then((data) => {
        if (data) setLesson(data);
      })
      .catch(err => console.error("Błąd sieci lekcji:", err));
  }, [token, id]);

  useEffect(() => {
    fetch(`http://localhost:8080/api/lessons/checkSummary/${id}`, {
      method: 'GET',      
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then((response) => response.ok ? response.json() : null)
      .then((data) => {
        if (data) setIssummary(data);
      })
      .catch(err => console.error("Błąd sieci lekcji:", err));
  }, [token, id]);

  const onDelete = () => {
    if (window.confirm("Czy na pewno chcesz usunąć tę lekcję?")) {
      deleteLesson(id);
      navigate(`/${role}/calendary`);
    }
  };

  if (!lesson) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center text-slate-400 font-sans">
        <div className="flex items-center gap-2">
          <span className="animate-spin">🌀</span> Ładowanie szczegółów lekcji...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[85vh] w-full flex flex-col items-center justify-start font-sans antialiased text-slate-200 p-4 pt-20">
      
      <div className="w-full max-w-lg bg-slate-900 border border-slate-800/80 rounded-2xl p-6 sm:p-7 shadow-2xl relative overflow-hidden">
        
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-sky-500"></div>

        <div className="mb-6">
          <h2 className="font-bold text-xl text-white tracking-tight uppercase">
            SZCZEGÓŁY LEKCJI 
          </h2>
        </div>

        <div className="w-full bg-slate-800 h-[1px] mb-5"></div>

        <div className="space-y-3.5 text-sm">
          
          <div className="flex items-center justify-between p-3.5 bg-slate-950/40 border border-slate-800 rounded-xl">
            <span className="text-slate-400 font-medium">Termin</span>
            <span className="font-semibold text-slate-200">
              {lesson.data 
                ? new Date(lesson.data).toLocaleString('pl-PL', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit'
                  })
                : "Nie ustawiono"}
            </span>
          </div>

          <div className="flex items-center justify-between p-3.5 bg-slate-950/40 border border-slate-800 rounded-xl">
            <span className="text-slate-400 font-medium">Koszt</span>
            <span className="font-bold text-sky-400 text-base">{lesson.prize} zł</span>
          </div>

          <div className="p-3.5 bg-slate-950/40 border border-slate-800 rounded-xl space-y-1 text-left">
            <span className="text-slate-400 text-xs block font-medium uppercase tracking-wider">Uczeń</span>
            <span className="font-medium text-slate-200 text-base block">
              {lesson.student?.name || lesson.student?.surname 
                ? `${lesson.student.name} ${lesson.student.surname}`
                : "Brak przypisanego ucznia"}
            </span>
          </div>

          <div className="p-3.5 bg-slate-950/40 border border-slate-800 rounded-xl space-y-1 text-left">
            <span className="text-slate-400 text-xs block font-medium uppercase tracking-wider">Nauczyciel</span>
            <span className="font-medium text-slate-200 text-base block">
              {lesson.teacher?.name || lesson.teacher?.surname 
                ? `${lesson.teacher.name} ${lesson.teacher.surname}`
                : "Brak przypisanego nauczyciela"}
            </span>
          </div>

        </div>

        <div className="w-full bg-slate-800 h-[1px] my-6"></div>

        <div className="flex flex-col gap-3">

          {role === 'teacher' && (
            <div className="grid grid-cols-2 gap-2.5">
              <button 
                onClick={() => navigate(`/teacher/formLessonSummary/${id}/${issummary}`)}
                className="py-2.5 px-3 bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold rounded-xl transition-all shadow-md shadow-sky-600/20 cursor-pointer text-center flex items-center justify-center gap-1.5"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                {issummary ? <span>edytuj podsumowanie</span> : <span>dodaj podsumowanie</span>}
              </button>

              <button 
                onClick={() => navigate(`/teacher/showLessonSummary/${id}`)}
                className="py-2.5 px-3 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl transition-all border border-slate-700 cursor-pointer text-center flex items-center justify-center gap-1.5"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-sky-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                <span>Zobacz podsumowanie</span>
              </button>
            </div>
          )}

          {role === 'student' && (
            <button 
              onClick={() => navigate(`/student/showLessonSummary/${id}`)}
              className="w-full py-2.5 px-4 bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold rounded-xl transition-all shadow-md shadow-sky-600/20 cursor-pointer text-center flex items-center justify-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              <span>Zobacz podsumowanie lekcji</span>
            </button>
          )}

          <div className="flex gap-2.5 w-full">
            <button 
              onClick={() => navigate(`/${role}/calendary`)}
              className="flex-1 py-2.5 px-4 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-xl transition-all border border-slate-700 cursor-pointer text-center flex items-center justify-center gap-1.5"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Powrót do kalendarza
            </button>

            {role === 'teacher' && (
              <button 
                onClick={onDelete}
                className="py-2.5 px-4 bg-red-950/40 hover:bg-red-900/50 border border-red-900/40 text-red-400 text-xs font-semibold rounded-xl transition-all cursor-pointer text-center shrink-0 flex items-center justify-center gap-1.5"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Usuń
              </button>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};