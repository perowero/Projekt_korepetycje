import {useState} from "react"

export const FormAddStudent=({onRegisterStudent}) => {
    const[name, setName]= useState("");
    const[surname, setSurname]= useState("");
    const[address, setAddress]=useState("");
    const[schoolclass, setSchoolclass]=useState("");
    const[username, setUsername]=useState("");
    const[email,setEmail]=useState("");
    const[password,setPassword]=useState("");

    return(
        <div className="min-h-[85vh] w-full flex flex-col justify-center items-center font-sans antialiased text-slate-200 p-4">
      
      <div className="bg-slate-900 shadow-2xl border border-slate-800 px-6 sm:px-10 py-8 w-full max-w-2xl rounded-2xl transition-all">
        
        <div className="text-center w-full mb-2">
          <h2 className="font-bold text-2xl text-white tracking-tight">
            REJESTRACJA UCZNIA
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Dodaj nowy profil ucznia do swojej bazy
          </p>
        </div>
        
        <div className="w-full bg-slate-850 my-5 h-[1px]"></div>
        
          <form

            onSubmit={(e) =>{

                e.preventDefault();

                onRegisterStudent({name,surname,address,schoolclass,username,email,password});

            }



            }

        >
          
          {/* Sekcja 1: Dane podstawowe (Imię i Nazwisko) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-slate-400 uppercase tracking-wider">Imię</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                name="name"
                placeholder="np. Adam"
                className="py-2.5 px-4 bg-slate-950 border border-slate-800 rounded-xl w-full text-white placeholder-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all"
                required
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-slate-400 uppercase tracking-wider">Nazwisko</label>
              <input
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
                type="text"
                name="surname"
                placeholder="np. Nowak"
                className="py-2.5 px-4 bg-slate-950 border border-slate-800 rounded-xl w-full text-white placeholder-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all"
                required
              />
            </div>
          </div>

          {/* Sekcja 2: Szkoła i Login */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-slate-400 uppercase tracking-wider">Klasa / Grupa</label>
              <input
                value={schoolclass}
                onChange={(e) => setSchoolclass(e.target.value)}
                type="text"
                name="schoolclass"
                placeholder="np. 4TI lub Matura"
                className="py-2.5 px-4 bg-slate-950 border border-slate-800 rounded-xl w-full text-white placeholder-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all"
                required
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-slate-400 uppercase tracking-wider">Nazwa użytkownika (Login)</label>
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                type="text"
                name="username"
                placeholder="np. anowak"
                className="py-2.5 px-4 bg-slate-950 border border-slate-800 rounded-xl w-full text-white placeholder-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all"
                required
              />
            </div>
          </div>

          {/* Sekcja 3: Kontakt i Bezpieczeństwo */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-slate-400 uppercase tracking-wider">Adres E-mail</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                name="email"
                placeholder="adam.nowak@gmail.com"
                className="py-2.5 px-4 bg-slate-950 border border-slate-800 rounded-xl w-full text-white placeholder-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all"
                required
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-slate-400 uppercase tracking-wider">Hasło konta</label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                name="password"
                placeholder="••••••••"
                className="py-2.5 px-4 bg-slate-950 border border-slate-800 rounded-xl w-full text-white placeholder-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all"
                required
              />
            </div>
          </div>

          {/* Sekcja 4: Adres zamieszkania (Szerokość 100%) */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-slate-400 uppercase tracking-wider">Adres zamieszkania</label>
            <input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              type="text"
              name="address"
              placeholder="ul. Grunwaldzka 12/4, 80-264 Gdańsk"
              className="py-2.5 px-4 bg-slate-950 border border-slate-800 rounded-xl w-full text-white placeholder-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all"
              required
            />
          </div>

          {/* Przycisk Akcji */}
          <div className="w-full pt-4">
            <button
              type="submit"
              className="w-full bg-sky-600 hover:bg-sky-500 active:scale-[0.99] text-white font-semibold py-3 px-4 rounded-xl shadow-lg shadow-sky-600/20 transition-all duration-150 cursor-pointer flex flex-row justify-center items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
              Zarejestruj ucznia
            </button>
          </div>

        </form>
      </div>
    </div>

    );
};