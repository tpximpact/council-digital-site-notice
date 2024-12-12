import type { Meta, StoryObj } from "@storybook/react";
import DataPoints from ".";

const meta = {
  title: "DSN Components/DataPoints",
  component: DataPoints,
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
      { key: "new homes", value: "100" },
      { key: "affordable housing", value: "20%" },
      { key: "additional demand on GPs and hospitals", value: "12%" },
      { key: "square meters", value: "21,360" },
    ],
  },
} satisfies Meta<typeof DataPoints>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
