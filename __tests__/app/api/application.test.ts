/**
 * @jest-environment node
 */
import { PUT } from "@/app/api/application/route";
import { NextRequest } from "next/server";

jest.mock("@/actions/api/processApplication", () => ({
  processApplication: jest.fn(),
}));
jest.mock("@/actions/api/checkApiAccess", () => ({
  checkApiAccess: jest.fn(),
}));
jest.mock("@/schemas/planningApplication", () => ({
  planningApplicationSchema: {
    safeParse: jest.fn(),
  },
}));

const mockJson = jest.fn();
jest.mock("next/server", () => ({
  NextResponse: { json: (...args: any[]) => mockJson(...args) },
  NextRequest: jest.requireActual("next/server").NextRequest,
}));

describe("PUT /api/application", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockJson.mockClear();
  });

  function makeRequest(body: any, apiKey: string | null = "valid-key") {
    return {
      json: async () => body,
      headers: {
        get: (key: string) => (key === "x-api-key" ? apiKey : undefined),
      },
    } as unknown as NextRequest;
  }

  it("returns 400 if API access is denied", async () => {
    const { checkApiAccess } = require("@/actions/api/checkApiAccess");
    checkApiAccess.mockResolvedValue({
      status: 401,
      message: "Invalid API key",
    });

    const req = makeRequest({ applicationNumber: "A1" }, "bad-key");
    await PUT(req);

    expect(mockJson).toHaveBeenCalledWith(
      expect.objectContaining({
        _id: null,
        applicationNumber: "A1",
        success: false,
        error: "Invalid API key",
      }),
      expect.objectContaining({ status: 401 }),
    );
  });

  it("returns 400 if validation fails", async () => {
    const { checkApiAccess } = require("@/actions/api/checkApiAccess");
    checkApiAccess.mockResolvedValue(null);

    const {
      planningApplicationSchema,
    } = require("@/schemas/planningApplication");
    planningApplicationSchema.safeParse.mockReturnValue({
      success: false,
      error: {
        errors: [
          { path: ["name"], message: "Required" },
          { path: ["address"], message: "Required" },
        ],
      },
    });

    const req = makeRequest({ applicationNumber: "A1" });
    await PUT(req);

    expect(mockJson).toHaveBeenCalledWith(
      expect.objectContaining({
        _id: null,
        applicationNumber: "A1",
        success: false,
        error: expect.stringContaining("name: Required; address: Required"),
      }),
      { status: 400 },
    );
  });

  it("returns 200 if processApplication succeeds", async () => {
    const { checkApiAccess } = require("@/actions/api/checkApiAccess");
    checkApiAccess.mockResolvedValue(null);

    const {
      planningApplicationSchema,
    } = require("@/schemas/planningApplication");
    planningApplicationSchema.safeParse.mockReturnValue({
      success: true,
      data: { applicationNumber: "A1" },
    });

    const { processApplication } = require("@/actions/api/processApplication");
    processApplication.mockResolvedValue({
      _id: "id1",
      applicationNumber: "A1",
      planningId: "P1",
      success: true,
      message: "created",
    });

    const req = makeRequest({ applicationNumber: "A1" });
    await PUT(req);

    expect(mockJson).toHaveBeenCalledWith(
      expect.objectContaining({
        _id: "id1",
        applicationNumber: "A1",
        planningId: "P1",
        success: true,
        message: "created",
      }),
      { status: 200 },
    );
  });

  it("returns 400 if processApplication fails", async () => {
    const { checkApiAccess } = require("@/actions/api/checkApiAccess");
    checkApiAccess.mockResolvedValue(null);

    const {
      planningApplicationSchema,
    } = require("@/schemas/planningApplication");
    planningApplicationSchema.safeParse.mockReturnValue({
      success: true,
      data: { applicationNumber: "A1" },
    });

    const { processApplication } = require("@/actions/api/processApplication");
    processApplication.mockResolvedValue({
      _id: null,
      applicationNumber: "A1",
      planningId: null,
      success: false,
      message: "not updated",
      error: "Some error",
    });

    const req = makeRequest({ applicationNumber: "A1" });
    await PUT(req);

    expect(mockJson).toHaveBeenCalledWith(
      expect.objectContaining({
        _id: null,
        applicationNumber: "A1",
        planningId: null,
        success: false,
        message: "not updated",
        error: "Some error",
      }),
      { status: 400 },
    );
  });
});
