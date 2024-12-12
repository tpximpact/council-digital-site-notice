import type { Meta, StoryObj } from "@storybook/react";
import FormSearch from ".";

const meta = {
  title: "DSN Components/FormSearch",
  component: FormSearch,
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
    locationNotFound: false,
    onSearchPostCode: () => {},
    setPostcode: () => {},
  },
} satisfies Meta<typeof FormSearch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const LocationNotFound: Story = {
  args: {
    locationNotFound: true,
    postcode: "1234",
  },
};
