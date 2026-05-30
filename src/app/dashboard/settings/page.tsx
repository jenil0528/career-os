"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { useUserCompat as useUser } from "@/lib/auth-shim";
import { useTheme } from "@/components/shared/ThemeProvider";
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
  Terminal,
} from "lucide-react";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" as const } },
};

export default function SettingsPage() {
  const { user } = useUser();
  const [showApiKey, setShowApiKey] = useState(false);

  // Lazy initialization from localStorage
  const [apiKey, setApiKey] = useState(() => {
    if (typeof window === "undefined") return "";
    try {
      const stored = localStorage.getItem("careeros_settings");
      if (stored) return JSON.parse(stored).apiKey || "";
    } catch { /* ignore */ }
    return "";
  });
  
  const { theme, toggleTheme } = useTheme();
  const isDarkMode = theme === "cyber";

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
        JSON.stringify({ apiKey, notifications })
      );
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch {
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-6 max-w-4xl p-6 md:p-8 font-body-md"
    >
      {/* Header */}
      <motion.div variants={item} className="border-b border-outline-variant pb-6">
        <h1 className="font-headline-lg text-headline-lg text-on-surface font-bold uppercase tracking-widest flex items-center gap-3">
          <Terminal className="w-8 h-8 text-primary" />
          System Configuration
        </h1>
        <p className="text-on-surface-variant font-mono-label text-sm mt-2 uppercase tracking-widest">
          Manage identity parameters and telemetry protocols
        </p>
      </motion.div>

      {/* Profile Section */}
      <motion.div variants={item} className="bg-surface-container-low border border-outline-variant rounded-none p-6 space-y-6 relative overflow-hidden shadow-[8px_8px_0px_0px_rgba(16,185,129,0.1)]">
        <div className="absolute top-0 right-0 p-2 opacity-10">
          <User className="w-32 h-32" />
        </div>
        
        <div className="flex items-center gap-3 border-b border-outline-variant pb-4 relative z-10">
          <div className="w-10 h-10 bg-primary/10 border border-primary/30 flex items-center justify-center text-primary">
            <User className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-on-surface uppercase tracking-widest">Executive Profile</h2>
            <p className="font-mono-label text-[10px] text-primary uppercase">Read-only identity metrics</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
          <div className="space-y-2">
            <label className="font-mono-label text-[10px] text-on-surface-variant uppercase tracking-widest flex items-center gap-2">
              <User className="w-3 h-3" /> Designated Name
            </label>
            <input
              type="text"
              value={user?.firstName && user?.lastName ? `${user.firstName} ${user.lastName}` : "Executive Guest"}
              readOnly
              className="w-full px-4 py-3 bg-surface-container border border-outline-variant text-on-surface cursor-not-allowed focus:outline-none font-bold"
            />
          </div>

          <div className="space-y-2">
            <label className="font-mono-label text-[10px] text-on-surface-variant uppercase tracking-widest flex items-center gap-2">
              <Mail className="w-3 h-3" /> Encrypted Comms (Email)
            </label>
            <input
              type="email"
              value={user?.primaryEmailAddress?.emailAddress ?? "guest@careeros.system"}
              readOnly
              className="w-full px-4 py-3 bg-surface-container border border-outline-variant text-on-surface cursor-not-allowed focus:outline-none font-mono"
            />
          </div>
        </div>
      </motion.div>

      {/* API Keys Section */}
      <motion.div variants={item} className="bg-surface-container-low border border-outline-variant rounded-none p-6 space-y-6 relative overflow-hidden shadow-[8px_8px_0px_0px_rgba(16,185,129,0.1)]">
        <div className="absolute top-0 right-0 p-2 opacity-10">
          <Key className="w-32 h-32" />
        </div>

        <div className="flex items-center gap-3 border-b border-outline-variant pb-4 relative z-10">
          <div className="w-10 h-10 bg-primary/10 border border-primary/30 flex items-center justify-center text-primary">
            <Key className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-on-surface uppercase tracking-widest">Security Credentials</h2>
            <p className="font-mono-label text-[10px] text-primary uppercase">Provider Access Keys</p>
          </div>
        </div>

        <div className="space-y-2 relative z-10 max-w-2xl">
          <label className="font-mono-label text-[10px] text-on-surface-variant uppercase tracking-widest flex items-center gap-2">
            <Shield className="w-3 h-3 text-primary" /> AI API Key (Gemini or OpenAI)
          </label>
          <div className="relative">
            <input
              type={showApiKey ? "text" : "password"}
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="sk-... or AIza... or nvapi-... or gsk_..."
              className={cn(
                "w-full px-4 py-3 pr-12 bg-surface-container-highest border border-outline-variant",
                "text-on-surface placeholder:text-on-surface-variant/50",
                "focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary",
                "transition-all font-mono text-sm"
              )}
            />
            <button
              onClick={() => setShowApiKey(!showApiKey)}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
            >
              {showApiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          <p className="font-mono-label text-[9px] text-primary mt-2 uppercase tracking-widest">
            <span className="text-error mr-1">WARNING:</span> Key is stored in local browser cache. Models will automatically switch based on the key type.
          </p>
        </div>
      </motion.div>

      {/* Preferences Section */}
      <motion.div variants={item} className="bg-surface-container-low border border-outline-variant rounded-none p-6 space-y-6 shadow-[8px_8px_0px_0px_rgba(16,185,129,0.1)]">
        <div className="flex items-center gap-3 border-b border-outline-variant pb-4">
          <div className="w-10 h-10 bg-primary/10 border border-primary/30 flex items-center justify-center text-primary">
            <Moon className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-on-surface uppercase tracking-widest">Interface Parameters</h2>
            <p className="font-mono-label text-[10px] text-primary uppercase">Telemetry and Visuals</p>
          </div>
        </div>

        <div className="max-w-2xl space-y-4">


          {/* Notifications Toggle */}
          <div className="flex items-center justify-between p-4 bg-surface-container border border-outline-variant hover:border-primary/50 transition-colors">
            <div className="flex items-center gap-4">
              <Bell className="w-5 h-5 text-on-surface-variant" />
              <div>
                <p className="font-bold text-sm text-on-surface uppercase tracking-widest">Telemetry Alerts</p>
                <p className="font-mono-label text-[10px] text-on-surface-variant mt-1 uppercase">Enable real-time push notifications</p>
              </div>
            </div>
            <button
              onClick={() => setNotifications(!notifications)}
              className={cn(
                "relative flex h-6 w-12 cursor-pointer items-center rounded-full p-1 transition-all duration-300 border",
                notifications ? "bg-primary border-primary shadow-[0_0_15px_rgba(59,130,246,0.4)]" : "bg-surface-container-highest border-outline-variant"
              )}
            >
              <motion.div
                className="h-4 w-4 rounded-full bg-white shadow-sm"
                layout
                transition={{
                  type: "spring",
                  stiffness: 700,
                  damping: 30,
                }}
                animate={{
                  x: notifications ? 22 : 0,
                }}
              />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Save Button */}
      <motion.div variants={item} className="flex justify-end pt-4 pb-12">
        <button
          onClick={handleSave}
          className={cn(
            "btn-primary flex items-center gap-2 px-8 py-4 font-bold uppercase tracking-widest transition-all",
            saved && "bg-green-600 border-green-500 text-white shadow-none"
          )}
        >
          {saved ? (
            <>
              <Check className="w-5 h-5" />
              Configuration Saved
            </>
          ) : (
            <>
              <Save className="w-5 h-5" />
              Apply Configuration
            </>
          )}
        </button>
      </motion.div>
    </motion.div>
  );
}
