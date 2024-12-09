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
      address:
        "Great Ormond Street Childrens Hospital, Frontage Building Great Ormond Street London WC1N 3JH",
      image_head: {
        _type: "image",
        asset: {
          _ref: "image-e9c3904ab9ac08d68a2fb9badcd64fbcb128355d-1920x1216-webp",
          _type: "reference",
        },
      },
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
      name: "Great Ormond Street Hospital Children's Cancer Centre (Frontage Building)",
      _id: "029235b5-96ff-4352-8b48-aa437ca06b5b",
      applicationNumber: "2022/2255/P",
      applicationStage: {
        status: {
          decision: "approved",
          consultation: "in progress",
        },
        stage: "Decision",
      },
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
