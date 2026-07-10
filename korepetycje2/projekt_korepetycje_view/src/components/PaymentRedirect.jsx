import { Navigate } from 'react-router-dom';
export const PaymentRedirect=()=>{
    const role=localStorage.userRole;
    
    return(
        <>
            {role === "teacher" && <Navigate to="/calendary" replace />}
            {role === "student" && <Navigate to="/paymentsStudent" replace />}
        </>
    );
};