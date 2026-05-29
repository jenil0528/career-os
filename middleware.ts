import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher(["/dashboard(.*)"]);

// --- Basic Application DoS Protection (Rate Limiting) ---
// Note: In-memory maps work per-server-instance. For global edge rate limiting, Redis (Upstash) is recommended.
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_API_REQUESTS = 30; // Max requests per minute

function applyRateLimit(req: any) {
  const ip = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "unknown_ip";
  const now = Date.now();
  
  const record = rateLimitMap.get(ip);
  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }
  
  if (record.count >= MAX_API_REQUESTS) {
    return false;
  }
  
  record.count++;
  return true;
}
// --------------------------------------------------------

export default clerkMiddleware(async (auth, req) => {
  // 1. DoS Protection: Apply rate limiting to all API routes
  if (req.nextUrl.pathname.startsWith("/api/")) {
    const isAllowed = applyRateLimit(req);
    if (!isAllowed) {
      return new NextResponse(
        JSON.stringify({ error: "Too Many Requests. Please slow down." }), 
        { status: 429, headers: { "Content-Type": "application/json", "Retry-After": "60" } }
      );
    }
  }

  // 2. Auth checks
  if (!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY) {
    return NextResponse.next();
  }

  if (isProtectedRoute(req)) {
    await auth.protect();
  }

  // Intercept the response to inject secure cookies
  const response = NextResponse.next();

  // Implement a secure session/tracking cookie as requested
  if (!req.cookies.has("careeros_session_id")) {
    response.cookies.set({
      name: "careeros_session_id",
      value: crypto.randomUUID(),
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: "/",
    });
  }

  return response;
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
