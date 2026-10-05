import {
  BookOpen,
  ClipboardList,
  Brain,
  Clock,
  TrendingUp,
  PlayCircle,
} from "lucide-react";

import { useAuth } from "../../context/AuthContext";
import Sidebar from "../../components/Sidebar";

const StudentDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-slate-100 flex">

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-8 overflow-y-auto">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

          <div>
            <h1 className="text-3xl font-bold text-slate-800">
              Welcome back, {user?.name}! 👋
            </h1>

            <p className="text-slate-500 mt-1">
              Keep learning and reach your goals.
            </p>
          </div>

          <div className="bg-white px-4 py-3 rounded-xl shadow-sm">
            <p className="text-sm text-slate-500">
              Learning Streak
            </p>

            <p className="text-xl font-bold text-orange-500">
              🔥 5 Days
            </p>
          </div>

        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-8">

          {/* Courses */}
          <div className="bg-white rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between">

              <div>
                <p className="text-slate-500 text-sm">
                  My Courses
                </p>

                <h2 className="text-3xl font-bold text-slate-800 mt-2">
                  4
                </h2>
              </div>

              <div className="bg-cyan-100 p-3 rounded-xl">
                <BookOpen className="text-cyan-600" />
              </div>

            </div>
          </div>

          {/* Assignments */}
          <div className="bg-white rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between">

              <div>
                <p className="text-slate-500 text-sm">
                  Assignments
                </p>

                <h2 className="text-3xl font-bold text-slate-800 mt-2">
                  3
                </h2>
              </div>

              <div className="bg-purple-100 p-3 rounded-xl">
                <ClipboardList className="text-purple-600" />
              </div>

            </div>
          </div>

          {/* Quiz */}
          <div className="bg-white rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between">

              <div>
                <p className="text-slate-500 text-sm">
                  Quiz Average
                </p>

                <h2 className="text-3xl font-bold text-slate-800 mt-2">
                  82%
                </h2>
              </div>

              <div className="bg-green-100 p-3 rounded-xl">
                <TrendingUp className="text-green-600" />
              </div>

            </div>
          </div>

          {/* Study Time */}
          <div className="bg-white rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between">

              <div>
                <p className="text-slate-500 text-sm">
                  Study Time
                </p>

                <h2 className="text-3xl font-bold text-slate-800 mt-2">
                  18h
                </h2>
              </div>

              <div className="bg-orange-100 p-3 rounded-xl">
                <Clock className="text-orange-600" />
              </div>

            </div>
          </div>

        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">

          {/* Continue Learning */}
          <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm">

            <div className="flex items-center justify-between mb-6">

              <h2 className="text-xl font-bold text-slate-800">
                Continue Learning
              </h2>

              <button className="text-cyan-600 font-medium">
                View All
              </button>

            </div>

            {/* Course */}
            <div className="border border-slate-200 rounded-xl p-4">

              <div className="flex flex-col sm:flex-row gap-4">

                <div className="w-full sm:w-32 h-24 bg-slate-900 rounded-xl flex items-center justify-center">
                  <PlayCircle
                    size={40}
                    className="text-cyan-400"
                  />
                </div>

                <div className="flex-1">

                  <p className="text-sm text-cyan-600 font-medium">
                    Web Development
                  </p>

                  <h3 className="text-lg font-bold text-slate-800 mt-1">
                    Complete MERN Stack Development
                  </h3>

                  <p className="text-sm text-slate-500 mt-1">
                    React Hooks & State Management
                  </p>

                  {/* Progress */}
                  <div className="mt-4">

                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-slate-500">
                        Progress
                      </span>

                      <span className="font-medium">
                        68%
                      </span>
                    </div>

                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div
                        className="bg-cyan-500 h-2 rounded-full"
                        style={{ width: "68%" }}
                      />
                    </div>

                  </div>

                </div>

              </div>

            </div>

          </div>

          {/* AI Assistant */}
          <div className="bg-slate-900 rounded-2xl p-6 text-white">

            <div className="bg-cyan-500 w-12 h-12 rounded-xl flex items-center justify-center">
              <Brain size={26} />
            </div>

            <h2 className="text-xl font-bold mt-5">
              AI Study Assistant
            </h2>

            <p className="text-slate-300 text-sm mt-2 leading-6">
              Ask questions, understand difficult topics,
              generate quizzes and create personalized
              study plans.
            </p>

            <button className="w-full mt-6 bg-cyan-500 hover:bg-cyan-600 py-3 rounded-xl font-semibold transition">
              Ask AI
            </button>

          </div>

        </div>

        {/* Upcoming Assignments */}
        <div className="bg-white rounded-2xl p-6 shadow-sm mt-6">

          <div className="flex items-center justify-between mb-5">

            <h2 className="text-xl font-bold text-slate-800">
              Upcoming Assignments
            </h2>

            <button className="text-cyan-600 font-medium">
              View All
            </button>

          </div>

          <div className="space-y-4">

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b pb-4">

              <div>
                <h3 className="font-semibold text-slate-800">
                  React Project
                </h3>

                <p className="text-sm text-slate-500">
                  Build a Todo Application
                </p>
              </div>

              <span className="text-sm bg-red-100 text-red-600 px-3 py-1 rounded-full">
                Due Tomorrow
              </span>

            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">

              <div>
                <h3 className="font-semibold text-slate-800">
                  MongoDB Assignment
                </h3>

                <p className="text-sm text-slate-500">
                  Database Design & Queries
                </p>
              </div>

              <span className="text-sm bg-yellow-100 text-yellow-600 px-3 py-1 rounded-full">
                Due in 3 Days
              </span>

            </div>

          </div>

        </div>

      </main>

    </div>
  );
};

export default StudentDashboard;