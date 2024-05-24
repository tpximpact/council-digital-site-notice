/**
 * @jest-environment node
 */
import { NextRequest, NextResponse } from "next/server";
import { validateUniformData } from "../../src/app/actions/uniformValidator";
import { ValidationResult } from "../../models/validationResult";
import {
  checkExistingReference,
  updateApplication,
  createApplication,
} from "../../src/app/actions/sanityClient";
import { verifyApiKey } from "../../src/app/lib/apiKey";
import { PUT } from "@/app/api/applications/uniform/route";
import { SanityDocument } from "next-sanity";

jest.mock("../../src/app/actions/sanityClient");
jest.mock("../../src/app/actions/uniformValidator");
jest.mock("../../src/app/lib/apiKey");

const validateUniformDataMock = validateUniformData as jest.MockedFunction<
  typeof validateUniformData
>;
const checkExistingReferenceMock =
  checkExistingReference as jest.MockedFunction<typeof checkExistingReference>;
const createApplicationMock = createApplication as jest.MockedFunction<
  typeof createApplication
>;
const verifyApiKeyMock = verifyApiKey as jest.MockedFunction<
  typeof verifyApiKey
>;

describe("Applications PUT endpoint", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return 200 for valid request", async () => {
    const mockRequest = {
      headers: {
        get: jest.fn().mockReturnValue("valid_key"),
      },
      json: jest.fn().mockResolvedValue([
        {
          "DCAPPL[REFVAL]": "1234/5678/A",
          "DCAPPL[BLPU_CLASS_DESC]": "This is a test description.",
          "DCAPPL[Application Type_D]": "Test type",
        },
      ]),
    } as unknown as NextRequest;

    validateUniformDataMock.mockResolvedValue({ errors: [], status: 200 });
    checkExistingReferenceMock.mockResolvedValue(null);
    createApplicationMock.mockResolvedValue(
      {} as SanityDocument<Record<string, any>>,
    );
    verifyApiKeyMock.mockReturnValue(true);

    const response = (await PUT(mockRequest)) as NextResponse;

    expect(response.status).toBe(200);
  });

  it("should return 401 for invalid API key", async () => {
    const mockRequest = {
      headers: {
        get: jest.fn().mockReturnValue("invalid_key"),
      },
    } as unknown as NextRequest;

    verifyApiKeyMock.mockReturnValue(false);

    const response = (await PUT(mockRequest)) as NextResponse;

    expect(response.status).toBe(401);
  });

  it("should return 400 for invalid request body", async () => {
    const mockRequest = {
      headers: {
        get: jest.fn().mockReturnValue("valid_key"),
      },
      json: jest.fn().mockResolvedValue("invalid_data"),
    } as unknown as NextRequest;

    verifyApiKeyMock.mockReturnValue(true);

    const response = (await PUT(mockRequest)) as NextResponse;

    expect(response.status).toBe(400);
  });

  it("should return 400 when all applications fail validation", async () => {
    const requestBody = [
      {
        "DCAPPL[REFVAL]": "",
        "DCAPPL[BLPU_CLASS_DESC]": "Residential",
        "DCAPPL[Application Type_D]": "New Build",
      },
      {
        "DCAPPL[REFVAL]": "",
        "DCAPPL[BLPU_CLASS_DESC]": "Commercial",
        "DCAPPL[Application Type_D]": "Extension",
      },
    ];

    const mockRequest = {
      headers: {
        get: jest.fn().mockReturnValue("valid_key"),
      },
      json: jest.fn().mockResolvedValue(requestBody),
    } as unknown as NextRequest;

    validateUniformDataMock.mockImplementation(() => {
      return Promise.resolve({
        errors: [{ message: "Invalid application data" }],
        status: 400,
      });
    });

    verifyApiKeyMock.mockReturnValue(true);

    const response = (await PUT(mockRequest)) as NextResponse;

    expect(response.status).toBe(400);
  });

  it("should return 207 for successful and failed applications", async () => {
    const requestBody = [
      {
        "DCAPPL[REFVAL]": "1234/5678/A",
        "DCAPPL[BLPU_CLASS_DESC]": "Test description",
        "DCAPPL[Application Type_D]": "New Build",
      },
      {
        "DCAPPL[REFVAL]": "",
        "DCAPPL[BLPU_CLASS_DESC]": "Test description",
        "DCAPPL[Application Type_D]": "Extension",
      },
    ];

    const mockRequest = {
      headers: {
        get: jest.fn().mockReturnValue("valid_key"),
      },
      json: jest.fn().mockResolvedValue(requestBody),
    } as unknown as NextRequest;

    validateUniformDataMock.mockImplementation((data) => {
      if (data["DCAPPL[REFVAL]"] === "67890") {
        return Promise.resolve({
          errors: [{ message: "Invalid application data" }],
          status: 400,
        });
      }
      return Promise.resolve({ errors: [], status: 200 });
    });
    const checkExistingReferenceMock =
      checkExistingReference as jest.MockedFunction<
        typeof checkExistingReference
      >;
    checkExistingReferenceMock.mockResolvedValue(null);
    createApplicationMock.mockResolvedValue(
      {} as SanityDocument<Record<string, any>>,
    );

    verifyApiKeyMock.mockReturnValue(true);

    const response = (await PUT(mockRequest)) as NextResponse;

    expect(response.status).toBe(207);
  });
});
