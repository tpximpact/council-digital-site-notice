import { GlobalContent } from "@/sanity/types";

export const mockedGlobalContent: GlobalContent = {
  _id: "globalContent",
  _type: "global-content",
  _createdAt: "2025-05-16T09:25:23Z",
  _updatedAt: "2025-05-19T14:03:53Z",
  _rev: "mek9s7VrMMCOgOiJ1k10WK",
  integrations: "manual", //"manual" | "openAPI" | "uniformAPI"
  globalEnableComments: false,
  concernUrl: "mocked concern url",
  concernContent: "mocked concern content",
  feedbackUrl: "mocked feedback url",
  councilName: "Mocked Council Name",
  signUpUrl: "mocked sign up url",
  planningProcessUrl: "mocked planning process url",
  materialConsiderationUrl: "mocked material consideration url",
  howToGetInvolveUrl: "mocked how to get involved url",
  logo: {
    _type: "image",
    asset: {
      _ref: "image-d7dd879ad7a1fda9259d6f072efc171e0f398833-10x14-svg",
      _type: "reference",
    },
  },
  favicon: {
    _type: "image",
    asset: {
      _ref: "image-d7dd879ad7a1fda9259d6f072efc171e0f398833-10x14-svg",
      _type: "reference",
    },
  },
  googleAnalytics: "ga",
  googleTagManager: "gtm",
};
