import {useState} from "react"

export const FormAddFile=({onAddFile}) => {
    const[filename, setFilename]= useState("");
    const[file, setFile]= useState(null);

    const handleSubmit = (e) => {
    e.preventDefault();}

    onAddFile({filename,file});

    return(
        <form
            onSubmit={handleSubmit}>

            <div>
                <input
                    value={filename}
                    onChange={(e)=>{
                        setFilename(e.target.value);
                    }}
                    type="text"
                    name="filename"
                    placeholder="nazwa pliku"
                >
                </input>
            </div>

            <div>
                <input
                    onChange={(e)=>{
                        setFile(e.target.files[0]);
                    }}
                    type="file"
                    name="file"
                    placeholder="plik"
                >
                </input>
            </div>
            <button>dodaj</button>
        </form>

    );
};