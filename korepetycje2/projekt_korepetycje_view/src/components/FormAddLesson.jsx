import { useState } from "react";

export const FormAddLesson=({onAddLesson})=>{
    const[data,setData]=useState("");
    const[prize,setPrize]=useState("");

    return(
        <form onSubmit={(e)=>{
            e.preventDefault();
            onAddLesson({data,prize});
        }}>
            <div>
                <input 
                    defaultValue={data}
                    onChange={(e)=>{
                        setData(e.target.value);
                    }}
                    type="date"
                    name="date"
                    placeholder="data"
                />
            </div>

            <div>
                <input
                    defaultValue={prize}
                    onChange={(e)=>{
                        setPrize(e.target.value);
                    }}
                    type="text"
                    name="prize"
                    placeholder="cena"
                />
            </div>

            <button>dodaj</button>

        </form>
    )
}