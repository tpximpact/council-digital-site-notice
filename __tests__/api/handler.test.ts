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

jest.mock("../../src/app/actions/uniformValidator");
jest.mock("../../src/app/actions/sanityClient");

describe("Application Handlers", () => {
  const minimalApplication = {
    applicationNumber: "1234/5678/A",
    address: "1 Test Street",
    location: {
      lat: 51.5074,
      lng: -0.1278,
    },
    applicationStage: {
      stage: "Consultation",
      status: {
        consultation: "in progress",
      },
    },
  };

  const validApplication = {
    applicationNumber: "1234/5678/A",
    isActive: true,
    planningId: "123",
    name: "Test Building",
    description: "Test description",
    applicationType: "Full Planning Permission",
    address: "1 Test Street",
    applicationStage: {
      stage: "Consultation",
      status: {
        consultation: "in progress",
      },
    },
    location: {
      lat: 51.5074,
      lng: -0.1278,
    },
    proposedLandUse: {
      classB: false,
      classC: false,
      classE: false,
      classF: false,
      suiGeneris: false,
    },
    enableComments: false,
    consultationDeadline: undefined,
    height: undefined,
    constructionTime: undefined,
    applicationDocumentsUrl: undefined,
    applicationUpdatesUrl: undefined,
    showOpenSpace: false,
    openSpaceArea: undefined,
    showHousing: false,
    housing: undefined,
    showCarbon: false,
    carbonEmissions: undefined,
    showAccess: false,
    access: undefined,
    showJobs: false,
    jobs: undefined,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (validateUniformData as jest.Mock).mockResolvedValue({
      errors: [],
      status: 200,
    });
    (checkExistingReference as jest.Mock).mockResolvedValue(null);
    (createApplication as jest.Mock).mockResolvedValue({});
    (updateApplication as jest.Mock).mockResolvedValue({});
  });

  describe("processApplication", () => {
    it("creates new application with minimal required fields", async () => {
      const result = await processApplication(minimalApplication);

      expect(createApplication).toHaveBeenCalledTimes(1);
      expect(result.success).toBe(
        `Application ${minimalApplication.applicationNumber} created`,
      );
    });

    it("creates new application with all fields", async () => {
      const result = await processApplication(validApplication);

      expect(createApplication).toHaveBeenCalledTimes(1);
      expect(result.success).toBe(
        `Application ${validApplication.applicationNumber} created`,
      );
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
      expect(result.success).toBe(
        `Application ${minimalApplication.applicationNumber} updated`,
      );
    });

    it("skips update when no changes needed", async () => {
      const existingData = {
        _type: "planning-application",
        applicationNumber: "1234/5678/A",
        isActive: true,
        planningId: "123",
        name: "Test Building",
        description: "Test description",
        applicationType: "Full Planning Permission",
        address: "1 Test Street",
        applicationStage: {
          stage: "Consultation",
          status: {
            consultation: "in progress",
          },
        },
        location: {
          lat: 51.5074,
          lng: -0.1278,
        },
        proposedLandUse: {
          classB: false,
          classC: false,
          classE: false,
          classF: false,
          suiGeneris: false,
        },
        enableComments: false,
        consultationDeadline: undefined,
        height: undefined,
        constructionTime: undefined,
        applicationDocumentsUrl: undefined,
        applicationUpdatesUrl: undefined,
        showOpenSpace: false,
        openSpaceArea: undefined,
        showHousing: false,
        housing: undefined,
        showCarbon: false,
        carbonEmissions: undefined,
        showAccess: false,
        access: undefined,
        showJobs: false,
        jobs: undefined,
      };

      const mockedExisting = {
        _id: "existing-id",
        ...existingData,
      };

      (checkExistingReference as jest.Mock).mockResolvedValue(mockedExisting);

      const updateData = { ...existingData };

      const result = await processApplication(updateData);

      expect(updateApplication).not.toHaveBeenCalled();
      expect(result.success).toBe(
        `Application ${existingData.applicationNumber} no update needed`,
      );
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
        applicationNumber: undefined as unknown as string,
      };

      const result = await processApplication(invalidApp);

      expect(result.error).toBe("Missing required field: applicationNumber");
      expect(createApplication).not.toHaveBeenCalled();
      expect(updateApplication).not.toHaveBeenCalled();
    });

    it("handles database errors gracefully", async () => {
      (createApplication as jest.Mock).mockRejectedValue(
        new Error("Database error"),
      );

      const result = await processApplication(minimalApplication);

      expect(result.error).toBe(
        "An error occurred while processing the application",
      );
    });
  });

  describe("processMultipleApplications", () => {
    it("processes multiple applications successfully", async () => {
      const applications = [
        minimalApplication,
        { ...minimalApplication, applicationNumber: "9876/5432/A" },
      ];

      const results = await processMultipleApplications(applications);

      expect(results.success).toHaveLength(2);
      expect(createApplication).toHaveBeenCalledTimes(2);
      expect(results.errors).toHaveLength(0);
    });

    it("handles mix of successful and failed applications", async () => {
      const applications = [
        minimalApplication,
        { ...minimalApplication, applicationNumber: undefined },
      ];

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

      const applications = [
        minimalApplication,
        { ...minimalApplication, applicationNumber: "123" },
      ];

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
        { ...minimalApplication, applicationNumber: "FAIL/APP" },
      ];

      const results = await processMultipleApplications(applications);

      expect(results.success).toHaveLength(1);
      expect(results.errors).toHaveLength(1);
      expect(createApplication).toHaveBeenCalledTimes(2);
    });
  });
});
