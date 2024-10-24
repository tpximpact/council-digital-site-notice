import { checkAllowedUpdateFields } from "../../src/app/api/checkAllowedUpdateFields";

describe("checkAllowedUpdateFields", () => {
  const minimalApplication = {
    applicationNumber: "1234/5678/A",
    address: "1 Test Street",
    location: {
      lat: 51.5074,
      lng: -0.1278,
    },
    applicationStage: {
      stage: "Consultation" as const,
      status: {
        consultation: "in progress" as const,
      },
    },
  };

  const fullApplication = {
    ...minimalApplication,
    isActive: true,
    applicationType: "Full Planning Permission",
    name: "Test Building",
    description: "Test description",
    enableComments: true,
    consultationDeadline: "2024-12-31",
    height: 10.5,
    constructionTime: "2024-2025",
    proposedLandUse: {
      classB: false,
      classC: false,
      classE: false,
      classF: false,
      suiGeneris: false,
      suiGenerisDetail: null,
    },
    applicationDocumentsUrl: "https://example.com/docs",
    applicationUpdatesUrl: "https://example.com/updates",
    showOpenSpace: true,
    openSpaceArea: 100,
    showHousing: true,
    housing: {
      residentialUnits: 50,
      affordableResidentialUnits: 20,
    },
    showCarbon: true,
    carbonEmissions: 500,
    showAccess: true,
    access: "Easy access from main road",
    showJobs: true,
    jobs: {
      min: 10,
      max: 20,
    },
  };

  describe("Required Fields", () => {
    it("returns false when all required fields are identical", () => {
      const result = checkAllowedUpdateFields(
        minimalApplication,
        minimalApplication,
      );
      expect(result).toBe(false);
    });

    it("detects change in address", () => {
      const newData = { ...minimalApplication, address: "2 New Street" };
      expect(checkAllowedUpdateFields(minimalApplication, newData)).toBe(true);
    });

    it("detects change in location", () => {
      const newData = {
        ...minimalApplication,
        location: { lat: 52.0, lng: -0.1278 },
      };
      expect(checkAllowedUpdateFields(minimalApplication, newData)).toBe(true);
    });

    it("detects change in applicationStage", () => {
      const newData = {
        ...minimalApplication,
        applicationStage: {
          stage: "Assessment" as const,
          status: { assessment: "in progress" as const },
        },
      };
      expect(checkAllowedUpdateFields(minimalApplication, newData)).toBe(true);
    });
  });

  describe("Optional Fields", () => {
    it("detects changes in optional fields when present", () => {
      const appWithOptional = {
        ...minimalApplication,
        name: "Original Name",
      };

      const newData = {
        ...minimalApplication,
        name: "New Name",
      };

      expect(checkAllowedUpdateFields(appWithOptional, newData)).toBe(true);
    });

    it("handles optional fields being added", () => {
      const newData = {
        ...minimalApplication,
        name: "New Name",
      };

      expect(checkAllowedUpdateFields(minimalApplication, newData)).toBe(true);
    });

    it("detects changes in proposedLandUse", () => {
      const appWithLandUse = {
        ...minimalApplication,
        proposedLandUse: {
          classB: false,
          classC: false,
          classE: false,
          classF: false,
          suiGeneris: false,
        },
      };

      const newData = {
        ...minimalApplication,
        proposedLandUse: {
          classB: true,
          classC: false,
          classE: false,
          classF: false,
          suiGeneris: false,
        },
      };

      expect(checkAllowedUpdateFields(appWithLandUse, newData)).toBe(true);
    });
  });

  describe("Conditional Fields", () => {
    it("detects changes in housing when showHousing is true", () => {
      const appWithHousing = {
        ...minimalApplication,
        showHousing: true,
        housing: {
          residentialUnits: 10,
          affordableResidentialUnits: 5,
        },
      };

      const newData = {
        ...appWithHousing,
        housing: {
          residentialUnits: 15,
          affordableResidentialUnits: 7,
        },
      };

      expect(checkAllowedUpdateFields(appWithHousing, newData)).toBe(true);
    });

    it("detects changes in carbonEmissions when showCarbon is true", () => {
      const appWithCarbon = {
        ...minimalApplication,
        showCarbon: true,
        carbonEmissions: 100,
      };

      const newData = {
        ...appWithCarbon,
        carbonEmissions: 150,
      };

      expect(checkAllowedUpdateFields(appWithCarbon, newData)).toBe(true);
    });
  });

  describe("Full Application Updates", () => {
    it("returns false when full application is identical", () => {
      expect(checkAllowedUpdateFields(fullApplication, fullApplication)).toBe(
        false,
      );
    });

    it("detects changes in any field in full application", () => {
      const changes = [
        { name: "New Name" },
        { height: 15.5 },
        { showOpenSpace: false },
        { carbonEmissions: 600 },
        {
          jobs: {
            min: 15,
            max: 25,
          },
        },
      ];

      changes.forEach((change) => {
        const newData = { ...fullApplication, ...change };
        expect(checkAllowedUpdateFields(fullApplication, newData)).toBe(true);
      });
    });
  });
});
