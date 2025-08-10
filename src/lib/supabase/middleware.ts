import { type NextRequest } from "next/server";
import { createClient } from "./server";
import { SignJWT, jwtVerify, type JWTPayload } from "jose";

const SECRET = process.env.JWT_SECRET;

export async function signJWT(payload: JWTPayload): Promise<string> {
  const iat = Math.floor(Date.now() / 1000);
  const exp = iat + 60 * 60; // one hour

  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setExpirationTime(exp)
    .setIssuedAt(iat)
    .setNotBefore(iat)
    .sign(new TextEncoder().encode(SECRET));
}

export async function verifyJWT(token: string): Promise<JWTPayload> {
  const { payload } = await jwtVerify(token, new TextEncoder().encode(SECRET));
  return payload;
}

export async function parseStudentIdFromCookies(request: NextRequest) {
  const sessionToken = request.cookies.get("session-token")?.value;
  if (!sessionToken) return;

  let jwtPayload: JWTPayload;

  try {
    jwtPayload = await verifyJWT(sessionToken);
  } catch (error) {
    return console.log("An error occured: ", error);
  }

  if (!(jwtPayload instanceof Object) || !("nim" in jwtPayload)) return;
  if (typeof jwtPayload.nim === "string") {
    const supabase = await createClient();
    const { data: student, error } = await supabase
      .from("users")
      .select("id,is_admin")
      .eq("nim", jwtPayload.nim)
      .single();

    if (error || !student) return;
    return { nim: jwtPayload.nim, is_admin: student.is_admin };
  }
}

export async function printRequest(request: NextRequest,parsedCookies?: Record<string, string | undefined> | null | void) {
  console.log("\n========================================================");
  console.log(`${request.method} ${request.nextUrl.pathname}:`);
  console.log(`Student NIM: ${parsedCookies?.nim || "not logged-in"}`);
  // Print the request body if available
  if (request.body) {
    const reader = request.body.getReader();
    const decoder = new TextDecoder();
    let body = "";
    let done = false;
    while (!done) {
      const { value, done: doneReading } = await reader.read();
      if (value) {
        body += decoder.decode(value, { stream: true });
      }
      done = doneReading;
    }
    console.log(`Request body content: ${body}`);
  } else {
    console.log("Request body: <empty>");
  }

  console.log("\n========================================================\n");
}
