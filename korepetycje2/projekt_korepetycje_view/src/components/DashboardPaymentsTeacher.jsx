import { ListUnpaidTeacher } from "./ListUnpaidTeacher";
import {ListPaidTeacher} from "./ListPaidTeacher"
import { ListPaymentsTeacher } from "./ListPaymentsTeacher";
import { FormIndividualPaid } from "./FormIndividualPaid";
import { useState } from "react";

export const DashboardPaymentTeacher=()=>{
    const [currentView, setCurrentView] = useState("unpaid");

    return (
        <div className="p-6 bg-slate-950 min-h-screen text-slate-100">
          <div className="max-w-xl mx-auto space-y-6">
            
            {/* Nagłówek Dashboardu */}
            <div className="border-b border-slate-800 pb-4">
              <h1 className="text-2xl font-bold tracking-tight text-white">Panel Nauczyciela</h1>
              <p className="text-sm text-slate-400 mt-1">Zarządzaj swoimi lekcjami i rozliczeniami</p>
            </div>
    
            <ListPaymentsTeacher 
              onListUnpeymentsTeacher={() => setCurrentView("unpaid")} 
              onListPaymentsTeacher={() => setCurrentView("paid")} 
              onFormIndividualPaid={() => setCurrentView("individual")}
            />
    
            <div className="bg-slate-900/50 p-2 rounded-2xl border border-slate-900">
              {currentView === "unpaid" && <ListUnpaidTeacher/>}
              {currentView === "paid" && <ListPaidTeacher/>}
              {currentView === "individual" && <FormIndividualPaid />}
            </div>
    
          </div>
        </div>
      );
};