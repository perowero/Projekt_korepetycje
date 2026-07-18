import { Navigate } from 'react-router-dom';
export const PaymentRedirect=()=>{
    const role=localStorage.userRole;
    
    return(
        <>
            {role === "teacher" && <Navigate to="/teacher/calendary" replace />}
            {role === "student" && <Navigate to="/student/paymentsStudent" replace />}
        </>
    );
};