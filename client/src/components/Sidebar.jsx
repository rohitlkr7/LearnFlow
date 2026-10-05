import {
  LayoutDashboard,
  BookOpen,
  ClipboardList,
  Brain,
  BarChart3,
  Video,
  LogOut,
} from "lucide-react";

import { useAuth } from "../context/AuthContext";

const Sidebar = () => {
  const { logout } = useAuth();

  return (
    <aside className="w-64 min-h-screen bg-slate-900 text-white p-5 flex flex-col">
      {/* Logo */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-cyan-400">LearnFlow</h1>

        <p className="text-sm text-slate-400 mt-1">Student Portal</p>
      </div>

      {/* Navigation */}
      <nav className="space-y-2">
        <a
          href="/student"
          className="flex items-center gap-3 px-4 py-3 rounded-lg bg-cyan-500 text-white"
        >
          <LayoutDashboard size={20} />
          Dashboard
        </a>

        <a
          href="#"
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-800"
        >
          <BookOpen size={20} />
          My Courses
        </a>

        <a
          href="#"
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-800"
        >
          <ClipboardList size={20} />
          Assignments
        </a>

        <a
          href="#"
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-800"
        >
          <Brain size={20} />
          Quizzes
        </a>

        <a
          href="#"
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-800"
        >
          <BarChart3 size={20} />
          Progress
        </a>

        <a
          href="#"
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-800"
        >
          <Video size={20} />
          Live Classes
        </a>
      </nav>

      {/* Logout */}
      <button
        onClick={logout}
        className="mt-auto flex items-center gap-3 px-4 py-3 rounded-lg text-red-400 hover:bg-slate-800"
      >
        <LogOut size={20} />
        Logout
      </button>
    </aside>
  );
};

export default Sidebar;
