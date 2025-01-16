import type { Meta, StoryObj } from "@storybook/react";
import commentHead from ".";

const meta = {
  title: "DSN Components/commentHead",
  component: commentHead,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: "fullscreen",
    // https://storybook.js.org/blog/integrate-nextjs-and-storybook-automatically#nextnavigation
    nextjs: {
      appDirectory: true,
    },
  },
  args: {
    application: {
      _id: "029235b5-96ff-4352-8b48-aa437ca06b5b",
      address:
        "Great Ormond Street Childrens Hospital, Frontage Building Great Ormond Street London WC1N 3JH",
      applicationNumber: "2022/2255/P",
      carbonEmissions: 11,
      _rev: "lNq1tjwfHBHFHBhJCPYIGD",
      applicationStage: {
        stage: "Decision",
        status: {
          decision: "approved",
          consultation: "in progress",
        },
      },
      proposedLandUse: {
        classE: false,
        classC: false,
        classB: false,
        suiGenerisDetail: "Hospital",
        classF: false,
        suiGeneris: true,
      },
      enableComments: false,
      applicationDocumentsUrl:
        "http://camdocs.camden.gov.uk/HPRMWebDrawer/PlanRec?q=recContainer:%222022/2255/P%22",
      planningId: "592523",
      description:
        "Redevelopment of the Great Ormond Street Hospital (GOSH) Frontage Building comprising demolition of the existing building, and erection of a replacement hospital building (Class C2) with a basement, landscaped amenity spaces at roof top and balcony and ground floor levels, plant equipment, cycle storage, refuse storage and other ancillary and associated works pursuant to the development.",
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
      isActive: true,
      constructionTime: "3 years",
      showCarbon: true,
      height: 8,
      image_head: {
        asset: {
          _ref: "image-e9c3904ab9ac08d68a2fb9badcd64fbcb128355d-1920x1216-webp",
          _type: "reference",
        },
        _type: "image",
      },
      applicationType: "Full Planning Permission",
      _type: "planning-application",
      _createdAt: "2024-02-22T09:54:45Z",
      name: "Great Ormond Street Hospital Children's Cancer Centre (Frontage Building)",
      location: {
        _type: "geopoint",
        lng: -0.119898,
        lat: 51.522212,
      },
      _updatedAt: "2024-03-19T14:21:38Z",
    },
  },
} satisfies Meta<typeof commentHead>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Inverse: Story = {
  args: {
    isInverted: true,
  },
};
