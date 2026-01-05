import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { lng } = (await request.json()) as { lng?: string };
  const response = NextResponse.json({ ok: true });

  if (lng) {
    response.cookies.set({
      name: "i18nextLng",
      value: lng,
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
    });
  }

  return response;
}
