
import { createApplication} from "../util/client";
import { validatePlanningParams } from "../util/validator";
import handler from "../src/pages/api/application";

jest.mock("../util/client");
jest.mock("../util/validator");

describe("Applications API", () => {
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
      body: {
        refesrence: "AAA_BBB_CCC_DDD",
        description: "Sample description",
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const errors = {status: 400, errors:["Invalid reference", "Invalid description"]};
    validatePlanningParams.mockResolvedValue(errors);

    await handler(req, res);

    expect(validatePlanningParams).toHaveBeenCalledWith(req.body);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      errors: ["Invalid reference", "Invalid description"],
      "status": 400,
    });
  });

  it("should create a new application and return 200 if all parameters are valid", async () => {
    const req = {
      method: "POST",
      body: {
        reference: "AAA_BBB_CCC_DDD",
        description: "Sample description",
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const errors = {status:200, errors:[]};
    validatePlanningParams.mockResolvedValue(errors);
    createApplication.mockResolvedValue();

    await handler(req, res);

    expect(validatePlanningParams).toHaveBeenCalledWith(req.body);
    expect(createApplication).toHaveBeenCalledWith({
      reference: "AAA_BBB_CCC_DDD",
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
        reference: "AAA_BBB_CCC_DDD",
        description: "Sample description",
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const errors = {status: 200, errors:[]};
    validatePlanningParams.mockResolvedValue(errors);
    createApplication.mockRejectedValue(new Error("Failed to create application"));

    await handler(req, res);

    expect(validatePlanningParams).toHaveBeenCalledWith(req.body);
    expect(createApplication).toHaveBeenCalledWith({
      reference: "AAA_BBB_CCC_DDD",
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