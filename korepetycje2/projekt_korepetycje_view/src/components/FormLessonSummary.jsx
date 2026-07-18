import { useState} from "react";

export const FormLessonSummary=()=>{
    const [topic, setTopic]=useState("");
    const [description, setDescription]=useState("");
    const [ishomework, setIshomework]=useState(false);
    const [homework, setHomework]=useState("");

    const addLessonSummary=(data)=>{

    }

    return(
        <div className="min-h-[85vh] w-full flex flex-col justify-center items-center font-sans antialiased text-slate-200 p-4">
      
      {/* Karta formularza - max-w-xl daje idealną szerokość na dwa pola obok siebie */}
      <div className="bg-slate-900 shadow-2xl border border-slate-800 px-6 sm:px-10 py-8 w-full max-w-xl rounded-2xl transition-all">
        
        <div className="text-center w-full mb-2">
          <h2 className="font-bold text-2xl text-white tracking-tight">
            Opis lekcji
          </h2>
        </div>
        
        <div className="w-full bg-slate-850 my-5 h-[1px]"></div>
        
          <form

            onSubmit={(e)=>{

                e.preventDefault();

                addLessonSummary({topic,description,ishomework,homework,})

            }}

        >
          
          {/* temat */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-slate-400 uppercase tracking-wider">Imię</label>
              <input
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                type="text"
                name="topic"
                placeholder="topic"
                className="py-2.5 px-4 bg-slate-950 border border-slate-800 rounded-xl w-full text-white placeholder-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all"
                required
              />
            </div>

            {/*description*/}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-slate-400 uppercase tracking-wider">Nazwisko</label>
              <input
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                type="text"
                name="description"
                placeholder="description"
                className="py-2.5 px-4 bg-slate-950 border border-slate-800 rounded-xl w-full text-white placeholder-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all"
                required
              />
            </div>
          </div>

          {/* ishomework */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-slate-400 uppercase tracking-wider">Nazwa użytkownika (Login)</label>
            <input 
                    type="radio" 
                    name="ishomework"
                    value="true"
                    checked={ishomework === true}
                    onChange={(e) => setIshomework(e.target.value)}
                    className="sr-only"
                  />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-slate-400 uppercase tracking-wider">Nazwa użytkownika (Login)</label>
            <input 
                    type="radio" 
                    name="ishomework"
                    value="false"
                    checked={ishomework === false}
                    onChange={(e) => setIshomework(e.target.value)}
                    className="sr-only"
                  />
          </div>

          {/* Pole: homework */}
          {ishomework&&
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-slate-400 uppercase tracking-wider">Adres E-mail</label>
            <input
              value={homework}
              onChange={(e) => setHomework(e.target.value)}
              type="text" 
              name="homework"
              placeholder="homework"
              className="py-2.5 px-4 bg-slate-950 border border-slate-800 rounded-xl w-full text-white placeholder-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all"
            />
          </div>
        }

        </form>
      </div>
    </div>

    )
}