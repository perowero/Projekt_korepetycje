import { useState } from "react";
import { ChooseStudent } from "./ChooseStudent";
import { ChooseTeacher } from "./ChooseTeacher";

export const FormAddLesson = ({ onAddLesson }) => {
  const [data, setData] = useState("");
  const [prize, setPrize] = useState("");
  const [student, setStudent] = useState("");
  const [teacher, setTeacher] = useState("");
  const [showStudents, setShowStudents] = useState(false);
  const [showTeachers, setShowTeachers] = useState(false);

  return (
    <div className="min-h-[80vh] w-full flex flex-col justify-center items-center font-sans antialiased text-slate-200 p-4">
      
      {/* Karta formularza logiki dodawania lekcji */}
      <div className="bg-slate-900 shadow-2xl border border-slate-800 px-6 sm:px-10 py-8 w-full max-w-md rounded-2xl transition-all">
        
        <div className="text-center w-full mb-2">
          <h2 className="font-bold text-2xl text-white tracking-tight">
            NOWA LEKCJA
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Zaplanuj termin oraz stawkę za najbliższe zajęcia
          </p>
        </div>
        
        <div className="w-full bg-slate-850 my-5 h-[1px]"></div>
        
        <form 
          onSubmit={(e) => {
            e.preventDefault();
            console.log("Mój stan student:", student);
            console.log("Mój stan teacher:", teacher);
            onAddLesson({
              data: data ? `${data}T00:00:00` : null,
              prize: parseFloat(prize) || 0.0,      
              studentId: student?.id || student, // Obsługa ID niezależnie od tego czy stan to obiekt czy czyste ID
              teacherId: teacher?.id || teacher 
            });
          }}
          className="flex flex-col gap-5"
        >
          {/* Pole: Data zajęć */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-slate-400 uppercase tracking-wider">
              Data lekcji
            </label>
            <input 
              value={data}
              onChange={(e) => setData(e.target.value)}
              type="date"
              name="date"
              className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all"
              required
            />
          </div>

          {/* Pole: Cena / Stawka */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-slate-400 uppercase tracking-wider">
              Cena za lekcję (PLN)
            </label>
            <input
              value={prize}
              onChange={(e) => setPrize(e.target.value)}
              type="text"
              name="prize"
              placeholder="np. 90.00"
              className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all"
              required
            />
          </div>

          {/* Sekcja: Wybór uczestników zajęć */}
          <div className="flex flex-col gap-3 pt-2">
            <label className="text-xs font-medium text-slate-400 uppercase tracking-wider">
              Uczestnicy zajęć
            </label>
            <div className="grid grid-cols-2 gap-4">
              
              <button 
                type="button" 
                onClick={() => setShowStudents(true)}
                className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all cursor-pointer gap-1 ${
                  student 
                    ? "bg-sky-600/10 border-sky-500 text-sky-400 font-medium" 
                    : "bg-slate-950 border-slate-850 text-slate-400 hover:bg-slate-850"
                }`}
              >
                <span className="text-lg">👤</span>
                <span className="text-xs truncate max-w-full px-1">
                  {student ? (student.name || "Uczeń wybrany") : "Wybierz ucznia"}
                </span>
              </button>
              
              <button 
                type="button" 
                onClick={() => setShowTeachers(true)}
                className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all cursor-pointer gap-1 ${
                  teacher 
                    ? "bg-sky-600/10 border-sky-500 text-sky-400 font-medium" 
                    : "bg-slate-950 border-slate-850 text-slate-400 hover:bg-slate-850"
                }`}
              >
                <span className="text-lg">👨‍🏫</span>
                <span className="text-xs truncate max-w-full px-1">
                  {teacher ? (teacher.name || "Nauczyciel wybrany") : "Wybierz trenera"}
                </span>
              </button>

            </div>

            {/* Warunkowe wyświetlanie komponentów wyboru (modal/lista) */}
            {showStudents && (
              <div className="mt-2 p-3 bg-slate-950 border border-slate-850 rounded-xl">
                <ChooseStudent onSelectStudent={(s) => { setStudent(s); setShowStudents(false); }} selectedStudent={student}/>
              </div>
            )}
            {showTeachers && (
              <div className="mt-2 p-3 bg-slate-950 border border-slate-850 rounded-xl">
                <ChooseTeacher onSelectTeacher={(t) => { setTeacher(t); setShowTeachers(false); }} selectedTeacher={teacher}/>
              </div>
            )}
          </div>

          {/* Przycisk Główny */}
          <div className="w-full pt-3">
            <button className="w-full bg-sky-600 hover:bg-sky-500 active:scale-[0.99] text-white font-semibold py-3 px-4 rounded-xl shadow-lg shadow-sky-600/20 transition-all duration-150 cursor-pointer flex flex-row justify-center items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
              </svg>
              Dodaj lekcję
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};