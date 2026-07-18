import { useState, useEffect } from "react";

export const ListLessons = () => {
  const [lessons, setLessons] = useState([]);
  const token = localStorage.getItem('token'); 

  useEffect(() => {
    fetch("http://localhost:8080/api/lessons", {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then((response) => {
        if (!response.ok) {
          console.log("blad polaczenia wyswietlanie lekcji");
        }
        return response.json();
      })
      .then((data) => {
        setLessons(data);
      })
      .catch(err => console.error("Błąd sieci lekcji:", err));
  }, [token]);

  // Pomocnicza funkcja do wyciągania ładnej daty (DD.MM.RRRR) ze stringa z bazy
  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const datePart = dateString.split("T")[0]; // Odcina czas T00:00:00
    const [year, month, day] = datePart.split("-");
    return `${day}.${month}.${year}`;
  };

  return (
    <div className="min-h-[70vh] w-full flex flex-col items-center justify-start font-sans antialiased text-slate-200 p-4 pt-10">
      
      {/* Kontener tabeli */}
      <div className="bg-slate-900 shadow-2xl border border-slate-800 p-6 sm:p-8 w-full max-w-4xl rounded-2xl transition-all">
        
        <div className="flex items-center justify-between mb-2">
          <div>
            <h2 className="font-bold text-2xl text-white tracking-tight">
              HARMONOGRAM LEKCJI
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Przeglądaj zaplanowane zajęcia, przypisanych uczniów oraz stawki
            </p>
          </div>
          <span className="bg-slate-800 text-slate-300 text-xs font-semibold px-2.5 py-1 rounded-full border border-slate-700">
            Łącznie: {lessons.length}
          </span>
        </div>

        <div className="w-full bg-slate-850 my-5 h-[1px]"></div>

        {lessons.length === 0 ? (
          <div className="text-center py-10 text-sm text-slate-500 flex flex-col items-center gap-2">
            <span>📅</span>
            <span>Brak zaplanowanych lekcji w systemie.</span>
          </div>
        ) : (
          /* Kontener z overflow-x-auto chroni układ na telefonach komórkowych */
          <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950">
            <table className="w-full text-left border-collapse">
              
              {/* Nagłówki kolumn */}
              <thead>
                <tr className="border-b border-slate-800 text-xs font-semibold text-slate-400 uppercase tracking-wider bg-slate-900/50">
                  <th className="py-3.5 px-4">Data</th>
                  <th className="py-3.5 px-4">Uczeń</th>
                  <th className="py-3.5 px-4">Nauczyciel</th>
                  <th className="py-3.5 px-4 text-right">Cena</th>
                </tr>
              </thead>
              
              {/* Wiersze z danymi */}
              <tbody className="divide-y divide-slate-850 text-sm">
                {lessons.map((lesson) => (
                  <tr 
                    key={lesson.id} 
                    className="hover:bg-slate-900/40 transition-colors duration-150 group"
                  >
                    {/* Kolumna: Data */}
                    <td className="py-3.5 px-4 font-medium text-slate-300 group-hover:text-white transition-colors">
                      {formatDate(lesson.data)}
                    </td>
                    
                    {/* Kolumna: Uczeń */}
                    <td className="py-3.5 px-4 text-slate-300">
                      <span className="inline-flex items-center gap-1.5">
                        <span className="text-xs">👤</span>
                        {/* Bezpieczne sprawdzenie: czy student to obiekt z polem name/username, czy sam tekst */}
                        {lesson.student?.name || lesson.student?.username || lesson.student || "Brak danych"}
                      </span>
                    </td>
                    
                    {/* Kolumna: Nauczyciel */}
                    <td className="py-3.5 px-4 text-slate-300">
                      <span className="inline-flex items-center gap-1.5">
                        <span className="text-xs">👨‍🏫</span>
                        {lesson.teacher?.name || lesson.teacher?.username || lesson.teacher || "Brak danych"}
                      </span>
                    </td>
                    
                    {/* Kolumna: Cena */}
                    <td className="py-3.5 px-4 text-right font-semibold text-emerald-400 tracking-tight">
                      {lesson.prize ? `${lesson.prize.toFixed(2)} PLN` : "0.00 PLN"}
                    </td>
                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        )}
      </div>
    </div>
  );
};