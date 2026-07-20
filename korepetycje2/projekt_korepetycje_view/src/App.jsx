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
import { DashboardStudent } from './components/DashboardPaymentsStudent';
import { MenuStudent } from './components/MenuStudent';
import { PaymentRedirect } from './components/PaymentRedirect';
import { DashboardPaymentTeacher } from './components/DashboardPaymentsTeacher';
import { LessonInformation } from './components/LessonInformation';
import { LessonSummary } from './components/LessonSummary';
import { FormLessonSummary } from './components/FormLessonSummary';

const TeacherLayout = () => {
  return (
    <>
      <MenuTeacher /> 
      <div>
        <Outlet /> 
      </div>
    </>
  );
};

const StudentLayout = () => {
  return (
    <>
      <MenuStudent /> 
      <div>
        <Outlet /> 
      </div>
    </>
  );
};

// 2. Strażnika zapinamy bezpośrednio w routerze, owijając nim całe Layouty!
const router = createBrowserRouter([
  { path: "/login", element: <Login /> },

  {
    path: "/teacher",
    element: <CheckIsToken allowedRoles="teacher"><TeacherLayout /></CheckIsToken>, 
    children: [
      { path: "addLesson", element: <AddLesson /> },
      { path: "registerStudent", element: <RegisterStudent /> },
      { path: "registerTeacher", element: <RegisterTeacher /> },
      { path: "showStudents", element: <ShowStudents /> },
      { path: "showTeachers", element: <ShowTeachers /> },
      { path: "calendary", element: <Calendary /> },
      { path: "addFile", element: <AddFile /> },
      { path: "downloadFile", element: <ListFiles /> },
      { path: "logout", element: <Logout/>},
      { path: "paymentRedirect", element: <PaymentRedirect/>},
      { path: "paymentsTeacher", element: <DashboardPaymentTeacher/>},
      { path: "lessonInformation/:id", element: <LessonInformation/>},
      { path: "showLessonSummary/:id", element: <LessonSummary/>},
      { path: "formLessonSummary/:id/:issummary", element: <FormLessonSummary/>}
    ]
  },

  {
    path: "/student",
    element: <CheckIsToken allowedRoles="student"><StudentLayout /></CheckIsToken>, 
    children: [
      { path: "calendary", element: <Calendary /> },
      { path: "addFile", element: <AddFile /> },
      { path: "downloadFile", element: <ListFiles /> },
      { path: "logout", element: <Logout/>},
      { path: "paymentsStudent", element: <DashboardStudent/>},
      { path: "paymentRedirect", element: <PaymentRedirect/>},
      { path: "lessonInformation/:id", element: <LessonInformation/>},
      { path: "showLessonSummary/:id", element: <LessonSummary/>}
    ]
  },

  { path: "*", element: <Navigate to="/login" replace /> }
]);

function App() {
  return <RouterProvider router={router}/>
}

export default App
