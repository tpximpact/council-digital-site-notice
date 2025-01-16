import type { Meta, StoryObj } from "@storybook/react";
import { ArrowLink } from "./ArrowLink";

import "./Pagination.scss";

const meta = {
  title: "GOV UK Components/Pagination/ArrowLink",
  component: ArrowLink,
  decorators: [
    (Story, { args }) => {
      // since this isn't an external component we can add a decorator here
      return (
        <div
          className={`govuk-pagination ${args.blockLevel ? "govuk-pagination--block" : ""}`}
        >
          <Story />
        </div>
      );
    },
  ],

  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  // tags: ["autodocs"],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: "fullscreen",
  },
  args: {},
} satisfies Meta<typeof ArrowLink>;

export default meta;
type Story = StoryObj<typeof meta>;

export const PreviousButton: Story = {
  args: {
    type: "prev",
    blockLevel: false,
    link: {
      href: "",
      page: 1,
      searchParams: {
        resultsPerPage: 10,
        page: 1,
        query: "value",
      },
    },
  },
};
export const NextButton: Story = {
  args: {
    type: "next",
    blockLevel: false,
    link: {
      href: "",
      page: 2,
      searchParams: {
        resultsPerPage: 10,
        page: 2,
        query: "value",
      },
    },
  },
};
export const PreviousBlockButton: Story = {
  args: {
    type: "prev",
    blockLevel: true,
    link: {
      href: "apply",
      labelText: "Applying for a provisional lorry or bus licence",
    },
  },
};
export const NextBlockButton: Story = {
  args: {
    type: "next",
    blockLevel: true,
    link: {
      href: "theory",
      labelText: "Driver CPC part 1 test: theory",
    },
  },
};
