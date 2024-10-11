const pa11y = require("pa11y");
const puppeteer = require("puppeteer");
const { faker } = require("@faker-js/faker");

(async () => {
  let browser;
  let page;

  try {
    // Launch a custom Puppeteer instance
    const browser = await puppeteer.launch({
      args: ["--no-sandbox"],
      headless: true,
    });

    const page = await browser.newPage();

    await page.setRequestInterception(true);

    page.on("request", (request) => {
      if (request.isInterceptResolutionHandled()) return;
      if (
        request
          .url()
          .includes(
            "https://8bgrkltb.api.sanity.io/v2023-05-03/data/query/production?query=*%5B_type+%3D%3D+%22planning-application%22+%26%26+%28_id+%3D%3D+%24_id+%7C%7C+planningId+%3D%3D+%24_id%29+%26%26+isActive+%3D%3D+true%5D&%24_id=%22029235b5-96ff-4352-8b48-aa437ca06b5b%22&%24planningId=%22029235b5-96ff-4352-8b48-aa437ca06b5b%22",
          )
      ) {
        // console.log("sanity");
        // console.log(request.isInterceptResolutionHandled());
        // console.log(request);
        // request.continue();
        request.respond({
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({
            query:
              '*[_type == "planning-application" \u0026\u0026 (_id == $_id || planningId == $_id) \u0026\u0026 isActive == true]',
            result: [
              {
                constructionTime: "3 years",
                showCarbon: true,
                image_gallery: [
                  {
                    _type: "image",
                    _key: "6ff035b78176",
                    asset: {
                      _type: "reference",
                      _ref: "image-df98cd040f22ca5365ea28254d4ba072a4860fcf-1396x1187-png",
                    },
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
                applicationType: "Full Planning Permission",
                applicationNumber: "2022/2255/P",
                carbonEmissions: 11,
                applicationDocumentsUrl:
                  "http://camdocs.camden.gov.uk/HPRMWebDrawer/PlanRec?q=recContainer:%222022/2255/P%22",
                proposedLandUse: {
                  classF: false,
                  suiGeneris: true,
                  classE: false,
                  classC: false,
                  classB: false,
                  suiGenerisDetail: "Hospital",
                },
                enableComments: false,
                address:
                  "Great Ormond Street Childrens Hospital, Frontage Building Great Ormond Street London WC1N 3JH",
                location: { lng: -0.119898, lat: 51.522212 },
                _updatedAt: "2024-03-19T14:21:38Z",
                image_head: {
                  _type: "image",
                  asset: {
                    _ref: "image-e9c3904ab9ac08d68a2fb9badcd64fbcb128355d-1920x1216-webp",
                    _type: "reference",
                  },
                },
                _type: "planning-application",
                planningId: "592523",
                description:
                  "Redevelopment of the Great Ormond Street Hospital (GOSH) Frontage Building comprising demolition of the existing building, and erection of a replacement hospital building (Class C2) with a basement, landscaped amenity spaces at roof top and balcony and ground floor levels, plant equipment, cycle storage, refuse storage and other ancillary and associated works pursuant to the development.",
                _createdAt: "2024-02-22T09:54:45Z",
                name: "TEST Great Ormond Street Hospital Children's Cancer Centre (Frontage Building)",
                _rev: "lNq1tjwfHBHFHBhJCPYIGD",
                applicationStage: {
                  status: { consultation: "in progress", decision: "approved" },
                  stage: "Decision",
                },
                isActive: true,
                _id: "029235b5-96ff-4352-8b48-aa437ca06b5b",
                height: 8,
              },
            ],
            syncTags: ["s1:KwiHBA"],
            ms: 2,
          }),
        });
      } else {
        request.continue();
      }
      // if (request.resourceType() === "xhr") {
      // console.log(request);
      // console.log(request.url());
      // console.log("request:", request.url());
      // console.log("Request method:", request.method());
      // console.log("Request headers:", request.headers());
      // }
    });

    page.on("response", async (response) => {
      if (
        response
          .request()
          .url()
          .includes(
            "https://8bgrkltb.api.sanity.io/v2023-05-03/data/query/production?query=*%5B_type+%3D%3D+%22planning-application%22+%26%26+%28_id+%3D%3D+%24_id+%7C%7C+planningId+%3D%3D+%24_id%29+%26%26+isActive+%3D%3D+true%5D&%24_id=%22029235b5-96ff-4352-8b48-aa437ca06b5b%22&%24planningId=%22029235b5-96ff-4352-8b48-aa437ca06b5b%22",
          )
      ) {
        console.log(await response.json());
        // console.log("response", response.url());
        // console.log("Response headers:", response.headers());
        // console.log("Response body:", await response.text());
      }
      // console.log("response", response.url());
      // console.log("Response status:", response.status());
      // console.log("Response headers:", response.headers());
      // console.log("Response body:", await response.text());
      // console.log(response.url());
    });

    // Run pa11y with the custom Puppeteer instance
    const results = await pa11y(
      "http://localhost:3000/planning-applications/029235b5-96ff-4352-8b48-aa437ca06b5b",
      {
        browser,
        page,
        standard: "WCAG2AA",
        timeout: 60000,
        wait: 5000,
        ignore: ["WCAG2AA.Principle1.Guideline1_4.1_4_3.G18.Fail"],
        log: {
          debug: console.log,
          error: console.error,
          info: console.log,
        },
      },
    );

    // Output the results
    console.log(results);

    // Take a screenshot after running pa11y
    await page.screenshot({ path: "page" + ".jpg", fullPage: true });

    await page.close();
    // Close the browser
    await browser.close();
  } catch (error) {
    // Output an error if it occurred
    console.error(error.message);

    // Close the browser instance and pages if theys exist
    await page.close();
    if (browser) {
      await browser.close();
    }
  }
})();
