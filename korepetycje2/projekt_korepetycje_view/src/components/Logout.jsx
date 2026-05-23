
export const Logout=({setIsLogin})=>{
    const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('userRole');

    alert("Wylogowano");
    };
    return(
        <button 
            onClick={()=>{setIsLogin(false)}}
            onClick={handleLogout}
        >wyloguj</button>
    )

}