import {
  processApplication,
  processMultipleApplications,
} from "../../src/app/api/handlers/handler";
import { validateUniformData } from "@/app/actions/uniformValidator";
import {
  checkExistingReference,
  createApplication,
  updateApplication,
} from "@/app/actions/sanityClient";
import { generateUniformData } from "../../mockdata/mockData";

jest.mock("../../src/app/actions/uniformValidator");
jest.mock("../../src/app/actions/sanityClient");

describe("Application Handlers", () => {
  let validApplication: any;
  let minimalApplication: any;

  beforeEach(() => {
    jest.clearAllMocks();
    (validateUniformData as jest.Mock).mockResolvedValue({
      errors: [],
      status: 200,
    });
    (checkExistingReference as jest.Mock).mockResolvedValue(null);
    (createApplication as jest.Mock).mockResolvedValue({});
    (updateApplication as jest.Mock).mockResolvedValue({});

    validApplication = generateUniformData({
      applicationNumber: "TEST123",
      isActive: true,
      planningId: "P123",
      name: "Test Application",
      description: "Test Description",
      address: "123 Test St",
      applicationType: "full",
      proposedLandUse: {
        classB: true,
        classC: false,
        classE: true,
        classF: false,
        suiGeneris: false,
      },
      enableComments: true,
      consultationDeadline: "2024-12-31",
      height: 10,
      constructionTime: "12",
      location: { lat: 51.5074, lng: -0.1278 },
      applicationDocumentsUrl: "http://example.com/docs",
      applicationUpdatesUrl: "http://example.com/updates",
      showOpenSpace: true,
      openSpaceArea: 1000,
      showHousing: true,
      housing: {
        residentialUnits: 100,
        affordableResidentialUnits: 30,
      },
      showCarbon: true,
      carbonEmissions: 500,
      showAccess: true,
      access: "There is a path",
      showJobs: true,
      jobs: {
        min: 10,
        max: 20,
      },
    });

    minimalApplication = generateUniformData({
      applicationNumber: "TEST123",
      isActive: undefined,
      planningId: undefined,
      name: undefined,
      description: undefined,
      applicationType: undefined,
      proposedLandUse: undefined,
      enableComments: undefined,
      consultationDeadline: undefined,
      height: undefined,
      constructionTime: undefined,
      applicationDocumentsUrl: undefined,
      applicationUpdatesUrl: undefined,
      showOpenSpace: undefined,
      openSpaceArea: undefined,
      showHousing: undefined,
      housing: undefined,
      showCarbon: undefined,
      carbonEmissions: undefined,
      showAccess: undefined,
      access: undefined,
      showJobs: undefined,
      jobs: undefined,
    });
  });

  describe("processApplication", () => {
    it("creates new application with minimal required fields", async () => {
      const result = await processApplication(minimalApplication);

      expect(createApplication).toHaveBeenCalledTimes(1);
      expect(result.success).toContain("created");
    });

    it("creates new application with all fields", async () => {
      const result = await processApplication(validApplication);

      expect(createApplication).toHaveBeenCalledTimes(1);
      expect(result.success).toContain("created");
    });

    it("updates existing application when changes detected", async () => {
      (checkExistingReference as jest.Mock).mockResolvedValue({
        _id: "existing-id",
        ...minimalApplication,
        name: "Old Name",
      });

      const newData = {
        ...minimalApplication,
        name: "New Name",
      };

      const result = await processApplication(newData);

      expect(updateApplication).toHaveBeenCalledTimes(1);
      expect(result.success).toContain("updated");
    });

    it("handles validation errors", async () => {
      (validateUniformData as jest.Mock).mockResolvedValue({
        errors: [{ message: "Invalid data" }],
        status: 400,
      });

      const result = await processApplication(validApplication);

      expect(result.error).toBe("Invalid data");
      expect(createApplication).not.toHaveBeenCalled();
      expect(updateApplication).not.toHaveBeenCalled();
    });

    it("handles missing application number", async () => {
      const invalidApp = {
        ...minimalApplication,
        applicationNumber: undefined,
      };

      const result = await processApplication(invalidApp);

      expect(result.error).toBe("Missing required field: applicationNumber");
      expect(createApplication).not.toHaveBeenCalled();
      expect(updateApplication).not.toHaveBeenCalled();
    });

    describe("processMultipleApplications", () => {
      it("processes multiple applications successfully", async () => {
        const applications = [minimalApplication, generateUniformData()];

        const results = await processMultipleApplications(applications);

        expect(results.success).toHaveLength(2);
        expect(createApplication).toHaveBeenCalledTimes(2);
        expect(results.errors).toHaveLength(0);
      });

      it("handles mix of successful and failed applications", async () => {
        const invalidApplication = {
          ...minimalApplication,
          applicationNumber: undefined,
        };
        const applications = [minimalApplication, invalidApplication];

        const results = await processMultipleApplications(applications);

        expect(results.success).toHaveLength(1);
        expect(results.errors).toHaveLength(1);
        expect(createApplication).toHaveBeenCalledTimes(1);
      });

      it("handles all applications failing", async () => {
        (validateUniformData as jest.Mock).mockResolvedValue({
          errors: [{ message: "Invalid data" }],
          status: 400,
        });

        const applications = [minimalApplication, generateUniformData()];

        const results = await processMultipleApplications(applications);

        expect(results.success).toHaveLength(0);
        expect(results.errors).toHaveLength(2);
        expect(createApplication).not.toHaveBeenCalled();
      });

      it("processes empty array", async () => {
        const results = await processMultipleApplications([]);

        expect(results.success).toHaveLength(0);
        expect(results.errors).toHaveLength(0);
        expect(createApplication).not.toHaveBeenCalled();
      });

      it("handles errors while continuing to process others", async () => {
        (createApplication as jest.Mock)
          .mockResolvedValueOnce({})
          .mockRejectedValueOnce(new Error("Error"));

        const applications = [
          minimalApplication,
          generateUniformData({ applicationNumber: "FAIL/APP" }),
        ];

        const results = await processMultipleApplications(applications);

        expect(results.success).toHaveLength(1);
        expect(results.errors).toHaveLength(1);
        expect(createApplication).toHaveBeenCalledTimes(2);
      });
    });
  });
});
