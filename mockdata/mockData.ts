import { faker } from "@faker-js/faker";
import { UniformValidationType } from "../src/app/actions/uniformValidator";

export function generateUniformData(
  overrides: Partial<UniformValidationType> = {},
): UniformValidationType {
  const applicationStageOptions = [
    "Consultation",
    "Assessment",
    "Decision",
    "Appeal",
  ] as const;
  const applicationStage = faker.helpers.arrayElement(applicationStageOptions);

  const statusOptions = {
    Consultation: ["in progress", "extended"] as const,
    Assessment: ["in progress"] as const,
    Decision: ["approved", "pending approval", "rejected"] as const,
    Appeal: ["in progress", "unsuccessful", "successful"] as const,
  };

  const statusKey =
    applicationStage.toLowerCase() as keyof typeof statusOptions;
  const statusValue = faker.helpers.arrayElement(
    statusOptions[applicationStage],
  );

  return {
    applicationNumber: faker.string.uuid(),
    isActive: faker.datatype.boolean(),
    planningId: faker.string.uuid(),
    name: faker.company.name(),
    description: faker.lorem.paragraph(),
    applicationType: faker.helpers.arrayElement([
      "Householder Application",
      "Full Planning Permission",
      "Outline Planning Permission",
    ]),
    address: faker.location.streetAddress(),
    applicationStage: {
      stage: applicationStage,
      status: {
        [statusKey]: statusValue,
      },
    },
    location: {
      lat: faker.location.latitude(),
      lng: faker.location.longitude(),
    },
    proposedLandUse: {
      classB: faker.datatype.boolean(),
      classC: faker.datatype.boolean(),
      classE: faker.datatype.boolean(),
      classF: faker.datatype.boolean(),
      suiGeneris: faker.datatype.boolean(),
      suiGenerisDetail: faker.lorem.sentence(),
    },
    applicationDocumentsUrl: faker.internet.url(),
    applicationUpdatesUrl: faker.internet.url(),
    showOpenSpace: faker.datatype.boolean(),
    openSpaceArea: faker.number.int({ min: 1, max: 1000 }),
    showHousing: faker.datatype.boolean(),
    housing: {
      residentialUnits: faker.number.int({ min: 1, max: 500 }),
      affordableResidentialUnits: faker.number.int({ min: 1, max: 500 }),
    },
    showCarbon: faker.datatype.boolean(),
    carbonEmissions: faker.number.int({ min: 1, max: 10000 }),
    showAccess: faker.datatype.boolean(),
    access: faker.lorem.sentence(),
    showJobs: faker.datatype.boolean(),
    jobs: {
      min: faker.number.int({ min: 1, max: 100 }),
      max: faker.number.int({ min: 1, max: 100 }),
    },
    enableComments: faker.datatype.boolean(),
    consultationDeadline: faker.date.future().toISOString().split("T")[0],
    height: faker.number.float({ min: 1, max: 100 }),
    constructionTime: `${faker.date.future().getFullYear()}-${faker.date.future().getFullYear()}`,
    ...overrides,
  };
}
