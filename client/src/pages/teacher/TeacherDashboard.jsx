import {
  LayoutDashboard,
  BookOpen,
  PlusCircle,
  Users,
  ClipboardList,
  LogOut,
} from "lucide-react";

import { useAuth } from "../../context/AuthContext";
import { useEffect, useState } from "react";
import api from "../../services/api";
import { Link } from "react-router-dom";

const TeacherDashboard = () => {
  const { user, logout } = useAuth();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await api.get("/courses/teacher");

        if (response.data.success) {
          setCourses(response.data.courses);
        }
      } catch (error) {
        console.error("Failed to fetch courses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const totalStudents = [
    ...new Set(
      courses.flatMap(
        (course) => course.students?.map((student) => student._id) || [],
      ),
    ),
  ].length;

  return (
    <div className="min-h-screen bg-slate-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white p-5 hidden md:flex flex-col">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-cyan-400">LearnFlow</h1>

          <p className="text-sm text-slate-400 mt-1">Teacher Portal</p>
        </div>

        <nav className="space-y-2">
          <a
            href="/teacher"
            className="flex items-center gap-3 px-4 py-3 rounded-lg bg-cyan-500"
          >
            <LayoutDashboard size={20} />
            Dashboard
          </a>

          <Link
            to="/teacher/courses"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-800 transition"
          >
            <BookOpen size={20} />
            My Courses
          </Link>

          <a
            href="#"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-800"
          >
            <PlusCircle size={20} />
            Create Course
          </a>

          <a
            href="#"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-800"
          >
            <Users size={20} />
            Students
          </a>

          <a
            href="#"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-800"
          >
            <ClipboardList size={20} />
            Assignments
          </a>
        </nav>

        <button
          onClick={logout}
          className="mt-auto flex items-center gap-3 px-4 py-3 rounded-lg text-red-400 hover:bg-slate-800"
        >
          <LogOut size={20} />
          Logout
        </button>
      </aside>

      {/* Main */}
      <main className="flex-1 p-6 md:p-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">
              Welcome, {user?.name}! 👨‍🏫
            </h1>

            <p className="text-slate-500 mt-1">
              Manage your courses and students.
            </p>
          </div>

          <Link
            to="/teacher/create-course"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-500 hover:bg-slate-200 transition"
          >
            <PlusCircle size={20} />
            Create Course
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-8">
          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <p className="text-slate-500">Total Courses</p>

            <p className="text-3xl font-bold text-slate-800">
              {courses.length}
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <p className="text-slate-500">Total Students</p>

            <h2 className="text-3xl font-bold mt-2">{totalStudents}</h2>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <p className="text-slate-500">Assignments</p>

            <h2 className="text-3xl font-bold mt-2">0</h2>
          </div>
        </div>

        {/* Courses */}
        {/* Courses */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mt-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-slate-800">My Courses</h2>

            <button className="text-cyan-600 font-medium">View All</button>
          </div>

          {loading ? (
            <p className="text-slate-500">Loading courses...</p>
          ) : courses.length === 0 ? (
            <div className="text-center py-10">
              <BookOpen size={45} className="mx-auto text-slate-300" />

              <h3 className="text-lg font-semibold text-slate-700 mt-4">
                No courses yet
              </h3>

              <p className="text-slate-500 mt-1">
                Create your first course to start teaching.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {courses.map((course) => (
                <div
                  key={course._id}
                  className="border border-slate-200 rounded-xl p-5"
                >
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <span className="text-sm text-cyan-600 font-medium">
                        {course.category}
                      </span>

                      <h3 className="text-xl font-bold text-slate-800 mt-1">
                        {course.title}
                      </h3>

                      <p className="text-slate-500 text-sm mt-2">
                        {course.description}
                      </p>
                    </div>

                    <span
                      className={`px-3 py-1 rounded-full text-sm whitespace-nowrap ${
                        course.isPublished
                          ? "bg-green-100 text-green-600"
                          : "bg-yellow-100 text-yellow-600"
                      }`}
                    >
                      {course.isPublished ? "Published" : "Draft"}
                    </span>
                  </div>

                  <div className="flex gap-5 mt-5 text-sm text-slate-500">
                    <span>👨‍🎓 {course.students?.length || 0} Students</span>

                    <span>📊 {course.level}</span>

                    <span>💰 ₹{course.price}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default TeacherDashboard;
