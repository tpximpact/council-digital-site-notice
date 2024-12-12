import type { Meta, StoryObj } from "@storybook/react";
import PlanningApplicationList from ".";

const meta = {
  title: "DSN Components/PlanningApplicationList",
  component: PlanningApplicationList,
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
    data: [
      {
        _id: "029235b5-96ff-4352-8b48-aa437ca06b5b",
        image_head: {
          _type: "image",
          asset: {
            _ref: "image-e9c3904ab9ac08d68a2fb9badcd64fbcb128355d-1920x1216-webp",
            _type: "reference",
          },
        },
        name: "Great Ormond Street Hospital Children's Cancer Centre (Frontage Building)",
        applicationNumber: "2022/2255/P",
        applicationName: null,
        address:
          "Great Ormond Street Childrens Hospital, Frontage Building Great Ormond Street London WC1N 3JH",
      },
      {
        applicationNumber: "2024/0993/P",
        applicationName: null,
        address: "135-149 Shaftesbury Avenue London WC2H 8AH",
        _id: "0799f739-9dff-4850-97f0-85f129c4330c",
        image_head: {
          _type: "image",
          asset: {
            _ref: "image-f1054a6aac24931ec307ca179a6c38c87bf8e529-818x719-jpg",
            _type: "reference",
          },
        },
        name: "Odeon site, Shaftesbury Ave",
      },
      {
        _id: "1c750da5-fe43-4190-b01e-5b15d54d37d6",
        image_head: {
          _type: "image",
          asset: {
            _ref: "image-510debe5e5b5c044e9db55b2f7a2b32f4368d0db-2253x1237-jpg",
            _type: "reference",
          },
        },
        name: "Darwin Court, Gloucester Avenue",
        applicationNumber: "2024/1039/P",
        applicationName: null,
        address: "Darwin Court Gloucester Avenue London NW1 7BG",
      },
      {
        _id: "1c7d849b-d6e1-4405-89b2-a0c54e53d488",
        image_head: {
          _type: "image",
          asset: {
            _type: "reference",
            _ref: "image-d50cb586e12d4f3918cea63d458578d7b349a9fc-1920x715-webp",
          },
        },
        name: "O2 site",
        applicationNumber: "2022/0528/P",
        applicationName: null,
        address: "The O2 Masterplan Site  Finchley Road London NW3 6LU",
      },
      {
        image_head: {
          _type: "image",
          asset: {
            _ref: "image-91c4e55459b4be810c5fb755a5db7f4723ab91a4-1920x814-webp",
            _type: "reference",
          },
        },
        name: "The London Tunnels",
        applicationNumber: "2023/5103/P",
        applicationName: null,
        address:
          "Chancery Station House 31-33 High Holborn London Camden WC1V 6AX",
        _id: "23a5a590-9b01-4084-90c0-721acf99c7c5",
      },
      {
        name: "University College School ",
        applicationNumber: "2023/5366/P",
        applicationName: null,
        address: "University College School Frognal London NW3 6XH",
        _id: "2be80a3e-1f31-48c6-a409-ff7b6858c7c1",
        image_head: {
          _type: "image",
          asset: {
            _ref: "image-0d78f33fa21fa9f5d0e9610365ab25d342248929-1920x1458-webp",
            _type: "reference",
          },
        },
      },
    ],
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
export const WithDistance: Story = {
  args: {
    data: [
      {
        applicationName: null,
        address: "British Museum Great Russell Street London WC1E 7JW",
        distance: 0.1,
        _id: "47f8ecac-1a6b-4561-802d-399acb0ce9e5",
        image_head: {
          _type: "image",
          asset: {
            _ref: "image-06b23e7b1b61136a4cf9e0d0cce8d9e6cb3457b9-1920x1127-webp",
            _type: "reference",
          },
        },
        name: "British Museum SWEC",
        applicationNumber: "2023/4648/P",
      },
      {
        _id: "7c6023f9-3d1d-4eb3-9407-bf5284832cc2",
        image_head: {
          asset: {
            _ref: "image-e94c03dc23b5e52a2f6f59a35d9eb50e995ffcab-1920x1596-webp",
            _type: "reference",
          },
          _type: "image",
        },
        name: "55 Tottenham Court Road & 16-24 Whitfield Street",
        applicationNumber: "2023/3808/P",
        applicationName: null,
        address:
          "55 Tottenham Court Road & 16-24 Whitfield Street London W1T 2EL & W1T 2RA",
        distance: 0.2,
      },
      {
        _id: "4b3365c0-162a-4de4-b0cb-3678e72ffebd",
        image_head: {
          _type: "image",
          asset: {
            _ref: "image-94b22a75998acc1820f7e01fb923d2e05ead2153-502x446-png",
            _type: "reference",
          },
        },
        name: "Travelodge Hotel, Drury Lane",
        applicationNumber: "2024/0436/P",
        applicationName: null,
        address: "Travelodge Hotel 10 Drury Lane London WC2B 5RE",
        distance: 0.3,
      },
      {
        address: "135-149 Shaftesbury Avenue London WC2H 8AH",
        distance: 0.4,
        _id: "0799f739-9dff-4850-97f0-85f129c4330c",
        image_head: {
          _type: "image",
          asset: {
            _ref: "image-f1054a6aac24931ec307ca179a6c38c87bf8e529-818x719-jpg",
            _type: "reference",
          },
        },
        name: "Odeon site, Shaftesbury Ave",
        applicationNumber: "2024/0993/P",
        applicationName: null,
      },
      {
        _id: "7b2cc660-f72a-44bf-b7f2-2ef5c435fdc0",
        image_head: {
          _type: "image",
          asset: {
            _ref: "image-96b58f739164e6a3d8531a7f7e93cb6e70857807-1920x1200-webp",
            _type: "reference",
          },
        },
        name: "Brunswick Centre Hub Hotel",
        applicationNumber: "2023/3870/P",
        applicationName: null,
        address: "Brunswick Centre Estate Brunswick Centre London WC1N 1AE",
        distance: 0.4,
      },
      {
        applicationNumber: "2022/2255/P",
        applicationName: null,
        address:
          "Great Ormond Street Childrens Hospital, Frontage Building Great Ormond Street London WC1N 3JH",
        distance: 0.4,
        _id: "029235b5-96ff-4352-8b48-aa437ca06b5b",
        image_head: {
          _type: "image",
          asset: {
            _type: "reference",
            _ref: "image-e9c3904ab9ac08d68a2fb9badcd64fbcb128355d-1920x1216-webp",
          },
        },
        name: "Great Ormond Street Hospital Children's Cancer Centre (Frontage Building)",
      },
    ],
  },
};
