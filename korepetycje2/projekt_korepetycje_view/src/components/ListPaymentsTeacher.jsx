export const ListPaymentsTeacher=({onListPaymentsTeacher,onListUnpeymentsTeacher, onFormIndividualPaid})=>{
    return(
        <div className="flex bg-slate-900 p-1.5 rounded-xl border border-slate-800 gap-1.5">
      <button 
        onClick={() => onListUnpeymentsTeacher()}
        className="flex-1 py-2.5 px-4 bg-slate-800 hover:bg-slate-700 active:scale-[0.99] text-sm font-semibold rounded-lg text-white transition-all cursor-pointer text-center"
      >
        Pokaż wszystkie nieopłacone
      </button>

      <button 
        onClick={() => onListPaymentsTeacher()}
        className="flex-1 py-2.5 px-4 bg-slate-800 hover:bg-slate-700 active:scale-[0.99] text-sm font-semibold rounded-lg text-white transition-all cursor-pointer text-center"
      >
        Pokaż wszystkie opłacone
      </button>

      <button 
        onClick={() => onFormIndividualPaid()}
        className="flex-1 py-2.5 px-4 bg-slate-800 hover:bg-slate-700 active:scale-[0.99] text-sm font-semibold rounded-lg text-white transition-all cursor-pointer text-center"
      >
        Płatności ucznia
      </button>
    </div>
    );
};