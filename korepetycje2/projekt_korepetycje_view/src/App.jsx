import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { AddLesson} from './operations/addLesson';
import { Login } from './operations/login';
import { RegisterStudent } from './operations/registerStudent';
import { ShowStudents } from './operations/showStudents';
import { RegisterTeacher } from './operations/registerTeacher';
import { ShowTeachers } from './operations/showTeachers';
import { CheckIsToken } from './operations/CheckIsToken';
import { Calendary } from './components/Calendary';

const router=createBrowserRouter([
  {path: "/addLesson", element:<CheckIsToken> <AddLesson/></CheckIsToken>},
  {path: "/login", element: <Login/>},
  {path: "/registerStudent", element: <RegisterStudent/>},
  {path: "/registerTeacher", element: <RegisterTeacher/>},
  {path: "/showStudents", element: <CheckIsToken><ShowStudents/></CheckIsToken>},
  {path: "/showTeachers", element: <CheckIsToken><ShowTeachers/></CheckIsToken>},
  {path: "/calendary", element: <CheckIsToken><Calendary/></CheckIsToken>},
  {path: "*", element: <Navigate to="/login" replace/>}
]);
function App() {
  return <RouterProvider router={router}/>
}

export default App
