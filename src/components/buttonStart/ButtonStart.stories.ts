import type { Meta, StoryObj } from "@storybook/react";
import ButtonStart from ".";

const meta = {
  title: "DSN Components/ButtonStart",
  component: ButtonStart,
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
} satisfies Meta<typeof ButtonStart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Button: Story = {
  args: {
    onClick: () => {
      console.log("Button clicked");
    },
  },
};
export const Link: Story = {
  args: {
    href: "/",
  },
};
export const NoSpacing: Story = {
  args: {
    noSpacing: true,
  },
};
