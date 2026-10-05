import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, BookOpen, Loader2 } from "lucide-react";

import api from "../../services/api";

const EditCourse = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    level: "beginner",
    price: "",
    thumbnail: "",
    isPublished: false,
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await api.get(`/courses/${id}`);

        if (response.data.success) {
          const course = response.data.course;

          setFormData({
            title: course.title || "",
            description: course.description || "",
            category: course.category || "",
            level: course.level || "beginner",
            price: course.price ?? "",
            thumbnail: course.thumbnail || "",
            isPublished: course.isPublished || false,
          });
        }
      } catch (error) {
        setError(
          error.response?.data?.message ||
            "Failed to load course"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setMessage("");
    setSaving(true);

    try {
      const response = await api.put(`/courses/${id}`, {
        ...formData,
        price: Number(formData.price) || 0,
      });

      if (response.data.success) {
        setMessage("Course updated successfully!");

        setTimeout(() => {
          navigate("/teacher/courses");
        }, 1000);
      }
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Failed to update course"
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center">
        <p className="text-slate-500">
          Loading course...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 p-6 md:p-8">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            type="button"
            onClick={() => navigate("/teacher/courses")}
            className="p-2 rounded-lg bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 transition"
          >
            <ArrowLeft size={20} />
          </button>

          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-slate-800">
              Edit Course
            </h1>

            <p className="text-slate-500 mt-1">
              Update your course information.
            </p>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8">

          <div className="flex items-center gap-3 mb-8">
            <div className="w-11 h-11 rounded-xl bg-cyan-100 text-cyan-600 flex items-center justify-center">
              <BookOpen size={22} />
            </div>

            <div>
              <h2 className="text-lg font-semibold text-slate-800">
                Course Information
              </h2>

              <p className="text-sm text-slate-500">
                Make changes to your course details.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Title */}
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-slate-700 mb-2"
              >
                Course Title
              </label>

              <input
                id="title"
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-slate-300 outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>

            {/* Description */}
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-slate-700 mb-2"
              >
                Description
              </label>

              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="5"
                required
                className="w-full px-4 py-3 rounded-lg border border-slate-300 outline-none resize-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>

            {/* Category + Level */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              <div>
                <label
                  htmlFor="category"
                  className="block text-sm font-medium text-slate-700 mb-2"
                >
                  Category
                </label>

                <input
                  id="category"
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>

              <div>
                <label
                  htmlFor="level"
                  className="block text-sm font-medium text-slate-700 mb-2"
                >
                  Level
                </label>

                <select
                  id="level"
                  name="level"
                  value={formData.level}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 outline-none bg-white focus:ring-2 focus:ring-cyan-500"
                >
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">
                    Intermediate
                  </option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>

            </div>

            {/* Price + Thumbnail */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              <div>
                <label
                  htmlFor="price"
                  className="block text-sm font-medium text-slate-700 mb-2"
                >
                  Price (₹)
                </label>

                <input
                  id="price"
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  min="0"
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>

              <div>
                <label
                  htmlFor="thumbnail"
                  className="block text-sm font-medium text-slate-700 mb-2"
                >
                  Thumbnail URL
                </label>

                <input
                  id="thumbnail"
                  type="url"
                  name="thumbnail"
                  value={formData.thumbnail}
                  onChange={handleChange}
                  placeholder="https://example.com/image.jpg"
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>

            </div>

            {/* Publish */}
            <div className="flex items-center gap-3 p-4 rounded-lg bg-slate-50 border border-slate-200">
              <input
                id="isPublished"
                type="checkbox"
                name="isPublished"
                checked={formData.isPublished}
                onChange={handleChange}
                className="w-4 h-4 accent-cyan-500"
              />

              <label
                htmlFor="isPublished"
                className="text-sm font-medium text-slate-700"
              >
                Publish this course
              </label>
            </div>

            {/* Messages */}
            {message && (
              <div className="p-4 rounded-lg bg-green-50 border border-green-200 text-green-700">
                {message}
              </div>
            )}

            {error && (
              <div className="p-4 rounded-lg bg-red-50 border border-red-200 text-red-700">
                {error}
              </div>
            )}

            {/* Buttons */}
            <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 pt-4 border-t border-slate-200">

              <button
                type="button"
                onClick={() => navigate("/teacher/courses")}
                className="px-6 py-3 rounded-lg border border-slate-300 text-slate-700 font-medium hover:bg-slate-50 transition"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={saving}
                className="px-6 py-3 rounded-lg bg-cyan-500 text-white font-medium hover:bg-cyan-600 disabled:opacity-60 disabled:cursor-not-allowed transition flex items-center justify-center gap-2"
              >
                {saving && (
                  <Loader2
                    size={18}
                    className="animate-spin"
                  />
                )}

                {saving ? "Saving..." : "Save Changes"}
              </button>

            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default EditCourse;