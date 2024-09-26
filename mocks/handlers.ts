import { http, HttpResponse } from "msw";
import { faker } from "@faker-js/faker";

const NEXT_PUBLIC_SANITY_PROJECT_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;

const generateMockApplication = (id?: string) => ({
  _id: id || faker.string.uuid(),
  planningId: faker.string.alphanumeric(8).toUpperCase(),
  applicationNumber: faker.string.alphanumeric(8).toUpperCase(),
  applicationName: faker.lorem.words(3),
  name: faker.lorem.words(3),
  address: faker.location.streetAddress(),
  description: faker.lorem.paragraph(),
  enableComments: true,
  consultationDeadline: faker.date.future().toISOString(),
  applicationType: "Full Planning Permission",
  location: {
    latitude: faker.location.latitude(),
    longitude: faker.location.longitude(),
  },
  isActive: true,
  createdAt: faker.date.past().toISOString(),
  applicationStage: {
    stage: "Assessment",
    status: { assessment: "in progress" },
  },
  height: faker.number.int({ min: 1, max: 100 }),
  constructionTime: "2024-2028",
  proposedLandUse: {
    classC: true,
    classE: true,
  },
  showOpenSpace: true,
  openSpaceArea: faker.number.int({ min: 1, max: 100 }),
  showHousing: true,
  housing: {
    residentialUnits: faker.number.int({ min: 1, max: 100 }),
    affordableResidentialUnits: faker.number.int({
      min: 1,
      max: 100,
    }),
  },
  showCarbon: true,
  carbonEmissions: faker.number.int({ min: 1, max: 100 }),
  showAccess: true,
  access: faker.lorem.paragraph(1),
  showJobs: true,
  jobs: {
    min: faker.number.int({ min: 1, max: 50 }),
    max: faker.number.int({ min: 51, max: 100 }),
  },
});

export const handlers = [
  http.get(
    `https://${NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v*/data/query/:dataset`,
    async ({ request }) => {
      const url = new URL(request.url);
      const query = url.searchParams.get("query");
      const params = JSON.parse(url.searchParams.get("$params") || "{}");

      // Handler for getApplicationById
      if (
        query?.includes('_type == "planning-application"') &&
        query?.includes("(_id == $_id || planningId == $_id)") &&
        query?.includes("isActive == true")
      ) {
        const id = params._id || params.planningId;

        const mockApplication = generateMockApplication(id);

        return HttpResponse.json({
          result: [mockApplication],
        });
      }

      // Handler for getActiveApplications
      if (
        query?.includes('_type == "planning-application"') &&
        query?.includes("isActive == true") &&
        !query?.includes("(_id == $_id || planningId == $_id)")
      ) {
        const totalCount = 20;
        const pageSize = 6;
        return HttpResponse.json({
          result: {
            results: Array.from({ length: pageSize }, generateMockApplication),
            total: totalCount,
          },
        });
      }

      // Handler for global-content
      if (query?.includes('_type == "global-content"')) {
        return HttpResponse.json({
          result: [
            {
              _id: "global-content",
              title: faker.company.name(),
              description: faker.company.catchPhrase(),
              lastUpdated: faker.date.recent().toISOString(),
            },
          ],
        });
      }

      // Handler for getActiveApplicationsByLocation
      if (
        query?.includes('_type == "planning-application"') &&
        query?.includes("defined(location)") &&
        query?.includes("isActive == true")
      ) {
        const totalCount = 20;
        const offset = parseInt(url.searchParams.get("$offSet") || "0");
        const limit = parseInt(url.searchParams.get("$itemsPerPage") || "6");
        const latitude = parseFloat(url.searchParams.get("$latitude") || "0");
        const longitude = parseFloat(url.searchParams.get("$longitude") || "0");

        return HttpResponse.json({
          result: {
            results: Array.from(
              { length: Math.min(limit, totalCount - offset) },
              () => ({
                ...generateMockApplication(),
                distance: faker.number.float({
                  min: 0,
                  max: 10,
                  fractionDigits: 1,
                }),
              }),
            ),
            total: totalCount,
          },
        });
      }

      return HttpResponse.json({ error: "Not Found" }, { status: 404 });
    },
  ),
];
