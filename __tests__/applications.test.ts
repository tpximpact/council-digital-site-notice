import { createApplication } from "@/app/actions/actions";
import { validatePlanningParams } from "@/app/actions/validators/validator";
import handler from "@/app/api/applications/route";
import { verifyApiKey } from "../src/app/lib/apiKey";

jest.mock("../src/app/actions/actions");
jest.mock("../src/app/actions/validator");
jest.mock("../src/app/lib/apiKey");
jest.mock("react", () => {
  const testCache = <T extends (...args: Array<unknown>) => unknown>(func: T) =>
    func;
  const originalModule = jest.requireActual("react");
  return {
    ...originalModule,
    cache: testCache,
  };
});

describe.skip("Applications API", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return 405 if method is not POST", async () => {
    const req = {
      method: "GET",
    };
    const res = {
      setHeader: jest.fn(),
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await handler(req, res);

    expect(res.setHeader).toHaveBeenCalledWith("Allow", ["POST"]);
    expect(res.status).toHaveBeenCalledWith(405);
    expect(res.json).toHaveBeenCalledWith({
      error: { message: "Method GET Not Allowed" },
    });
  });

  it("should return 400 if validation errors occur", async () => {
    const req = {
      method: "POST",
      body: [
        {
          refesrence: "AAA_BBB_CCC_DDD",
          description: "Sample description",
        },
      ],
      headers: {
        authorization: "test_key",
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const errors = {
      status: 400,
      errors: [
        "An error occurred while validating the application AAA_BBB_CCC_DDD",
      ],
    };
    validatePlanningParams.mockResolvedValue(errors);
    verifyApiKey.mockReturnValue(true);

    await handler(req, res);

    expect(validatePlanningParams).toHaveBeenCalledWith(req.body[0]);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      data: {
        successfullyCreated: [],
      },
      errors: {
        failedCreation: [],
        failedValidation: [
          "An error occurred while validating the application undefined",
        ],
      },
      message: "An error has occured",
    });
  });

  it("should create a new application and return 200 if all parameters are valid", async () => {
    const req = {
      method: "POST",
      body: [
        {
          applicationNumber: "AAA_BBB_CCC_DDD",
          description: "Sample description",
        },
      ],
      headers: {
        authorization: "test_key",
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const errors = { status: 200, errors: [] };
    validatePlanningParams.mockResolvedValue(errors);
    createApplication.mockResolvedValue();
    verifyApiKey.mockReturnValue(true);

    await handler(req, res);

    expect(validatePlanningParams).toHaveBeenCalledWith(req.body[0]);
    expect(createApplication).toHaveBeenCalledWith({
      applicationNumber: "AAA_BBB_CCC_DDD",
      _type: "planning-application",
      address: undefined,
      applicationStage: undefined,
      applicationType: undefined,
      consultationDeadline: undefined,
      description: "Sample description",
      developmentType: undefined,
      height: undefined,
      isActive: false,
      openSpaceGardens: undefined,
    });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      data: {
        successfullyCreated: ["Applciation AAA_BBB_CCC_DDD created"],
      },
      errors: {
        failedCreation: [],
        failedValidation: [],
      },
      message: "Success",
    });
  });
});
