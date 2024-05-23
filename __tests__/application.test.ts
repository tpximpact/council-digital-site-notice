/**
 * @jest-environment node
 */
import {
  createApplication,
  checkExistingReference,
  updateApplication,
} from "@/app/actions/sanityClient";
import { validateUniformData } from "@/app/actions/uniformValidator";
import { verifyApiKey } from "../src/app/lib/apiKey";
import { PUT } from "@/app/api/application/uniform/route";
import { NextRequest, NextResponse } from "next/server";

jest.mock("../src/app/actions/sanityClient");
jest.mock("../src/app/actions/uniformValidator");
jest.mock("../src/app/lib/apiKey");

// Define mock function types
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

const updateApplicationMock = updateApplication as jest.MockedFunction<
  typeof updateApplication
>;

describe("Applications API", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return 401 if incorrect api key", async () => {
    const req = {
      headers: {
        get: jest.fn().mockReturnValue("invalid_key"),
      },
    } as unknown as NextRequest;

    const mockedResponse = {
      json: jest.fn(),
    };

    NextResponse.json = jest.fn().mockReturnValue(mockedResponse);

    verifyApiKeyMock.mockReturnValue(false);

    const result = await PUT(req);

    expect(result).toBe(mockedResponse);
    expect(NextResponse.json).toBeCalledWith("Invalid API key", {
      status: 401,
    });
  });

  it("should return 400 if validation errors occur", async () => {
    // This data represents your mocked req.nextUrl.searchParams

    const mockRequest = {
      headers: {
        get: jest.fn().mockReturnValue("test_key"),
      },
      nextUrl: {
        searchParams: new URLSearchParams("wrong_data"),
      },
    } as unknown as NextRequest;

    const mockedResponse = {
      json: jest.fn(),
    };

    NextResponse.json = jest.fn().mockReturnValue(mockedResponse);

    validateUniformDataMock.mockResolvedValue({
      errors: ["Validation Error"],
      status: 400,
    });
    const result = await PUT(mockRequest);
    expect(result).toEqual(mockedResponse);

    // verifyApiKeyMock.mockReturnValue(true);
    // const errors = {
    //   status: 400,
    //   errors: ["Invalid reference", "Invalid description"],
    // };
    // validateUniformDataMock.mockResolvedValue(errors);

    // const result = (await PUT(mockRequest)) as NextResponse;

    // expect(result).toBe(mockedResponse);
    // expect(NextResponse.json).toBeCalledWith("Invalid API key", {
    //   status: 400,
    // });
    // const errors = {
    //   status: 400,
    //   errors: ["Invalid reference", "Invalid description"],
    // };
    // validatePlanningParams.mockResolvedValue(errors);
    // verifyApiKey.mockReturnValue(true);

    // await handler(req, res);

    // expect(validatePlanningParams).toHaveBeenCalledWith(req.body);
    // expect(result.status).toHaveBeenCalledWith(400);
    // expect(NextResponse.json).toHaveBeenCalledWith({
    //   errors: ["Invalid reference", "Invalid description"],
    //   status: 400,
    // });
  });

  it("should create a new application and return 200 if all parameters are valid", async () => {
    const searchParams = {
      applicationNumber: "AAA_BBB_CCC_DDD",
      description: "Sample description",
      isActive: "true",
      _type: "planning-application",
    };

    const req = {
      headers: {
        get: jest.fn().mockReturnValue("test_key"),
      },
      nextUrl: {
        searchParams: new URLSearchParams(
          "applicationNumber=AAA_BBB_CCC_DDD&description=Sample description&isActive=true&_type=planning-application",
        ),
      },
    } as unknown as NextRequest;

    const errors = { status: 200, errors: [] };
    validateUniformDataMock.mockResolvedValue(errors);
    verifyApiKeyMock.mockReturnValue(true);
    // checkExistingReferenceMock.mockReturnValue(null);
    createApplicationMock.mockResolvedValue(searchParams);

    const mockedResponse = {
      json: jest.fn(),
    };
    NextResponse.json = jest.fn().mockReturnValue(mockedResponse);

    await PUT(req);

    expect(validateUniformDataMock).toHaveBeenCalledWith(searchParams);
    expect(createApplication).toHaveBeenCalledWith({
      applicationNumber: "AAA_BBB_CCC_DDD",
      description: "Sample description",
      isActive: "true",
      _type: "planning-application",
    });
    // expect(res.status).toHaveBeenCalledWith(200);
    expect(NextResponse.json).toHaveBeenCalledWith({
      data: { success: ["Application AAA_BBB_CCC_DDD created"] },
    });
  });

  it("should update application if it exists", async () => {
    const req = {
      headers: {
        get: jest.fn(),
      },
      nextUrl: {
        searchParams: new URLSearchParams(),
      },
    };
    req.nextUrl.searchParams.set("applicationNumber", "12345");
    req.nextUrl.searchParams.set("_id", "5678");
    checkExistingReferenceMock.mockResolvedValue({ _id: "5678" });
    await PUT(req);
    expect(updateApplicationMock).toHaveBeenCalledWith(
      "5678",
      expect.any(Object),
    );
  });

  it("should create application if it does not exist", async () => {
    const req = {
      headers: {
        get: jest.fn(),
      },
      nextUrl: {
        searchParams: new URLSearchParams(),
      },
    };
    req.nextUrl.searchParams.set("applicationNumber", "12345");
    req.nextUrl.searchParams.set("_id", "5678");
    checkExistingReferenceMock.mockResolvedValue(null);
    await PUT(req);
    expect(createApplicationMock).toHaveBeenCalledWith(expect.any(Object));
  });

  //   it("should return 500 if an error occurs while creating the application", async () => {
  //     const searchParams = {
  //       descriptions: "Sample description",
  //     };

  //     const req = {
  //       headers: {
  //         get: jest.fn().mockReturnValue("test_key"),
  //       },
  //       nextUrl: {
  //         searchParams: new URLSearchParams("descriptions=Sample description"),
  //       },
  //     } as unknown as NextRequest;

  //     const mockedResponse = {
  //       json: jest.fn(),
  //     };
  //     NextResponse.json = jest.fn().mockReturnValue(mockedResponse);

  //     const errors = { status: 200, errors: [] };
  //     validateUniformDataMock.mockResolvedValue(errors);
  //     verifyApiKeyMock.mockReturnValue(true);
  //     createApplicationMock.mockRejectedValue(
  //       new Error("Failed to create application"),
  //     );

  //     await PUT(req);

  //     expect(validateUniformDataMock).toHaveBeenCalledWith(searchParams);
  //     expect(createApplication).toHaveBeenCalledWith({
  //       descriptions: "Sample description",
  //     });
  //     // expect(res.status).toHaveBeenCalledWith(500);
  //     expect(NextResponse.json).toHaveBeenCalledWith(
  //       "An error occurred while creating the application",
  //       {
  //         status: 500,
  //       },
  //     );
  //   });
});
