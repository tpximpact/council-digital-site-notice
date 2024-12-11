import type { Meta, StoryObj } from "@storybook/react";
import Details from ".";

const meta = {
  title: "DSN Components/Details",
  component: Details,
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
    summary: "Learn more about application types",
    // color?: string;
    // className?: string;
    description: <>hello</>,
  },
} satisfies Meta<typeof Details>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const White: Story = {
  args: {
    isInverted: true,
  },
};
