import { useEffect, useState } from "react";
import { deleteLesson } from "../operations/DeleteLesson";
import { useNavigate, useParams } from "react-router-dom";

export const LessonInformation = () => {
  const [lesson, setLesson] = useState(null);
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('userRole');
  const navigate = useNavigate();
  const { id } = useParams();

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
          <span className="animate-spin"></span> Ładowanie szczegółów lekcji...
        </div>
      </div>
    );
  }

  console.log("lekcja ", lesson)

  return (
    <div className="min-h-[85vh] w-full flex flex-col items-center justify-start font-sans antialiased text-slate-200 p-4 pt-16">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800/80 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
        
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-sky-500"></div>

        {/* Nagłówek */}
        <div className="mb-6">
          <h2 className="font-bold text-xl text-white tracking-tight">
            SZCZEGÓŁY LEKCJI 
          </h2>
        </div>

        <div className="w-full bg-slate-800 h-[1px] mb-5"></div>

       
        <div className="space-y-4 text-sm">
          
          <div className="flex items-center justify-between p-3 bg-slate-950/40 border border-slate-850 rounded-xl">
            <span className="text-slate-400 flex items-center gap-2">Termin</span>
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

          <div className="flex items-center justify-between p-3 bg-slate-950/40 border border-slate-850 rounded-xl">
            <span className="text-slate-400 flex items-center gap-2">Koszt</span>
            <span className="font-bold text-sky-400 text-base">{lesson.prize} zł</span>
          </div>

          <div className="p-3 bg-slate-950/40 border border-slate-850 rounded-xl space-y-1">
            <span className="text-slate-400 text-xs block">Uczeń</span>
            <span className="font-medium text-slate-200 text-base block">
              {lesson.student?.name || lesson.student?.surname 
                ? `${lesson.student.name} ${lesson.student.surname}`
                : "Brak przypisanego ucznia"}
            </span>
          </div>

          <div className="p-3 bg-slate-950/40 border border-slate-850 rounded-xl space-y-1">
            <span className="text-slate-400 text-xs block">Nauczyciel</span>
            <span className="font-medium text-slate-200 text-base block">
              {lesson.teacher?.name || lesson.teacher?.surname 
                ? `${lesson.teacher.name} ${lesson.teacher.surname}`
                : "Brak przypisanego nauczyciela"}
            </span>
          </div>

        </div>

        <div className="w-full bg-slate-800 h-[1px] my-5"></div>

        <div className="flex gap-3">
          <button 
            onClick={() => navigate(`/${role}/calendary`)}
            className="flex-1 py-2.5 px-4 bg-slate-800 hover:bg-slate-750 text-slate-200 text-xs font-semibold rounded-xl transition-all border border-slate-700 cursor-pointer text-center"
          >
            Powrót do kalendarza
          </button>

          {role === 'teacher' && (
            <>
                <button 
                onClick={onDelete}
                className="flex-1 py-2.5 px-4 bg-red-950/40 hover:bg-red-900/40 border border-red-900/40 text-red-400 text-xs font-semibold rounded-xl transition-all cursor-pointer text-center"
                >
                Usuń lekcję
                </button>

                <button onClick={navigate("/teacher/formLessonSummary")}>dodaj podsumowanie lekcji</button>
                <button onClick={navigate("teacher/showLessonSummary")}>zobacz podsumowanie lekcji</button>
            </>
          )}

          {role==='student' &&(
            <>
                <button onClick={navigate("student/showLessonSummary")}>zobacz podsumowanie lekcji</button>
            </>
          )}
        </div>

      </div>
    </div>
  );
};