import type { Meta, StoryObj } from "@storybook/react";
import { ContentNoResult } from "./ContentNoResult";

const meta = {
  title: "Content/No result",
  component: ContentNoResult,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: "fullscreen",
  },
  args: {},
} satisfies Meta<typeof ContentNoResult>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
