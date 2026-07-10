import { useState } from "react";
import { ListPaymentsStudent } from "./ListPaymentsStudent";
import { ListUnpaidStudent } from "./ListUnpaidStudent";
import { ListPaidStudent } from "./ListPaidStudent";

export const DashboardStudent = () => {
  const [currentView, setCurrentView] = useState("unpaid");

  const handlePayment = async (lessonId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:8080/api/payments/checkout/${lessonId}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        window.location.href = data.checkoutUrl;
      } else {
        alert("Wystąpił błąd podczas przygotowywania płatności.");
      }
    } catch (error) {
      console.error("Błąd sieci:", error);
    }
  };

  return (
    <div className="p-6 bg-slate-950 min-h-screen text-slate-100">
      <div className="max-w-xl mx-auto space-y-6">
        
        {/* Nagłówek Dashboardu */}
        <div className="border-b border-slate-800 pb-4">
          <h1 className="text-2xl font-bold tracking-tight text-white">Panel Studenta</h1>
          <p className="text-sm text-slate-400 mt-1">Zarządzaj swoimi lekcjami i rozliczeniami</p>
        </div>

        <ListPaymentsStudent 
          onListUnpeymentsStudent={() => setCurrentView("unpaid")} 
          onListPaymentsStudent={() => setCurrentView("paid")} 
        />

        <div className="bg-slate-900/50 p-2 rounded-2xl border border-slate-900">
          {currentView === "unpaid" ? (
            <ListUnpaidStudent onMakePayment={handlePayment} />
          ) : (
            <ListPaidStudent />
          )}
        </div>

      </div>
    </div>
  );
};