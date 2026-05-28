"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import * as Clerk from "@clerk/nextjs";
import { Sparkles } from "lucide-react";

// Check if Clerk is active
const isClerkActive = !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

// Local Mock Types
interface MockUser {
  id: string;
  firstName: string;
  fullName: string;
  emailAddresses: { emailAddress: string }[];
  imageUrl: string;
}

// Local mock context
const MockAuthContext = createContext<{
  user: MockUser | null;
  isLoaded: boolean;
  signOut: () => void;
}>({
  user: null,
  isLoaded: false,
  signOut: () => {},
});

export function MockAuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<MockUser | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Simulate loading the simulated user from localStorage
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("careeros_mock_user");
      if (stored) {
        try {
          setUser(JSON.parse(stored));
        } catch {
          localStorage.removeItem("careeros_mock_user");
        }
      } else {
        const defaultUser = {
          id: "demo-user-123",
          firstName: "Alex",
          fullName: "Alex Johnson",
          emailAddresses: [{ emailAddress: "alex@careeros.ai" }],
          imageUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=256",
        };
        setUser(defaultUser);
        localStorage.setItem("careeros_mock_user", JSON.stringify(defaultUser));
      }
      setIsLoaded(true);
    }
  }, []);

  const signOut = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("careeros_mock_user");
      setUser(null);
      window.location.href = "/";
    }
  };

  return (
    <MockAuthContext.Provider value={{ user, isLoaded, signOut }}>
      {children}
    </MockAuthContext.Provider>
  );
}

// Unified Provider
export function SharedAuthProvider({ children }: { children: React.ReactNode }) {
  if (isClerkActive) {
    return <Clerk.ClerkProvider>{children}</Clerk.ClerkProvider>;
  }
  return <MockAuthProvider>{children}</MockAuthProvider>;
}

// Unified useUser hook
export function useUserCompat() {
  // If Clerk is not active, calling real hooks might crash if ClerkProvider isn't parent,
  // but nextjs pre-evaluates or executes inside the hook.
  // We conditionally call Clerk.useUser only if clerk is active.
  const isServer = typeof window === "undefined";
  
  if (isClerkActive) {
    try {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      return Clerk.useUser();
    } catch (e) {
      console.warn("Clerk useUser failed, falling back to mock", e);
    }
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const mockContext = useContext(MockAuthContext);
  return {
    isLoaded: mockContext.isLoaded,
    isSignedIn: !!mockContext.user,
    user: mockContext.user,
  };
}

// Unified useAuth hook
export function useAuthCompat() {
  if (isClerkActive) {
    try {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      return Clerk.useAuth();
    } catch (e) {
      console.warn("Clerk useAuth failed, falling back to mock", e);
    }
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const mockContext = useContext(MockAuthContext);
  return {
    isLoaded: mockContext.isLoaded,
    isSignedIn: !!mockContext.user,
    userId: mockContext.user?.id || null,
    getToken: async () => "mock-token-for-demo-mode",
    signOut: mockContext.signOut,
  };
}

// Mock/Unified SignOutButton
export function SignOutButtonCompat({ children }: { children: React.ReactNode }) {
  const mockContext = useContext(MockAuthContext);

  if (isClerkActive) {
    return <Clerk.SignOutButton>{children}</Clerk.SignOutButton>;
  }

  const handleSignOut = () => {
    mockContext.signOut();
  };

  if (React.isValidElement(children)) {
    const childElement = children as React.ReactElement<any>;
    return React.cloneElement(childElement, {
      onClick: (e: any) => {
        if (childElement.props.onClick) childElement.props.onClick(e);
        handleSignOut();
      }
    });
  }

  return <span onClick={handleSignOut} className="cursor-pointer">{children}</span>;
}

// Mock/Unified UserButton
export function UserButtonCompat(props: any) {
  const mockContext = useContext(MockAuthContext);

  if (isClerkActive) {
    return <Clerk.UserButton {...props} />;
  }

  return (
    <button 
      onClick={() => {
        if (confirm("Are you sure you want to sign out?")) {
          mockContext.signOut();
        }
      }}
      className="h-9 w-9 overflow-hidden rounded-full border border-white/10 hover:border-white/30 transition shadow-lg hover:shadow-blue-500/10 cursor-pointer"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img 
        src={mockContext.user?.imageUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=256"} 
        alt="Avatar" 
        className="h-full w-full object-cover" 
      />
    </button>
  );
}

// Unified/Mock SignIn component
export function SignInCompat(props: any) {
  const { useRouter } = require("next/navigation");
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const router = useRouter();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [email, setEmail] = useState("");
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [password, setPassword] = useState("");
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [isLoading, setIsLoading] = useState(false);

  if (isClerkActive) {
    return <Clerk.SignIn {...props} />;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      // Save mock user
      const defaultUser = {
        id: "demo-user-123",
        firstName: "Alex",
        fullName: "Alex Johnson",
        emailAddresses: [{ emailAddress: email }],
        imageUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=256",
      };
      localStorage.setItem("careeros_mock_user", JSON.stringify(defaultUser));
      // Force reload or route
      window.location.href = "/dashboard";
    }, 1000);
  };

  return (
    <div className="bg-slate-900/80 backdrop-blur-xl border border-white/10 shadow-2xl rounded-2xl w-full max-w-full p-8">
      <div className="mb-6">
        <h2 className="text-white font-[family-name:var(--font-space-grotesk)] text-2xl font-bold mb-1">
          Sign in
        </h2>
        <p className="text-slate-400 text-sm">
          to continue to CareerOS (Simulated Auth)
        </p>
      </div>

      {/* Demo Credentials Helper Card */}
      <div className="mb-6 rounded-xl border border-blue-500/25 bg-blue-500/5 p-4 text-xs relative overflow-hidden group">
        <div className="absolute top-0 right-0 bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded-bl-lg font-bold text-[9px] uppercase tracking-wider">Demo Mode</div>
        <p className="font-semibold text-slate-200 mb-1 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-blue-400 animate-pulse" />
          Hackathon Quick Login
        </p>
        <p className="text-slate-400 leading-relaxed mb-3">
          No sign-up needed. Click the button below to log in instantly.
        </p>
        <div className="space-y-1 text-slate-300 font-mono mb-3">
          <div><span className="text-slate-500">Email:</span> alex@careeros.ai</div>
          <div><span className="text-slate-500">Password:</span> admin123</div>
        </div>
        <button 
          type="button"
          onClick={(e) => {
            setEmail("alex@careeros.ai");
            setPassword("admin123");
            // Trigger submit immediately
            const form = e.currentTarget.closest("form") || document.querySelector("form");
            if (form) {
              setTimeout(() => {
                form.requestSubmit();
              }, 100);
            }
          }}
          className="w-full bg-blue-500/15 hover:bg-blue-500/25 text-blue-400 border border-blue-500/30 rounded-lg py-2 font-bold cursor-pointer transition-colors flex items-center justify-center gap-1.5"
        >
          ⚡ Auto-Fill & Sign In
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
            Email address
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-black/50 border border-white/10 text-white rounded-lg px-4 py-2.5 focus:border-blue-500 transition-colors outline-none text-sm"
            required
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-black/50 border border-white/10 text-white rounded-lg px-4 py-2.5 focus:border-blue-500 transition-colors outline-none text-sm"
            required
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full mt-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-none shadow-lg shadow-blue-500/20 font-semibold rounded-lg py-2.5 text-sm transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
        >
          {isLoading ? (
            <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            "Continue"
          )}
        </button>
      </form>

      <div className="mt-6 border-t border-white/10 pt-4 text-center">
        <p className="text-xs text-slate-400">
          Don&apos;t have an account?{" "}
          <a href="/sign-up" className="text-blue-400 hover:text-blue-300 transition-colors font-medium">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}

// Unified/Mock SignUp component
export function SignUpCompat(props: any) {
  const { useRouter } = require("next/navigation");
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const router = useRouter();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [name, setName] = useState("Alex Johnson");
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [email, setEmail] = useState("alex@careeros.ai");
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [password, setPassword] = useState("••••••••");
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [isLoading, setIsLoading] = useState(false);

  if (isClerkActive) {
    return <Clerk.SignUp {...props} />;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      // Save mock user
      const defaultUser = {
        id: "demo-user-123",
        firstName: name.split(" ")[0] || "Alex",
        fullName: name,
        emailAddresses: [{ emailAddress: email }],
        imageUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=256",
      };
      localStorage.setItem("careeros_mock_user", JSON.stringify(defaultUser));
      // Force reload or route
      window.location.href = "/dashboard";
    }, 1000);
  };

  return (
    <div className="bg-slate-900/80 backdrop-blur-xl border border-white/10 shadow-2xl rounded-2xl w-full max-w-full p-8">
      <div className="mb-6">
        <h2 className="text-white font-[family-name:var(--font-space-grotesk)] text-2xl font-bold mb-1">
          Create your account
        </h2>
        <p className="text-slate-400 text-sm">
          to continue to CareerOS (Simulated Auth)
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
            Full Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-black/50 border border-white/10 text-white rounded-lg px-4 py-2.5 focus:border-blue-500 transition-colors outline-none text-sm"
            required
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
            Email address
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-black/50 border border-white/10 text-white rounded-lg px-4 py-2.5 focus:border-blue-500 transition-colors outline-none text-sm"
            required
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-black/50 border border-white/10 text-white rounded-lg px-4 py-2.5 focus:border-blue-500 transition-colors outline-none text-sm"
            required
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full mt-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-none shadow-lg shadow-blue-500/20 font-semibold rounded-lg py-2.5 text-sm transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
        >
          {isLoading ? (
            <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            "Continue"
          )}
        </button>
      </form>

      <div className="mt-6 border-t border-white/10 pt-4 text-center">
        <p className="text-xs text-slate-400">
          Already have an account?{" "}
          <a href="/sign-in" className="text-blue-400 hover:text-blue-300 transition-colors font-medium">
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
}
