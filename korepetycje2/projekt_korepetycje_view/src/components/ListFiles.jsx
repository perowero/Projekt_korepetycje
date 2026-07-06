import { useState, useEffect } from "react";
import downloadFile from "../operations/DownloadFile.js";
import { AddFile } from "../operations/AddFile.jsx";
import { useNavigate } from "react-router-dom";

export const ListFiles = () => {
  const [files, setFiles] = useState([]);
  const token = localStorage.getItem('token');

  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8080/api/files", {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then((response) => {
        if (!response.ok) {
          console.log("blad polaczenia wyswietlanie plików");
        }
        return response.json();
      })
      .then((data) => {
        setFiles(data);
      })
      .catch(err => console.error("Błąd sieci:", err));
  }, [token]);

  return (
    <div className="min-h-[60vh] w-full flex flex-col items-center justify-start font-sans antialiased text-slate-200 p-4 pt-10">
      
      {/* Kontener listy plików */}
      <div className="bg-slate-900 shadow-2xl border border-slate-800 p-6 sm:p-8 w-full max-w-2xl rounded-2xl transition-all">
        
        <div className="flex items-center justify-between mb-2">
          <div>
            <h2 className="font-bold text-2xl text-white tracking-tight">
              LISTA PLIKÓW
            </h2>
            <button 
                onClick={() => navigate("/addFile")} 
                className="text-xs bg-sky-600 hover:bg-sky-500 text-white px-3 py-1.5 rounded-xl transition-all"
              >
                dodaj plik
            </button>
            <p className="text-xs text-slate-400 mt-1">
              Przeglądaj i pobieraj materiały udostępnione w systemie
            </p>
          </div>
          {/* Licznik plików jako mały badge */}
          <span className="bg-slate-800 text-slate-300 text-xs font-semibold px-2.5 py-1 rounded-full border border-slate-700">
            Suma: {files.length}
          </span>
        </div>

        <div className="w-full bg-slate-850 my-5 h-[1px]"></div>

        {/* Dynamiczne renderowanie zawartości */}
        {files.length === 0 ? (
          <div className="text-center py-8 text-sm text-slate-500 flex flex-col items-center gap-2">
            <span>📁</span>
            <span>Brak wgranych plików w bazie danych.</span>
          </div>
        ) : (
          <ul className="space-y-3">
            {files.map((file) => (
              <li 
                key={file.id || file.filename}
                className="flex items-center justify-between p-4 bg-slate-950 hover:bg-slate-850 border border-slate-850 hover:border-slate-700 rounded-xl transition-all duration-200 group"
              >
                {/* Informacje o pliku (Ikona + Nazwa) */}
                <div className="flex items-center gap-3 min-w-0 flex-1 pr-4">
                  <div className="p-2 bg-slate-900 border border-slate-800 rounded-lg text-slate-400 group-hover:text-sky-400 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <span className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors truncate">
                    {file.filename}
                  </span>
                </div>

                {/* Przycisk akcji pobierania */}
                <button 
                  onClick={() => downloadFile({ id: file.id, filename: file.filename })}
                  className="px-4 py-2 bg-slate-800 hover:bg-sky-600 text-slate-300 hover:text-white text-xs font-semibold rounded-xl border border-slate-700 hover:border-transparent active:scale-[0.96] shadow-sm transition-all duration-150 cursor-pointer flex items-center gap-1.5 shrink-0"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l4-4m-4 4V4" />
                  </svg>
                  Pobierz
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};