import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, BookOpen, Plus, Search, Users, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

import api from "../../services/api";

const MyCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

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

  //   delete course function

  const handleDelete = async (courseId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this course?",
    );

    if (!confirmed) {
      return;
    }

    try {
      const response = await api.delete(`/courses/${courseId}`);

      if (response.data.success) {
        setCourses((prevCourses) =>
          prevCourses.filter((course) => course._id !== courseId),
        );
      }
    } catch (error) {
      console.error("Failed to delete course:", error);

      alert(error.response?.data?.message || "Failed to delete course");
    }
  };

  //   filter courses based on search query

  const filteredCourses = courses.filter((course) =>
    `${course.title} ${course.category}`
      .toLowerCase()
      .includes(search.toLowerCase()),
  );

  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-100 p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <Link
              to="/teacher"
              className="p-2 rounded-lg bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 transition"
            >
              <ArrowLeft size={20} />
            </Link>

            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-slate-800">
                My Courses
              </h1>

              <p className="text-slate-500 mt-1">
                Manage the courses you are teaching.
              </p>
            </div>
          </div>

          <Link
            to="/teacher/create-course"
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-cyan-500 text-white font-medium hover:bg-cyan-600 transition"
          >
            <Plus size={20} />
            Create Course
          </Link>
        </div>

        {/* Search */}
        <div className="bg-white rounded-2xl shadow-sm p-5 mb-6">
          <div className="relative max-w-md">
            <Search
              size={20}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search courses..."
              aria-label="Search courses"
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-300 outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
            />
          </div>
        </div>

        {/* Courses */}
        {loading ? (
          <div className="bg-white rounded-2xl shadow-sm p-10 text-center">
            <p className="text-slate-500">Loading courses...</p>
          </div>
        ) : filteredCourses.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm p-10 text-center">
            <BookOpen size={48} className="mx-auto text-slate-300" />

            <h2 className="text-xl font-semibold text-slate-700 mt-4">
              {search ? "No courses found" : "No courses yet"}
            </h2>

            <p className="text-slate-500 mt-2">
              {search
                ? "Try searching with another keyword."
                : "Create your first course to start teaching."}
            </p>

            {!search && (
              <Link
                to="/teacher/create-course"
                className="inline-flex items-center gap-2 mt-5 px-5 py-3 rounded-lg bg-cyan-500 text-white font-medium hover:bg-cyan-600 transition"
              >
                <Plus size={20} />
                Create Course
              </Link>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <div
                key={course._id}
                className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition"
              >
                {/* Thumbnail */}
                <div className="h-40 bg-slate-200 flex items-center justify-center overflow-hidden">
                  {course.thumbnail ? (
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <BookOpen size={48} className="text-slate-400" />
                  )}
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-sm font-medium text-cyan-600">
                      {course.category}
                    </span>

                    <span
                      className={`text-xs font-medium px-3 py-1 rounded-full ${
                        course.isPublished
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {course.isPublished ? "Published" : "Draft"}
                    </span>
                  </div>

                  <h2 className="text-lg font-bold text-slate-800 mt-3 line-clamp-2">
                    {course.title}
                  </h2>

                  <p className="text-sm text-slate-500 mt-2 line-clamp-2">
                    {course.description}
                  </p>

                  {/* Course Info */}
                  <div className="flex items-center justify-between mt-5 pt-4 border-t border-slate-200">
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                      <Users size={17} />
                      {course.students?.length || 0} Students
                    </div>

                    <span className="text-sm font-semibold text-slate-700">
                      ₹{course.price}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3 mt-5">
                    <button
                      type="button"
                      className="flex-1 px-4 py-2.5 rounded-lg border border-slate-300 text-slate-700 font-medium hover:bg-slate-50 transition"
                      onClick={() =>
                        navigate(`/teacher/courses/edit/${course._id}`)
                      }
                    >
                      Edit
                    </button>
                    
                    <button
                      type="button"
                      onClick={() =>
                        navigate(`/teacher/courses/${course._id}/lessons`)
                      }
                      className="px-3 py-2.5 rounded-lg bg-cyan-500 text-white hover:bg-cyan-600 transition"
                    >
                      Lessons
                    </button>

                    <button
                      type="button"
                      className="flex-1 px-4 py-2.5 rounded-lg bg-slate-900 text-white font-medium hover:bg-slate-800 transition"
                    >
                      Manage
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDelete(course._id)}
                      aria-label={`Delete ${course.title}`}
                      className="px-3 py-2.5 rounded-lg border border-red-200 text-red-500 hover:bg-red-50 transition"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyCourses;
