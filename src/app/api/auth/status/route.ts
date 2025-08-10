import { NextRequest, NextResponse } from "next/server";
import { verifyJWT } from "@/app/(app)/lib/supabase/middleware";

export async function GET(request: NextRequest) {
  try {
    const sessionToken = request.cookies.get("session-token")?.value;

    if (!sessionToken) {
      return NextResponse.json(
        { isAuthenticated: false },
        { status: 401 }
      );
    }

    const payload = await verifyJWT(sessionToken);
    
    if (!payload || !payload.nim) {
      return NextResponse.json(
        { isAuthenticated: false },
        { status: 401 }
      );
    }

    return NextResponse.json({
      isAuthenticated: true,
      nim: payload.nim,
    });
  } catch (error) {
    console.error("Auth status check error:", error);
    return NextResponse.json(
      { isAuthenticated: false },
      { status: 401 }
    );
  }
}
