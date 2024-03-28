import { createApplication } from "../util/actions/actions";
import { validatePlanningParams } from "../util/actions/validator";
import { verifyApiKey } from "../util/helpers/apiKey";
import handler from "../src/app/api/application/route";

jest.mock("../util/actions/actions");
jest.mock("../util/actions/validator");
jest.mock("../util//helpers/apiKey");

describe("Applications API", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return 401 if incorrect api key", async () => {
    const req = {
      method: "POST",
      headers: {
        authorization: "test_key",
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
      body: {
        refesrence: "AAA_BBB_CCC_DDD",
        description: "Sample description",
      },
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
      errors: ["Invalid reference", "Invalid description"],
    };
    validatePlanningParams.mockResolvedValue(errors);
    verifyApiKey.mockReturnValue(true);

    await handler(req, res);

    expect(validatePlanningParams).toHaveBeenCalledWith(req.body);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      errors: ["Invalid reference", "Invalid description"],
      status: 400,
    });
  });

  it("should create a new application and return 200 if all parameters are valid", async () => {
    const req = {
      method: "POST",
      body: {
        applicationNumber: "AAA_BBB_CCC_DDD",
        description: "Sample description",
      },
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
    verifyApiKey.mockReturnValue(true);
    createApplication.mockResolvedValue();

    await handler(req, res);

    expect(validatePlanningParams).toHaveBeenCalledWith(req.body);
    expect(createApplication).toHaveBeenCalledWith({
      applicationNumber: "AAA_BBB_CCC_DDD",
      description: "Sample description",
      isActive: true,
      _type: "planning-application",
    });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: "Success" });
  });

  it("should return 500 if an error occurs while creating the application", async () => {
    const req = {
      method: "POST",
      body: {
        applicationNumber: "AAA_BBB_CCC_DDD",
        description: "Sample description",
      },
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
    verifyApiKey.mockReturnValue(true);
    createApplication.mockRejectedValue(
      new Error("Failed to create application"),
    );

    await handler(req, res);

    expect(validatePlanningParams).toHaveBeenCalledWith(req.body);
    expect(createApplication).toHaveBeenCalledWith({
      applicationNumber: "AAA_BBB_CCC_DDD",
      description: "Sample description",
      isActive: true,
      _type: "planning-application",
    });
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: { message: "An error occurred while creating the application" },
    });
  });
});
