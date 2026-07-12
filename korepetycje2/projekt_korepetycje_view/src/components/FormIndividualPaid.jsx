import { ChooseStudent } from "./ChooseStudent";
import { useState } from "react";
import { ListIndividualPaid } from "./ListIndividualPaid";
import { ListIndividualUnpaid } from "./ListIndividualUnpaid";

export const FormIndividualPaid = () => {
    const [view, setView] = useState("unpaid"); 
    const [showStudent, setShowStudents] = useState(false); 
    const [student, setStudent] = useState(null);

    return (
        <div className="space-y-4 p-4">
            <div className="flex gap-4 items-center bg-slate-950 p-3 rounded-xl border border-slate-800">
                <label className="flex items-center gap-2 text-sm cursor-pointer">
                    <input
                      type="radio"
                      name="payments"
                      value="unpaid"
                      checked={view === "unpaid"}
                      onChange={(e) => setView(e.target.value)}
                    />
                    Nieopłacone
                </label>

                <label className="flex items-center gap-2 text-sm cursor-pointer">
                    <input
                      type="radio"
                      name="payments"
                      value="paid"
                      checked={view === "paid"}
                      onChange={(e) => setView(e.target.value)}
                    />
                    Opłacone
                </label>
            </div>

            <button 
                type="button"
                onClick={() => setShowStudents(!showStudent)}
                className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-sm font-medium rounded-lg text-white transition-all"
            >
                {student ? `Wybrany: ${student.username} (Zmień)` : "Wybierz ucznia"}
            </button>

            {showStudent && (
                <ChooseStudent 
                    onSelectStudent={(s) => { setStudent(s); setShowStudents(false); }} 
                    selectedStudent={student}
                />
            )}

            {student && (
                <div className="mt-4 border-t border-slate-800 pt-4">
                    {view === "paid" ? (
                        <>
                        <ListIndividualPaid username={student} />
                        {console.log(student)}
                        </>
                    ) : (
                        <>
                        <ListIndividualUnpaid username={student} />
                        {console.log(student)}
                        </>
                    )}
                </div>
            )}
        </div>
    );
};