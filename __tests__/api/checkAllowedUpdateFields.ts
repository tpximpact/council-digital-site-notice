import { checkAllowedUpdateFields } from "../../src/app/api/checkAllowedUpdateFields";
import { generateUniformData } from "../../mockdata/mockData";

describe("checkAllowedUpdateFields", () => {
  const minimalApplication = generateUniformData({
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

  const fullApplication = generateUniformData();

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
        location: { lat: 52.0, lng: minimalApplication.location.lng },
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
        { showOpenSpace: !fullApplication.showOpenSpace },
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
