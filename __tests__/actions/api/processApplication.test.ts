import {
  processApplication,
  processMultipleApplications,
} from "@/actions/api/processApplication";
import { ApiPlanningApplication } from "@/schemas/planningApplication";
import { is } from "date-fns/locale";

jest.mock("@/actions/sanityClient", () => ({
  getApplicationByApplicationNumber: jest.fn(),
  createApplication: jest.fn(),
  updateApplication: jest.fn(),
}));
jest.mock("@/lib/api/checkAllowedUpdateFields", () => ({
  checkAllowedUpdateFields: jest.fn(),
}));

const baseApp: ApiPlanningApplication = {
  isActive: true,
  applicationNumber: "mocked-application-number",
  applicationType: "mocked-application-type",
  name: "Mocked Application",
  description: "This is a mocked application description.",
  address: "123 Mocked St, Mocked City, MC1 2AB",
  applicationStage: {
    stage: "Consultation",
    status: {
      appeal: "in progress",
      assessment: "in progress",
      consultation: "in progress",
      decision: "approved",
    },
  },
  location: { lat: 51.555168, lng: -0.144057 },
};

describe("processApplication", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("returns error if applicationNumber is missing", async () => {
    // @ts-expect-error
    const result = await processApplication({
      ...baseApp,
      applicationNumber: undefined,
    } as Partial<ApiPlanningApplication>);
    expect(result.success).toBe(false);
    expect(result.error).toMatch(/applicationNumber/);
    expect(result.message).toMatch(/not updated/);
  });

  it("creates a new application if none exists", async () => {
    const {
      getApplicationByApplicationNumber,
      createApplication,
    } = require("@/actions/sanityClient");
    getApplicationByApplicationNumber.mockResolvedValue(null);
    createApplication.mockResolvedValue({ ...baseApp, _id: "newid" });

    const result = await processApplication(baseApp);
    expect(result.success).toBe(true);
    expect(result.message).toMatch(/created/);
    expect(result._id).toBe("newid");
  });

  it("updates application if exists and fields changed", async () => {
    const {
      getApplicationByApplicationNumber,
      updateApplication,
    } = require("@/actions/sanityClient");
    const {
      checkAllowedUpdateFields,
    } = require("@/lib/api/checkAllowedUpdateFields");
    getApplicationByApplicationNumber.mockResolvedValue({
      ...baseApp,
      _id: "existingid",
    });
    checkAllowedUpdateFields.mockReturnValue(true);
    updateApplication.mockResolvedValue({ ...baseApp, _id: "existingid" });

    const result = await processApplication(baseApp);
    expect(result.success).toBe(true);
    expect(result.message).toMatch(/updated/);
    expect(result._id).toBe("existingid");
  });

  it("returns no update needed if exists and fields unchanged", async () => {
    const {
      getApplicationByApplicationNumber,
    } = require("@/actions/sanityClient");
    const {
      checkAllowedUpdateFields,
    } = require("@/lib/api/checkAllowedUpdateFields");
    getApplicationByApplicationNumber.mockResolvedValue({
      ...baseApp,
      _id: "existingid",
    });
    checkAllowedUpdateFields.mockReturnValue(false);

    const result = await processApplication(baseApp);
    expect(result.success).toBe(true);
    expect(result.message).toMatch(/no update needed/);
    expect(result._id).toBe("existingid");
  });

  it("returns error if an exception is thrown", async () => {
    const {
      getApplicationByApplicationNumber,
    } = require("@/actions/sanityClient");
    getApplicationByApplicationNumber.mockRejectedValue(new Error("DB error"));

    const result = await processApplication(baseApp);
    expect(result.success).toBe(false);
    expect(result.message).toMatch(/not updated/);
    expect(result.error).toMatch(/error/i);
  });
});

describe("processMultipleApplications", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("processes multiple applications", async () => {
    const {
      getApplicationByApplicationNumber,
      createApplication,
    } = require("@/actions/sanityClient");
    getApplicationByApplicationNumber.mockResolvedValue(null);
    createApplication.mockResolvedValue({ ...baseApp, _id: "newid" });

    const apps = [baseApp, { ...baseApp, applicationNumber: "A124" }];
    const results = await processMultipleApplications(apps);
    expect(results).toHaveLength(2);
    expect(results[0].success).toBe(true);
    expect(results[1].success).toBe(true);
  });
});
