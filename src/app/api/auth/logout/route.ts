import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request: NextRequest) {
  try {
    const res = NextResponse.redirect(
      new URL("/", request.nextUrl.origin)
    )
    res.cookies.set("session-token", "", {
      expires: 10,
    });
    return res
  } catch (err) {
    console.error("Logout failed:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
