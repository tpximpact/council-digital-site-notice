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
export const WithCouncilName: Story = {
  args: {
    globalConfig: {
      councilName: "Test",
    },
  },
};
export const WithLogo: Story = {
  args: {
    globalConfig: {
      councilName: "Test",
      logo: {
        _type: "image",
        asset: {
          _ref: "image-2cbc1b3cd555f9b0363faa840bc48ffb515f9a2a-320x113-svg",
          _type: "reference",
        },
      },
    },
  },
};
