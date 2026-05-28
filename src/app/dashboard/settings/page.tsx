"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { useAuth } from "@/lib/auth-context";
import { cn } from "@/lib/utils";
import {
  User,
  Mail,
  Key,
  Eye,
  EyeOff,
  Moon,
  Bell,
  Shield,
  Save,
  Check,
} from "lucide-react";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.33, 1, 0.68, 1] as const } },
};

export default function SettingsPage() {
  const { user } = useAuth();
  const [showApiKey, setShowApiKey] = useState(false);

  // Lazy initialization from localStorage — avoids setState-in-effect
  const [apiKey, setApiKey] = useState(() => {
    if (typeof window === "undefined") return "";
    try {
      const stored = localStorage.getItem("careeros_settings");
      if (stored) return JSON.parse(stored).apiKey || "";
    } catch { /* ignore */ }
    return "";
  });
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window === "undefined") return true;
    try {
      const stored = localStorage.getItem("careeros_settings");
      if (stored) {
        const val = JSON.parse(stored).darkMode;
        return typeof val === "boolean" ? val : true;
      }
    } catch { /* ignore */ }
    return true;
  });
  const [notifications, setNotifications] = useState(() => {
    if (typeof window === "undefined") return true;
    try {
      const stored = localStorage.getItem("careeros_settings");
      if (stored) {
        const val = JSON.parse(stored).notifications;
        return typeof val === "boolean" ? val : true;
      }
    } catch { /* ignore */ }
    return true;
  });
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    try {
      localStorage.setItem(
        "careeros_settings",
        JSON.stringify({ apiKey, darkMode, notifications })
      );
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch {
      // Storage error — still show visual feedback
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-8 max-w-3xl mx-auto"
    >
      {/* Header */}
      <motion.div variants={item}>
        <h1 className="text-3xl font-bold text-white">Settings</h1>
        <p className="text-slate-400 mt-1">
          Manage your account preferences and configuration
        </p>
      </motion.div>

      {/* Profile Section */}
      <motion.div variants={item} className="glass rounded-2xl p-6 space-y-5">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
            <User className="w-5 h-5 text-blue-400" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-white">Profile</h2>
            <p className="text-xs text-slate-400">
              Your personal information (read-only in demo)
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-slate-500" />
              Full Name
            </label>
            <input
              type="text"
              value={user?.name ?? "Guest User"}
              readOnly
              className={cn(
                "w-full px-4 py-2.5 rounded-xl",
                "bg-white/5 border border-white/10",
                "text-white/70 cursor-not-allowed",
                "focus:outline-none"
              )}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-slate-500" />
              Email Address
            </label>
            <input
              type="email"
              value={user?.email ?? "guest@careeros.ai"}
              readOnly
              className={cn(
                "w-full px-4 py-2.5 rounded-xl",
                "bg-white/5 border border-white/10",
                "text-white/70 cursor-not-allowed",
                "focus:outline-none"
              )}
            />
          </div>
        </div>

        {/* Avatar preview */}
        <div className="flex items-center gap-4 pt-2">
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-xl font-bold shadow-lg shadow-blue-500/20">
            {user?.name?.charAt(0) ?? "G"}
          </div>
          <div>
            <p className="text-sm text-white font-medium">{user?.name ?? "Guest"}</p>
            <p className="text-xs text-slate-500">Member since May 2026</p>
          </div>
        </div>
      </motion.div>

      {/* API Keys Section */}
      <motion.div variants={item} className="glass rounded-2xl p-6 space-y-5">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center">
            <Key className="w-5 h-5 text-purple-400" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-white">API Keys</h2>
            <p className="text-xs text-slate-400">
              Configure your AI provider keys
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-300 flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5 text-slate-500" />
            OpenAI API Key
          </label>
          <div className="relative">
            <input
              type={showApiKey ? "text" : "password"}
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className={cn(
                "w-full px-4 py-2.5 pr-12 rounded-xl",
                "bg-white/5 border border-white/10",
                "text-white placeholder:text-slate-500",
                "focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50",
                "transition-all duration-300 font-mono text-sm"
              )}
            />
            <button
              onClick={() => setShowApiKey(!showApiKey)}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-lg text-slate-500 hover:text-slate-300 transition-colors"
            >
              {showApiKey ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>
          <p className="text-xs text-slate-500">
            Your API key is stored locally and never sent to our servers.
          </p>
        </div>
      </motion.div>

      {/* Preferences Section */}
      <motion.div variants={item} className="glass rounded-2xl p-6 space-y-5">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center">
            <Moon className="w-5 h-5 text-cyan-400" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-white">Preferences</h2>
            <p className="text-xs text-slate-400">
              Customize your experience
            </p>
          </div>
        </div>

        {/* Dark Mode Toggle */}
        <div className="flex items-center justify-between py-3 border-b border-white/5">
          <div className="flex items-center gap-3">
            <Moon className="w-4 h-4 text-slate-400" />
            <div>
              <p className="text-sm font-medium text-white">Dark Mode</p>
              <p className="text-xs text-slate-500">
                Toggle dark theme appearance
              </p>
            </div>
          </div>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={cn(
              "relative w-11 h-6 rounded-full transition-colors duration-300",
              darkMode ? "bg-blue-600" : "bg-slate-700"
            )}
          >
            <div
              className={cn(
                "absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-md transition-transform duration-300",
                darkMode ? "translate-x-[22px]" : "translate-x-0.5"
              )}
            />
          </button>
        </div>

        {/* Notifications Toggle */}
        <div className="flex items-center justify-between py-3">
          <div className="flex items-center gap-3">
            <Bell className="w-4 h-4 text-slate-400" />
            <div>
              <p className="text-sm font-medium text-white">Notifications</p>
              <p className="text-xs text-slate-500">
                Receive suggestions and activity updates
              </p>
            </div>
          </div>
          <button
            onClick={() => setNotifications(!notifications)}
            className={cn(
              "relative w-11 h-6 rounded-full transition-colors duration-300",
              notifications ? "bg-blue-600" : "bg-slate-700"
            )}
          >
            <div
              className={cn(
                "absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-md transition-transform duration-300",
                notifications ? "translate-x-[22px]" : "translate-x-0.5"
              )}
            />
          </button>
        </div>
      </motion.div>

      {/* Save Button */}
      <motion.div variants={item} className="flex justify-end pb-8">
        <button
          onClick={handleSave}
          className={cn(
            "flex items-center gap-2 px-6 py-2.5 rounded-xl font-medium text-white",
            "bg-gradient-to-r from-blue-600 to-purple-600",
            "shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40",
            "transition-all duration-300 hover:-translate-y-0.5",
            saved && "from-green-600 to-green-500"
          )}
        >
          {saved ? (
            <>
              <Check className="w-4 h-4" />
              Saved!
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              Save Changes
            </>
          )}
        </button>
      </motion.div>
    </motion.div>
  );
}
