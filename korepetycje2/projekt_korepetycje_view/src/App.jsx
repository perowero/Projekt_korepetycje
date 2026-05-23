import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { AddLesson} from './operations/addLesson';
import { Login } from './operations/login';
import { RegisterStudent } from './operations/registerStudent';
import { ShowStudents } from './operations/showStudents';
import { RegisterTeacher } from './operations/registerTeacher';
import { ShowTeachers } from './operations/showTeachers';


const router=createBrowserRouter([
  {path: "/addLesson", element: <AddLesson/>},
  {path: "/login", element: <Login/>},
  {path: "/registerStudent", element: <RegisterStudent/>},
  {path: "/registerTeacher", element: <RegisterTeacher/>},
  {path: "/showStudents", element: <ShowStudents/>},
  {path: "/showTeachers", element: <ShowTeachers/>},
  {path: "*", element: <Navigate to="/login" replace/>}
]);
function App() {
  return <RouterProvider router={router}/>
}

export default App
