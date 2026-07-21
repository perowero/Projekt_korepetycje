import {useState} from "react";

export const FormLogin=({onLogin})=>{
    const [username,setUsername]=useState("");
    const [password,setPassword]=useState("");
    const [role,setRole]=useState("");
    

    return (
        <div className="bg-slate-950 min-h-screen w-screen flex flex-col justify-center items-center font-sans antialiased text-slate-200">
      
      {/* Karta formularza logowania */}
      <div className="bg-slate-900 shadow-2xl border border-slate-800 px-8 sm:px-12 w-full xs:w-full sm:w-8/12 md:w-7/12 lg:w-6/12 xl:w-2/6 h-screen sm:h-auto py-10 sm:rounded-2xl transition-all">
        
        <div className="text-center w-full font-bold text-3xl text-white tracking-tight p-2">
          PANEL LOGOWANIA
        </div>
        
        <div className="w-full bg-slate-850 my-5 h-[1px]"></div>
        
       <form

            onSubmit={(e)=>{

                e.preventDefault();

                onLogin({username,role,password});

            }}

        >
          <div className="flex flex-col gap-5 py-2">
            
            <div className="flex flex-col gap-1.5 relative">
              <label className="text-sm font-medium text-slate-300">Nazwa użytkownika</label>
              <div className="relative flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="absolute left-3 h-5 w-5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                </svg>
                <input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  type="text"
                  name="login"
                  placeholder="Wpisz swój login"
                  className="py-3 pl-11 pr-4 bg-slate-950 border border-slate-800 focus:border-transparent rounded-xl w-full text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all"
                  required
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5 relative">
              <label className="text-sm font-medium text-slate-300">Hasło</label>
              <div className="relative flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="absolute left-3 h-5 w-5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  className="py-3 pl-11 pr-4 bg-slate-950 border border-slate-800 focus:border-transparent rounded-xl w-full text-white placeholder-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all"
                  required
                />
              </div>
            </div>

            <div className="flex flex-col gap-2 pt-1">
              <label className="text-sm font-medium text-slate-300">Zaloguj jako:</label>
              <div className="grid grid-cols-2 gap-4">
                
                <label className={`flex items-center justify-center gap-2 p-3 rounded-xl border cursor-pointer transition-all select-none ${
                  role === "student" 
                    ? "bg-sky-600/10 border-sky-500 text-sky-400 font-semibold" 
                    : "bg-slate-950 border-slate-850 text-slate-400 hover:bg-slate-850"
                }`}>
                  <input 
                    type="radio" 
                    name="role"
                    value="student"
                    checked={role === "student"}
                    onChange={(e) => setRole(e.target.value)}
                    className="sr-only" 
                  />
                  <span>👤 Uczeń</span>
                </label>

                <label className={`flex items-center justify-center gap-2 p-3 rounded-xl border cursor-pointer transition-all select-none ${
                  role === "teacher" 
                    ? "bg-sky-600/10 border-sky-500 text-sky-400 font-semibold" 
                    : "bg-slate-950 border-slate-850 text-slate-400 hover:bg-slate-850"
                }`}>
                  <input 
                    type="radio" 
                    name="role"
                    value="teacher"
                    checked={role === "teacher"}
                    onChange={(e) => setRole(e.target.value)}
                    className="sr-only"
                  />
                  <span>👨‍🏫 Nauczyciel</span>
                </label>

              </div>
            </div>

            <div className="w-full pt-3">
              <button
                type="submit"
                className="w-full bg-sky-600 hover:bg-sky-500 active:scale-[0.99] text-white font-semibold py-3 px-4 rounded-xl shadow-lg shadow-sky-600/20 transition-all duration-150 cursor-pointer flex flex-row justify-center items-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg> 
                Zaloguj się
              </button>
            </div>

            

          </div>
        </form>
      </div>
      
    </div>
    )
}