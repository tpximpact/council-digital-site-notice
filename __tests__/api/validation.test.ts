import {
  validateUniformData,
  UniformValidationType,
} from "../../src/app/actions/uniformValidator";

type ConsultationStatus = "in progress" | "extended";
type AssessmentStatus = "in progress";
type DecisionStatus = "approved" | "pending approval" | "rejected";
type AppealStatus = "in progress" | "unsuccessful" | "successful";

type ApplicationStage = "Consultation" | "Assessment" | "Decision" | "Appeal";

describe("validateUniformData", () => {
  const validData: UniformValidationType = {
    applicationNumber: "1234/5678/A",
    isActive: false,
    location: {
      lat: 51.5074,
      lng: -0.1278,
    },
    applicationStage: {
      stage: "Consultation",
      status: {
        consultation: "in progress" as const,
      },
    },
    address: "1 Test Street",
    proposedLandUse: {
      classB: false,
      classC: false,
      classE: false,
      classF: false,
      suiGeneris: false,
    },
  };

  describe("Required Fields", () => {
    it("should validate when all required fields are present", async () => {
      const result = await validateUniformData(validData);
      expect(result.status).toBe(200);
      expect(result.errors).toHaveLength(0);
    });

    type RequiredFields =
      | "applicationNumber"
      | "location"
      | "applicationStage"
      | "address";

    it.each<[RequiredFields]>([
      ["applicationNumber"],
      ["location"],
      ["applicationStage"],
      ["address"],
    ])("should fail when %s is missing", async (field) => {
      const { [field]: _, ...testData } = validData;
      const result = await validateUniformData(
        testData as UniformValidationType,
      );
      expect(result.status).toBe(400);
      expect(result.errors[0].message).toContain(field);
    });

    it("should fail when location is missing lng", async () => {
      const { lng, ...locationWithoutLng } = validData.location;
      const testData: UniformValidationType = {
        ...validData,
        location: locationWithoutLng as UniformValidationType["location"],
      };

      const result = await validateUniformData(testData);
      expect(result.status).toBe(400);
      expect(result.errors[0].message).toContain("lng");
    });
  });

  describe("Application Stage Validation", () => {
    type StatusTest = [
      ApplicationStage,
      "consultation" | "assessment" | "decision" | "appeal",
      ConsultationStatus | AssessmentStatus | DecisionStatus | AppealStatus,
    ];

    const stageTests: StatusTest[] = [
      ["Consultation", "consultation", "in progress"],
      ["Consultation", "consultation", "extended"],
      ["Assessment", "assessment", "in progress"],
      ["Decision", "decision", "pending approval"],
      ["Appeal", "appeal", "unsuccessful"],
    ];

    it.each(stageTests)(
      "should validate stage %s with status %s: %s",
      async (stage, statusKey, statusValue) => {
        const testData: UniformValidationType = {
          ...validData,
          applicationStage: {
            stage,
            status: {
              [statusKey]: statusValue,
            },
          },
        };

        const result = await validateUniformData(testData);
        expect(result.status).toBe(200);
        expect(result.errors).toHaveLength(0);
      },
    );

    it("should fail when status doesn't match stage", async () => {
      const testData: UniformValidationType = {
        ...validData,
        applicationStage: {
          stage: "Consultation",
          status: {
            decision: "approved" as const,
          },
        },
      };

      const result = await validateUniformData(testData);
      expect(result.status).toBe(400);
      expect(result.errors[0].message).toContain(
        "Status must correspond to the current stage",
      );
    });

    it("should fail when multiple statuses are provided", async () => {
      const testData: UniformValidationType = {
        ...validData,
        applicationStage: {
          stage: "Consultation",
          status: {
            consultation: "in progress" as const,
            decision: "approved" as const,
          },
        },
      };

      const result = await validateUniformData(testData);
      expect(result.status).toBe(400);
      expect(result.errors[0].message).toContain(
        "Exactly one status field should be present",
      );
    });
  });

  describe("Conditional Fields", () => {
    it.each([
      ["showOpenSpace", "openSpaceArea", 100],
      [
        "showHousing",
        "housing",
        { residentialUnits: 50, affordableResidentialUnits: 15 },
      ],
      ["showCarbon", "carbonEmissions", 500],
      ["showAccess", "access", "Valid access description"],
      ["showJobs", "jobs", { min: 10, max: 20 }],
    ])(
      "should validate when %s is true and %s is provided",
      async (showField: string, dataField: string, value: any) => {
        const testData: UniformValidationType = {
          ...validData,
          [showField]: true,
          [dataField]: value,
        };

        const result = await validateUniformData(testData);
        expect(result.status).toBe(200);
        expect(result.errors).toHaveLength(0);
      },
    );

    it.each([
      ["showOpenSpace", "openSpaceArea"],
      ["showHousing", "housing"],
      ["showCarbon", "carbonEmissions"],
      ["showAccess", "access"],
      ["showJobs", "jobs"],
    ])(
      "should fail when %s is true but %s is missing",
      async (showField: string, dataField: string) => {
        const testData: UniformValidationType = {
          ...validData,
          [showField]: true,
        };

        const result = await validateUniformData(testData);
        expect(result.status).toBe(400);
        expect(result.errors[0].message).toContain(dataField);
      },
    );
  });

  describe("SuiGeneris Validation", () => {
    it("should validate when suiGeneris is true and detail is provided", async () => {
      const testData: UniformValidationType = {
        ...validData,
        proposedLandUse: {
          classB: false,
          classC: false,
          classE: false,
          classF: false,
          suiGeneris: true,
          suiGenerisDetail: "Valid detail",
        },
      };

      const result = await validateUniformData(testData);
      expect(result.status).toBe(200);
      expect(result.errors).toHaveLength(0);
    });

    it("should fail when suiGeneris is true but detail is missing", async () => {
      const testData: UniformValidationType = {
        ...validData,
        proposedLandUse: {
          classB: false,
          classC: false,
          classE: false,
          classF: false,
          suiGeneris: true,
        },
      };

      const result = await validateUniformData(testData);
      expect(result.status).toBe(400);
      expect(result.errors[0].message).toContain("suiGenerisDetail");
    });

    it("should fail when suiGeneris is false but detail is provided", async () => {
      const testData: UniformValidationType = {
        ...validData,
        proposedLandUse: {
          classB: false,
          classC: false,
          classE: false,
          classF: false,
          suiGeneris: false,
          suiGenerisDetail: "Should not be here",
        },
      };

      const result = await validateUniformData(testData);
      expect(result.status).toBe(400);
      expect(result.errors[0].message).toContain(
        "suiGenerisDetail must be provided when suiGeneris is true, and must be empty when suiGeneris is false",
      );
    });
  });

  describe("Empty String Validation", () => {
    it("should fail when required string fields are empty", async () => {
      const testData: UniformValidationType = {
        ...validData,
        address: "",
      };

      const result = await validateUniformData(testData);
      expect(result.status).toBe(400);
      expect(result.errors[0].message).toContain("address");
    });

    it("should fail when conditional string fields are empty", async () => {
      const testData: UniformValidationType = {
        ...validData,
        showAccess: true,
        access: "",
      };

      const result = await validateUniformData(testData);
      expect(result.status).toBe(400);
      expect(result.errors[0].message).toContain("Access description");
    });
  });
});
