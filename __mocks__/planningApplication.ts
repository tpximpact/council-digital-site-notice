import { PlanningApplication } from "@/sanity/types";

export const mockedPlanningApplication: PlanningApplication = {
  _id: "abc123",
  _type: "planning-application",
  _createdAt: "2025-05-19T14:04:47Z",
  _updatedAt: "2025-05-19T14:05:29Z",
  _rev: "CY5pHqPqEI8JLzWplpGZiI",
  isActive: true,
  planningId: "mocked-planning-id",
  applicationNumber: "mocked-application-number",
  // populateApi
  applicationType: "mocked-application-type",
  name: "Mocked Application",
  description: "This is a mocked application description.",
  address: "123 Mocked St, Mocked City, MC1 2AB",
  applicationUpdatesUrl: "https://mocked-updates-url.com",
  applicationDocumentsUrl: "https://mocked-documents-url.com",
  image_head: {
    asset: {
      _ref: "image-e9c3904ab9ac08d68a2fb9badcd64fbcb128355d-1920x1216-webp",
      _type: "reference",
    },
    _type: "image",
  },
  image_gallery: [
    {
      asset: {
        _ref: "image-df98cd040f22ca5365ea28254d4ba072a4860fcf-1396x1187-png",
        _type: "reference",
      },
      _type: "image",
      _key: "6ff035b78176",
    },
    {
      _type: "image",
      _key: "b10cf3f91144",
      asset: {
        _ref: "image-c2d91542f80eaf2e4fe0e0dd7810ac2a10f5005f-1939x1584-png",
        _type: "reference",
      },
    },
  ],
  applicationStage: {
    stage: "Consultation",
    status: {
      appeal: "in progress",
      assessment: "in progress",
      consultation: "in progress",
      decision: "approved",
    },
  },
  enableComments: true,
  consultationDeadline: "2025-12-31",
  height: 10,
  constructionTime: "12 months",
  location: { _type: "geopoint", lat: 51.555168, lng: -0.144057 },
  proposedLandUse: {
    classB: true,
    classC: true,
    classE: true,
    classF: true,
    suiGeneris: true,
  },
  showOpenSpace: true,
  openSpaceArea: 100,
  showHousing: true,
  housing: {
    residentialUnits: 10,
    affordableResidentialUnits: 50,
  },
  showCarbon: true,
  carbonEmissions: 10,
  showAccess: true,
  access: "Mocked access information.",
  showJobs: true,
  jobs: {
    min: 5,
    max: 20,
  },
  // comments: []
};
