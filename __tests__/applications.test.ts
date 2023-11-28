import { createApplication, checkExistingReference } from "../util/client";
import handler from "../src/pages/api/applications";

jest.mock("../util/client");

describe("Applications API", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return 400 if reference parameter is missing", async () => {
    const req = {
      method: "POST",
      body: {},
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      setHeader: jest.fn(),
    };

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: { message: "Reference parameter is required" },
    });
  });

  it("should return 400 if reference already exists", async () => {
    const req = {
      method: "POST",
      body: {
        reference: "AAA_BBB_CCC_DDD",
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      setHeader: jest.fn(),
    };

    checkExistingReference.mockResolvedValue(true);

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: { message: "Reference must be unique" },
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
      setHeader: jest.fn(),
    };

    checkExistingReference.mockResolvedValue(false);
    createApplication.mockResolvedValue();

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: "Success" });
  });

});