import { createBrowserRouter, RouterProvider, Navigate, Outlet } from 'react-router-dom';
import { AddLesson} from './operations/addLesson';
import { Login } from './operations/login';
import { RegisterStudent } from './operations/registerStudent';
import { ShowStudents } from './operations/showStudents';
import { RegisterTeacher } from './operations/registerTeacher';
import { ShowTeachers } from './operations/showTeachers';
import { CheckIsToken } from './operations/CheckIsToken';
import { Calendary } from './components/Calendary';
import { AddFile } from './operations/AddFile';
import { ListFiles } from './components/ListFiles';
import { MenuTeacher} from './components/MenuTeacher';
import { Logout } from './components/Logout';

const TeacherLayout = () => {
  return (
    <CheckIsToken>
      <MenuTeacher /> 
      <div>
        <Outlet /> 
      </div>
    </CheckIsToken>
  );
};
const router=createBrowserRouter([
  { path: "/login", element: <Login /> },

  {
    element: <TeacherLayout />, 
    children: [
      { path: "/addLesson", element: <AddLesson /> },
      { path: "/registerStudent", element: <RegisterStudent /> },
      { path: "/registerTeacher", element: <RegisterTeacher /> },
      { path: "/showStudents", element: <ShowStudents /> },
      { path: "/showTeachers", element: <ShowTeachers /> },
      { path: "/calendary", element: <Calendary /> },
      { path: "/addFile", element: <AddFile /> },
      { path: "/downloadFile", element: <ListFiles /> },
      { path: "/logout", element: <Logout/>}
    ]
  },

  { path: "*", element: <Navigate to="/login" replace /> }
]);
function App() {
  return <RouterProvider router={router}/>
}

export default App
