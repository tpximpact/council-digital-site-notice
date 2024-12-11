import type { Meta, StoryObj } from "@storybook/react";
import ImageGallery from ".";

const meta = {
  title: "DSN Components/ImageGallery",
  component: ImageGallery,
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
    images: [
      {
        asset: {
          _ref: "image-e9c3904ab9ac08d68a2fb9badcd64fbcb128355d-1920x1216-webp",
          _type: "reference",
        },
        _type: "image",
      },
      {
        _type: "image",
        _key: "6ff035b78176",
        asset: {
          _ref: "image-df98cd040f22ca5365ea28254d4ba072a4860fcf-1396x1187-png",
          _type: "reference",
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
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
