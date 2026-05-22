
export const Logout=({setIsLogin})=>{

    return(
        <button onClick={()=>setIsLogin(false)}>wyloguj</button>
    )

}