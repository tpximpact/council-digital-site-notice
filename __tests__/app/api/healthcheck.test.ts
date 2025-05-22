/**
 * @jest-environment node
 */
import { GET } from "@/app/api/healthcheck/route";
import { NextRequest, NextResponse } from "next/server";

describe("GET /api/healthcheck", () => {
  it("returns a 200 status with 'Status ok' message", async () => {
    const response = await GET();

    expect(response).toBeInstanceOf(NextResponse);
    expect(response.status).toBe(200);

    const text = await response.text();
    expect(text).toBe("Status ok");
  });
});
