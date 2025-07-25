import { NextResponse, type NextRequest } from "next/server";
import {
  parseStudentIdFromCookies,
  printRequest,
  signJWT,
} from "@/app/lib/supabase/middleware";

const protectedRoutes = [
  { route: "/admin", method: ["get", "post", "delete", "delete"] },
  { route: "/api/data/assignments", method: ["post", "delete", "delete"] },
  { route: "/api/data/assignmentGroups", method: ["post", "delete"] },
];

const loginPageRoutes = ["/auth", "/adminLogin"];

function isRouteProtected(request: NextRequest) {
  return protectedRoutes.some(
    (e) => {
      if (!e.method.includes(request.method.toLowerCase())) return false
      const path = request.nextUrl.pathname.slice(1).split('/')
      const ref = e.route.slice(1).split('/')
      for (let i = 0; i < ref.length; i++) {
        if (path[i] !== ref[i]) return false
      }
      return true
    }
  );
}

function isRouteInLoginPage(request: NextRequest) {
  return loginPageRoutes.some((e) => request.nextUrl.pathname.startsWith(e));
}

export async function middleware(request: NextRequest) {
  const parsedCookies = await parseStudentIdFromCookies(request);

  printRequest(request, parsedCookies);

  const nextResponse = NextResponse.next({ request });
  if (parsedCookies && parsedCookies.nim) {
    nextResponse.cookies.set("session-token", await signJWT(parsedCookies), {
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 3),
    });
    nextResponse.headers.set("x-student-id", parsedCookies.nim);
  } else {
    request.headers.set("x-student-id", "");
    nextResponse.cookies.set("session-token", "", { expires: 1 });
  }

  if (
    isRouteProtected(request)
    // request.nextUrl.pathname.startsWith("/adminLogin") ||
    // request.nextUrl.pathname.startsWith("/auth") ||
    // request.nextUrl.pathname.startsWith("/admin") ||
    // (request.nextUrl.pathname.startsWith("/api/data/assignments") &&
    //   request.method.toLowerCase() === "post") ||
    // (request.nextUrl.pathname.startsWith("/api/data/assignments") &&
    //   request.method.toLowerCase() === "put") ||
    // (request.nextUrl.pathname.startsWith("/api/data/assignments") &&
    //   request.method.toLowerCase() === "delete") ||
    // (request.nextUrl.pathname.startsWith("/api/data/assignmentGroups") &&
    //   request.method.toLowerCase() === "post") ||
    // (request.nextUrl.pathname.startsWith("/api/data/assignmentGroups") &&
    //   request.method.toLowerCase() === "delete")
  ) {
    console.log('test==========================')
    if (
      parsedCookies &&
      typeof parsedCookies.nim === "string" &&
      parsedCookies.nim.length !== 0 &&
      parsedCookies.is_admin
    )
      return nextResponse;
    else {
      const url = request.nextUrl.clone();
      url.pathname = "/";
      return NextResponse.redirect(url);
    }
  } else if (isRouteInLoginPage(request)) {
    if (
      !parsedCookies ||
      typeof parsedCookies.nim !== "string" ||
      parsedCookies.nim.length === 0
    )
      return nextResponse;
    else {
      const url = request.nextUrl.clone();
      url.pathname = "/";
      return NextResponse.redirect(url);
    }
  } else return nextResponse;
}

export const config = {
  matcher: ["/:path*"],
};
