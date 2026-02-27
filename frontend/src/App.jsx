import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthProvider from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import CourseDetails from "./pages/CourseDetails";
import MyCourses from "./pages/MyCourses";
import ProtectedRoute from "./components/ProtectedRoute";
import CreateCourse from "./pages/CreateCourse";

function App() {
    return (
        <AuthProvider>
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
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;
