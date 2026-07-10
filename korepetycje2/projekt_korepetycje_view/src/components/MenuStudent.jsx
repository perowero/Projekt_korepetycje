import { useNavigate, useLocation } from "react-router-dom"; 

export const MenuStudent = () => {
  const navigate = useNavigate();
  const location = useLocation(); 

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 w-full bg-slate-905/80 backdrop-blur-md border-b border-slate-800/60 px-6 py-3 flex items-center justify-between z-50 shadow-lg">
      
      {/* Grupa przycisków nawigacyjnych po prawej stronie */}
      <div className="flex items-center gap-2">

        {/* Przycisk: Kalendarz */}
        <button 
          onClick={() => navigate("/calendary")}
          className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
            isActive("/calendary")
              ? "bg-sky-600 text-white shadow-md shadow-sky-600/10"
              : "text-slate-400 hover:text-slate-200 hover:bg-slate-850"
          }`}
        >
          <span className="hidden sm:inline">Kalendarz</span>
        </button>

        <button 
          onClick={() => navigate("/paymentsStudent")}
          className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
            isActive("/calendary")
              ? "bg-sky-600 text-white shadow-md shadow-sky-600/10"
              : "text-slate-400 hover:text-slate-200 hover:bg-slate-850"
          }`}
        >
          <span className="hidden sm:inline">Płatności</span>
        </button>

        

        {/* Przycisk: Pliki (Wyróżniony dodatkowo) */}
        <button 
          onClick={() => navigate("/downloadFile")}
          className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all duration-200 cursor-pointer flex items-center gap-1.5  ${
            isActive("/downloadFile")
              ? " border-transparent text-white shadow-md shadow-sky-600/10"
              : " text-slate-400 hover:text-indigo-300 hover:bg-indigo-600/10 hover:border-indigo-900/40"
          }`}
        >
          <span>Pliki</span>
        </button>

        <button 
          onClick={() => navigate("/logout")}
          className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all duration-200 cursor-pointer flex items-center gap-1.5  ${
            isActive("/logout")
              ? " border-transparent text-white shadow-md shadow-sky-600/10"
              : " text-slate-400 hover:text-indigo-300 hover:bg-indigo-600/10 hover:border-indigo-900/40"
          }`}
        >
          <span>Wyloguj</span>
        </button>

      </div>
    </nav>
  );
};