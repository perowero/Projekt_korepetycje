import { useNavigate } from "react-router-dom";

export const MenuTeacher = () => {
  const navigate = useNavigate(); 

  return (
    <>
      <button onClick={() => navigate("/addLesson")}>dodaj lekcję</button>
      <button onClick={() => navigate("/registerStudent")}>zarejestruj ucznia</button>
      <button onClick={() => navigate("/showStudents")}>pokaż uczniów</button>
      <button onClick={() => navigate("/calendary")}>kalendarz</button>
      <button onClick={() => navigate("/downloadFile")}>pliki</button>
    </>
  );
};