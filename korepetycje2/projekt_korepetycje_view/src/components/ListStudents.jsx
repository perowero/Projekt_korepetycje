import { useState, useEffect } from "react";

export const ListStudents = () => {
  const [students, setStudents] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetch("http://localhost:8080/api/students", {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then((response) => {
        if (!response.ok) {
          console.log("blad polaczenia wyswietlanie studentow");
        }
        return response.json();
      })
      .then((data) => {
        setStudents(data);
      })
      .catch(err => console.error("Błąd sieci uczniów:", err));
  }, [token]);

  return (
    <div className="min-h-[75vh] w-full flex flex-col items-center justify-start font-sans antialiased text-slate-200 p-4 pt-10">
      
      {/* Główny kontener sekcji */}
      <div className="w-full max-w-5xl">
        
        {/* Nagłówek panelu */}
        <div className="flex items-center justify-between mb-2 px-2">
          <div>
            <h2 className="font-bold text-2xl text-white tracking-tight">
              LISTA UCZNIÓW
            </h2>
          </div>
          <span className="bg-slate-900 text-slate-300 text-xs font-semibold px-3 py-1 rounded-full border border-slate-800">
            Aktywni: {students.length}
          </span>
        </div>

        <div className="w-full bg-slate-850 my-6 h-[1px]"></div>

        {/* Dynamiczne renderowanie siatki kart */}
        {students.length === 0 ? (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-10 text-center text-sm text-slate-500 flex flex-col items-center gap-2">
            <span>👥</span>
            <span>Brak zarejestrowanych uczniów w bazie danych.</span>
          </div>
        ) : (
          /* Responsywny Grid: 1 kolumna na telefonach, 2 na tabletach, 3 na komputerach */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {students.map((student) => (
              <div 
                key={student.id}
                className="bg-slate-900 border border-slate-800/80 hover:border-slate-700 p-5 rounded-2xl shadow-xl hover:shadow-2xl flex flex-col justify-between transition-all duration-200 group relative overflow-hidden"
              >
                {/* Górna część karty: Awatar + Główne Dane */}
                <div>
                  <div className="flex items-center gap-3.5 mb-4">
                    {/* Okrągły inicjał/awatar z efektem hover */}
                    <div className="h-11 w-11 bg-slate-950 border border-slate-800 text-sky-400 group-hover:bg-sky-600 group-hover:text-white font-bold rounded-xl flex items-center justify-center transition-all duration-300 text-base shrink-0">
                      {student.name ? student.name.charAt(0).toUpperCase() : "U"}
                    </div>
                    
                    <div className="min-w-0">
                      <h3 className="font-semibold text-base text-slate-200 group-hover:text-white transition-colors truncate">
                        {student.name} {student.surname}
                      </h3>
                      {/* Badge informujący o klasie/grupie */}
                      <span className="inline-block bg-slate-950 text-slate-400 text-[10px] font-medium px-2 py-0.5 rounded-md border border-slate-850 mt-0.5">
                        🏫 {student.schoolclass || "Brak klasy"}
                      </span>
                    </div>
                  </div>

                  <div className="w-full bg-slate-850/50 h-[1px] mb-4"></div>

                  {/* Szczegóły (E-mail i Adres) */}
                  <div className="space-y-2 text-xs text-slate-400">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="text-slate-500">📧</span>
                      <span className="truncate hover:text-slate-300 transition-colors">
                        {student.email || "brak adresu e-mail"}
                      </span>
                    </div>
                    
                    <div className="flex items-start gap-2 min-w-0">
                      <span className="text-slate-500 mt-0.5">📍</span>
                      <span className="line-clamp-2 hover:text-slate-300 transition-colors">
                        {student.address || "brak zapisanego adresu"}
                      </span>
                    </div>
                  </div>
                </div>
                

              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};