import { createApplication } from "../util/client";
import { validatePlanningParams } from "../util/validator";
import { verifyApiKey } from "../util/apiKey";
import handler from "../src/pages/api/applications";

jest.mock("../util/client");
jest.mock("../util/validator");
jest.mock("../util/apiKey");

describe("Applications API", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return 401 if incorrect api key", async () => {
    const req = {
      method: "POST",
      headers: {
        authorization: 'test_key',
      },
    };
    const res = {
      setHeader: jest.fn(),
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      error: { message: "Invalid API key" },
    });
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
        failedValidation: ["An error occurred while validating the application undefined",],
      },
      message: "An error has occured",
    });
  });

  it("should create a new application and return 200 if all parameters are valid", async () => {
    const req = {
      method: "POST",
      body: [
        {
          reference: "AAA_BBB_CCC_DDD",
          description: "Sample description",
        },
      ],
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const errors = { status: 200, errors: [] };
    validatePlanningParams.mockResolvedValue(errors);
    verifyApiKey.mockReturnValue(true);
    createApplication.mockResolvedValue();

    await handler(req, res);

    expect(validatePlanningParams).toHaveBeenCalledWith(req.body[0]);
    expect(createApplication).toHaveBeenCalledWith({
      reference: "AAA_BBB_CCC_DDD",
      description: "Sample description",
      isActive: true,
      _type: "planning-application",
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
