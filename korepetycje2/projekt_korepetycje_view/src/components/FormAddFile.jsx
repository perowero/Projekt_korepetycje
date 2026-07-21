import {useState} from "react"

export const FormAddFile=({onAddFile}) => {
    const[filename, setFilename]= useState("");
    const[file, setFile]= useState(null);

    const handleSubmit = (e) => {
    e.preventDefault();

    onAddFile({filename,file});
};

    return(
        <div className="min-h-[70vh] w-full flex flex-col justify-center items-center font-sans antialiased text-slate-200 p-4">
      
      <div className="bg-slate-900 shadow-2xl border border-slate-800 px-6 sm:px-10 py-8 w-full max-w-md rounded-2xl transition-all">
        
        <div className="text-center w-full mb-2">
          <h2 className="font-bold text-2xl text-white tracking-tight">
            UDOSTĘPNIJ PLIK
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Wgraj materiały edukacyjne dla swoich uczniów
          </p>
        </div>
        
        <div className="w-full bg-slate-850 my-5 h-[1px]"></div>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-slate-400 uppercase tracking-wider">
              Nazwa pliku
            </label>
            <input
              value={filename}
              onChange={(e) => setFilename(e.target.value)}
              type="text"
              name="filename"
              placeholder="nazwa"
              className="py-2.5 px-4 bg-slate-950 border border-slate-800 rounded-xl w-full text-white placeholder-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all"
              required
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-slate-400 uppercase tracking-wider">
              Wybierz plik z dysku
            </label>
            <input
              onChange={(e) => {
                const selectedFile = e.target.files[0];
                setFile(selectedFile);
                if (!filename && selectedFile) {
                  setFilename(selectedFile.name);
                }
              }}
              type="file"
              name="file"
              className="w-full text-sm text-slate-400
                file:mr-4 file:py-2.5 file:px-4
                file:rounded-xl file:border-0
                file:text-sm file:font-semibold
                file:bg-slate-800 file:text-slate-200
                hover:file:bg-slate-700 file:transition-all
                file:cursor-pointer cursor-pointer
                bg-slate-950 border border-slate-800 rounded-xl p-1"
              required
            />
          </div>

          <div className="w-full pt-3">
            <button
              type="submit"
              className="w-full bg-sky-600 hover:bg-sky-500 active:scale-[0.99] text-white font-semibold py-3 px-4 rounded-xl shadow-lg shadow-sky-600/20 transition-all duration-150 cursor-pointer flex flex-row justify-center items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
              Wyślij plik
            </button>
          </div>

        </form>
      </div>
    </div>

    );
};