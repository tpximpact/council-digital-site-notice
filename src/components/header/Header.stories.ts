import type { Meta, StoryObj } from "@storybook/react";
import Header from ".";

const meta = {
  title: "DSN Components/Header",
  component: Header,
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
  args: {},
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const WithLogo: Story = {
  args: {
    globalConfig: {
      logo: {
        _type: "image",
        asset: {
          _ref: "image-5cde9e98a2fa6341f5957fff4f9a98f00f52ab1a-101x36-png",
          _type: "reference",
        },
      },
    },
  },
};
