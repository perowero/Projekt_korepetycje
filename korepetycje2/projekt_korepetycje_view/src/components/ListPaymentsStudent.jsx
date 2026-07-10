export const ListPaymentsStudent = ({ onListPaymentsStudent, onListUnpeymentsStudent }) => {
  return (
    <div className="flex bg-slate-900 p-1.5 rounded-xl border border-slate-800 gap-1.5">
      <button 
        onClick={() => onListUnpeymentsStudent()}
        className="flex-1 py-2.5 px-4 bg-slate-800 hover:bg-slate-700 active:scale-[0.99] text-sm font-semibold rounded-lg text-white transition-all cursor-pointer text-center"
      >
        Pokaż nieopłacone
      </button>
      <button 
        onClick={() => onListPaymentsStudent()}
        className="flex-1 py-2.5 px-4 bg-slate-800 hover:bg-slate-700 active:scale-[0.99] text-sm font-semibold rounded-lg text-white transition-all cursor-pointer text-center"
      >
        Pokaż opłacone
      </button>
    </div>
  );
};