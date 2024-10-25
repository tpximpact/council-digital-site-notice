/**
 * @jest-environment node
 */
import { NextRequest, NextResponse } from "next/server";
import {
  validateUniformData,
  applicationNumberValidation,
  isUniformIntegrationEnabled,
} from "../../src/app/actions/uniformValidator";
import {
  checkExistingReference,
  createApplication,
} from "../../src/app/actions/sanityClient";
import { verifyApiKey } from "../../src/app/lib/apiKey";
import { PUT } from "@/app/api/application/uniform/route";
import { SanityDocument } from "next-sanity";
import { generateUniformData } from "../../mockdata/mockData";

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
const applicationNumberValidationMock =
  applicationNumberValidation as jest.MockedFunction<
    typeof applicationNumberValidation
  >;
const isUniformIntegrationEnabledMock =
  isUniformIntegrationEnabled as jest.MockedFunction<
    typeof isUniformIntegrationEnabled
  >;

describe("Applications PUT endpoint", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return 403 for uniformAPI not selected", async () => {
    const mockRequest = {
      headers: {
        get: jest.fn().mockReturnValue("valid_key"),
      },
      json: jest.fn().mockResolvedValue(generateUniformData()),
    } as unknown as NextRequest;
    isUniformIntegrationEnabledMock.mockResolvedValue(false);

    const response = (await PUT(mockRequest)) as NextResponse;

    expect(response.status).toBe(403);
  });

  it("should return 200 for valid request", async () => {
    const mockRequest = {
      headers: {
        get: jest.fn().mockReturnValue("valid_key"),
      },
      json: jest.fn().mockResolvedValue(generateUniformData()),
    } as unknown as NextRequest;

    isUniformIntegrationEnabledMock.mockResolvedValue(true);
    validateUniformDataMock.mockResolvedValue({ errors: [], status: 200 });
    applicationNumberValidationMock.mockResolvedValue({
      errors: [],
      status: 200,
    });
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

    isUniformIntegrationEnabledMock.mockResolvedValue(true);
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

    isUniformIntegrationEnabledMock.mockResolvedValue(true);
    verifyApiKeyMock.mockReturnValue(true);

    const response = (await PUT(mockRequest)) as NextResponse;

    expect(response.status).toBe(400);
  });

  it("should return 400 when application fails validation", async () => {
    const { applicationNumber, ...rest } = generateUniformData();
    const requestBody = rest;

    const mockRequest = {
      headers: {
        get: jest.fn().mockReturnValue("valid_key"),
      },
      json: jest.fn().mockResolvedValue(requestBody),
    } as unknown as NextRequest;

    validateUniformDataMock.mockResolvedValue({
      errors: [{ message: "Invalid application data" }],
      status: 400,
    });

    isUniformIntegrationEnabledMock.mockResolvedValue(true);
    verifyApiKeyMock.mockReturnValue(true);

    const response = (await PUT(mockRequest)) as NextResponse;

    expect(response.status).toBe(400);
  });
});
