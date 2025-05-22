import {
  planningApplicationSchema,
  planningApplicationsSchema,
} from "@/schemas/planningApplication";

describe("planningApplicationSchema", () => {
  it("accepts a valid application", () => {
    const valid = {
      applicationNumber: "A1",
      location: { lat: 1, lng: 2 },
      applicationStage: {
        stage: "Consultation",
        status: { consultation: "in progress" },
      },
      address: "123 Test St",
      isActive: true,
    };
    const result = planningApplicationSchema.safeParse(valid);
    expect(result.success).toBe(true);
    expect(result.data).toMatchObject(valid);
  });

  it("rejects missing required fields", () => {
    const invalid = {};
    const result = planningApplicationSchema.safeParse(invalid);
    expect(result.success).toBe(false);
    expect(result.error?.issues.map((i) => i.path.join("."))).toEqual(
      expect.arrayContaining([
        "applicationNumber",
        "location",
        "applicationStage",
        "address",
      ]),
    );
  });

  it("rejects when showOpenSpace is true but openSpaceArea is missing", () => {
    const invalid = {
      applicationNumber: "A1",
      location: { lat: 1, lng: 2 },
      applicationStage: {
        stage: "Consultation",
        status: { consultation: "in progress" },
      },
      address: "123 Test St",
      showOpenSpace: true,
    };
    const result = planningApplicationSchema.safeParse(invalid);
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].path).toEqual(["openSpaceArea"]);
    expect(result.error?.issues[0].message).toMatch(/open space area/i);
  });

  it("rejects when showJobs is true but jobs is missing", () => {
    const invalid = {
      applicationNumber: "A1",
      location: { lat: 1, lng: 2 },
      applicationStage: {
        stage: "Consultation",
        status: { consultation: "in progress" },
      },
      address: "123 Test St",
      showJobs: true,
    };
    const result = planningApplicationSchema.safeParse(invalid);
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].path).toEqual(["jobs"]);
    expect(result.error?.issues[0].message).toMatch(/jobs information/i);
  });

  it("rejects when proposedLandUse.suiGeneris is true but suiGenerisDetail is missing", () => {
    const invalid = {
      applicationNumber: "A1",
      location: { lat: 1, lng: 2 },
      applicationStage: {
        stage: "Consultation",
        status: { consultation: "in progress" },
      },
      address: "123 Test St",
      proposedLandUse: { suiGeneris: true },
    };
    const result = planningApplicationSchema.safeParse(invalid);
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toMatch(
      /suiGenerisDetail must be provided/i,
    );
  });
});

describe("planningApplicationsSchema", () => {
  it("accepts an array of valid applications", () => {
    const valid = [
      {
        applicationNumber: "A1",
        location: { lat: 1, lng: 2 },
        applicationStage: {
          stage: "Consultation",
          status: { consultation: "in progress" },
        },
        address: "123 Test St",
      },
      {
        applicationNumber: "A2",
        location: { lat: 3, lng: 4 },
        applicationStage: {
          stage: "Decision",
          status: { decision: "approved" },
        },
        address: "456 Test Ave",
      },
    ];
    const result = planningApplicationsSchema.safeParse(valid);
    expect(result.success).toBe(true);
    expect(result.data).toHaveLength(2);
  });

  it("rejects if any application in the array is invalid", () => {
    const invalid = [
      {
        applicationNumber: "A1",
        location: { lat: 1, lng: 2 },
        applicationStage: {
          stage: "Consultation",
          status: { consultation: "in progress" },
        },
        address: "123 Test St",
      },
      {
        // Missing required fields
      },
    ];
    const result = planningApplicationsSchema.safeParse(invalid);
    expect(result.success).toBe(false);
    expect(result.error?.issues.length).toBeGreaterThan(0);
  });
});
