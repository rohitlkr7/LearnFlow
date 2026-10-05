import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import StudentDashboard from "./pages/student/StudentDashboard";
import TeacherDashboard from "./pages/teacher/TeacherDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import CreateCourse from "./pages/teacher/CreateCourse";
import MyCourses from "./pages/teacher/MyCourses";
import EditCourse from "./pages/teacher/EditCourse";
import ManageLessons from "./pages/teacher/ManageLessons";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/student"
          element={
            <ProtectedRoute>
              <StudentDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/teacher"
          element={
            <ProtectedRoute>
              <TeacherDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/teacher/create-course"
          element={
            <ProtectedRoute>
              <CreateCourse />
            </ProtectedRoute>
          }
        />
        <Route
          path="/teacher/courses"
          element={
            <ProtectedRoute>
              <MyCourses />
            </ProtectedRoute>
          }
        />
        <Route
          path="/teacher/courses/edit/:id"
          element={
            <ProtectedRoute>
              <EditCourse />
            </ProtectedRoute>
          }
        />
        <Route
          path="/teacher/courses/:courseId/lessons"
          element={
            <ProtectedRoute>
              <ManageLessons />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
