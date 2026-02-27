import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthProvider from "./context/AuthContext";
import ToastProvider from "./context/ToastContext";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import CourseDetails from "./pages/CourseDetails";
import MyCourses from "./pages/MyCourses";
import ProtectedRoute from "./components/ProtectedRoute";
import CreateCourse from "./pages/CreateCourse";
import InstructorDashboard from "./pages/InstructorDashboard";
import CourseStudents from "./pages/CourseStudents";
import EditCourse from "./pages/EditCourse";

function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route
              path="/courses/:id"
              element={
                <ProtectedRoute>
                  <CourseDetails />
                </ProtectedRoute>
              }
            />

            <Route
              path="/courses/:id/edit"
              element={
                <ProtectedRoute roles={["INSTRUCTOR", "ADMIN"]}>
                  <EditCourse />
                </ProtectedRoute>
              }
            />

            <Route
              path="/courses/:id/students"
              element={
                <ProtectedRoute roles={["INSTRUCTOR", "ADMIN"]}>
                  <CourseStudents />
                </ProtectedRoute>
              }
            />

            <Route
              path="/my-courses"
              element={
                <ProtectedRoute roles={["STUDENT"]}>
                  <MyCourses />
                </ProtectedRoute>
              }
            />

            <Route
              path="/create-course"
              element={
                <ProtectedRoute roles={["INSTRUCTOR", "ADMIN"]}>
                  <CreateCourse />
                </ProtectedRoute>
              }
            />

            <Route
              path="/instructor"
              element={
                <ProtectedRoute roles={["INSTRUCTOR"]}>
                  <InstructorDashboard />
                </ProtectedRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </ToastProvider>
    </AuthProvider>
  );
}

export default App;