import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, BookOpen, Loader2 } from "lucide-react";

import api from "../../services/api";

const ManageLessons = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const response = await api.get(
          `/lessons/course/${courseId}`
        );

        if (response.data.success) {
          setLessons(response.data.lessons);
        }
      } catch (error) {
        setError(
          error.response?.data?.message ||
            "Failed to load lessons"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchLessons();
  }, [courseId]);

  return (
    <div className="min-h-screen bg-slate-100 p-6 md:p-8">
      <div className="max-w-5xl mx-auto">

        <div className="flex items-center gap-4 mb-8">
          <button
            type="button"
            onClick={() => navigate("/teacher/courses")}
            className="p-2 rounded-lg bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 transition"
            aria-label="Back to courses"
          >
            <ArrowLeft size={20} />
          </button>

          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-slate-800">
              Manage Lessons
            </h1>

            <p className="text-slate-500 mt-1">
              Manage lessons for this course.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-11 h-11 rounded-xl bg-cyan-100 text-cyan-600 flex items-center justify-center">
              <BookOpen size={22} />
            </div>

            <div>
              <h2 className="text-lg font-semibold text-slate-800">
                Course Lessons
              </h2>

              <p className="text-sm text-slate-500">
                {lessons.length} lesson
                {lessons.length !== 1 ? "s" : ""}
              </p>
            </div>
          </div>

          {loading && (
            <div className="flex items-center justify-center py-12 text-slate-500">
              <Loader2
                size={22}
                className="animate-spin mr-2"
              />
              Loading lessons...
            </div>
          )}

          {!loading && error && (
            <div className="p-4 rounded-lg bg-red-50 border border-red-200 text-red-700">
              {error}
            </div>
          )}

          {!loading && !error && lessons.length === 0 && (
            <div className="text-center py-12">
              <p className="text-slate-500">
                No lessons added yet.
              </p>
            </div>
          )}

          {!loading && !error && lessons.length > 0 && (
            <div className="space-y-3">
              {lessons.map((lesson, index) => (
                <div
                  key={lesson._id}
                  className="flex items-center justify-between gap-4 p-4 rounded-xl border border-slate-200 hover:border-cyan-200 transition"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center font-semibold text-slate-600">
                      {lesson.order || index + 1}
                    </div>

                    <div>
                      <h3 className="font-semibold text-slate-800">
                        {lesson.title}
                      </h3>

                      <p className="text-sm text-slate-500 mt-1">
                        {lesson.duration} minutes
                      </p>
                    </div>
                  </div>

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      lesson.isPublished
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {lesson.isPublished
                      ? "Published"
                      : "Draft"}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageLessons;