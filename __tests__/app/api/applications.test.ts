/**
 * @jest-environment node
 */
import { PUT } from "@/app/api/applications/route";
import { NextRequest } from "next/server";

jest.mock("@/actions/api/processApplication", () => ({
  processMultipleApplications: jest.fn(),
}));
jest.mock("@/actions/api/checkApiAccess", () => ({
  checkApiAccess: jest.fn(),
}));
jest.mock("@/schemas/planningApplication", () => ({
  planningApplicationsSchema: {
    safeParse: jest.fn(),
  },
}));

const mockJson = jest.fn();
jest.mock("next/server", () => ({
  NextResponse: { json: (...args: any[]) => mockJson(...args) },
  NextRequest: jest.requireActual("next/server").NextRequest,
}));

describe("PUT /api/applications", () => {
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

  it("returns 401 if API access is denied", async () => {
    const { checkApiAccess } = require("@/actions/api/checkApiAccess");
    checkApiAccess.mockResolvedValue({
      status: 401,
      message: "Invalid API key",
    });

    const req = makeRequest([{ applicationNumber: "A1" }], "bad-key");
    await PUT(req);

    expect(mockJson).toHaveBeenCalledWith(
      expect.objectContaining({
        _id: null,
        applicationNumber: null,
        planningId: null,
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
      planningApplicationsSchema,
    } = require("@/schemas/planningApplication");
    planningApplicationsSchema.safeParse.mockReturnValue({
      success: false,
      error: {
        errors: [
          { path: ["0", "name"], message: "Required" },
          { path: ["1", "address"], message: "Required" },
        ],
      },
    });

    const req = makeRequest([
      { applicationNumber: "A1" },
      { applicationNumber: "A2" },
    ]);
    await PUT(req);

    expect(mockJson).toHaveBeenCalledWith(
      expect.objectContaining({
        _id: null,
        applicationNumber: null,
        planningId: null,
        success: false,
        error: expect.stringContaining("0.name: Required; 1.address: Required"),
      }),
      { status: 400 },
    );
  });

  it("returns 400 if all applications fail to process", async () => {
    const { checkApiAccess } = require("@/actions/api/checkApiAccess");
    checkApiAccess.mockResolvedValue(null);

    const {
      planningApplicationsSchema,
    } = require("@/schemas/planningApplication");
    planningApplicationsSchema.safeParse.mockReturnValue({
      success: true,
      data: [{ applicationNumber: "A1" }, { applicationNumber: "A2" }],
    });

    const {
      processMultipleApplications,
    } = require("@/actions/api/processApplication");
    processMultipleApplications.mockResolvedValue([
      { success: false },
      { success: false },
    ]);

    const req = makeRequest([
      { applicationNumber: "A1" },
      { applicationNumber: "A2" },
    ]);
    await PUT(req);

    expect(mockJson).toHaveBeenCalledWith(
      expect.objectContaining({
        _id: null,
        applicationNumber: null,
        planningId: null,
        success: false,
        error: "All applications failed validation",
      }),
      { status: 400 },
    );
  });

  it("returns 200 and results if at least one application succeeds", async () => {
    const { checkApiAccess } = require("@/actions/api/checkApiAccess");
    checkApiAccess.mockResolvedValue(null);

    const {
      planningApplicationsSchema,
    } = require("@/schemas/planningApplication");
    planningApplicationsSchema.safeParse.mockReturnValue({
      success: true,
      data: [{ applicationNumber: "A1" }, { applicationNumber: "A2" }],
    });

    const {
      processMultipleApplications,
    } = require("@/actions/api/processApplication");
    processMultipleApplications.mockResolvedValue([
      { _id: "id1", applicationNumber: "A1", success: true },
      { _id: "id2", applicationNumber: "A2", success: false },
    ]);

    const req = makeRequest([
      { applicationNumber: "A1" },
      { applicationNumber: "A2" },
    ]);
    await PUT(req);

    expect(mockJson).toHaveBeenCalledWith(
      [
        expect.objectContaining({
          _id: "id1",
          applicationNumber: "A1",
          success: true,
        }),
        expect.objectContaining({
          _id: "id2",
          applicationNumber: "A2",
          success: false,
        }),
      ],
      { status: 200 },
    );
  });
});
