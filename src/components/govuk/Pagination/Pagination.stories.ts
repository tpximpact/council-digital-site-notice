import type { Meta, StoryObj } from "@storybook/react";
import { Pagination } from "./Pagination";

const meta = {
  title: "GOV UK Components/Pagination",
  component: Pagination,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  // tags: ["autodocs"],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: "fullscreen",
  },
  args: {
    pagination: {
      page: 50,
      total_pages: 100,
    },
    baseUrl: "search",
    searchParams: {
      page: 1,
      postcode: "value",
    },
  },
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

// show page numbers for:

// the current page
// at least one page immediately before and after the current page
// first and last pages
// Use ellipses (…) to replace any skipped pages. For example:

// [1] 2 … 100
// 1 [2] 3 … 100
// 1 2 [3] 4 … 100
// 1 2 3 [4] 5 … 100
// 1 … 4 [5] 6 … 100
// 1 … 97 [98] 99 100
// 1 … 98 [99] 100
// 1 … 99 [100]

export const FirstPage: Story = {
  args: {
    pagination: {
      page: 1,
      total_pages: 100,
    },
  },
};

export const SecondPage: Story = {
  args: {
    pagination: {
      page: 2,
      total_pages: 100,
    },
  },
};

export const ThirdPage: Story = {
  args: {
    pagination: {
      page: 3,
      total_pages: 100,
    },
  },
};

export const FourthPage: Story = {
  args: {
    pagination: {
      page: 4,
      total_pages: 100,
    },
  },
};

export const FifthPage: Story = {
  args: {
    pagination: {
      page: 5,
      total_pages: 100,
    },
  },
};

export const NinetyEighthPage: Story = {
  args: {
    pagination: {
      page: 98,
      total_pages: 100,
    },
  },
};

export const NinetyNinthPage: Story = {
  args: {
    pagination: {
      page: 99,
      total_pages: 100,
    },
  },
};

export const LastPage: Story = {
  args: {
    pagination: {
      page: 100,
      total_pages: 100,
    },
  },
};

export const HigherThanPossiblePage: Story = {
  args: {
    pagination: {
      page: 101,
      total_pages: 100,
    },
  },
};

export const LowerThanPossiblePage: Story = {
  args: {
    pagination: {
      page: 0,
      total_pages: 100,
    },
  },
};

export const EvenLowerThanPossiblePage: Story = {
  args: {
    pagination: {
      page: -1,
      total_pages: 100,
    },
  },
};

export const MoreItemsThanPages: Story = {
  args: {
    pagination: {
      page: 101,
      total_pages: 100,
    },
  },
};

export const BlockPage: Story = {
  args: {
    pagination: undefined,
    prev: {
      href: "prev-page",
    },
    next: { href: "next-page" },
  },
};

export const BlockWithDescriptionPage: Story = {
  args: {
    pagination: undefined,
    prev: {
      labelText: "Applying for a provisional lorry or bus licence",
      href: "prev-page",
      page: 1,
    },
    next: {
      labelText: "Driver CPC part 1 test: theory",
      href: "next-page",
      page: 2,
    },
  },
};
