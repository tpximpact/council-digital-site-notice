import type { Meta, StoryObj } from "@storybook/react";
import ApplicationStatus from ".";

const fakeConsultationDeadline = (daysAhead: number) => {
  // Get today's date
  const today = new Date();

  // Add 20 days to today's date
  const futureDate = new Date(today);
  futureDate.setDate(today.getDate() + daysAhead);

  // Format the date as YYYY-MM-DD
  const year = futureDate.getFullYear();
  const month = String(futureDate.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const day = String(futureDate.getDate()).padStart(2, "0");

  const formattedDate = `${year}-${month}-${day}`;

  return formattedDate;
};

const meta = {
  title: "DSN Components/ApplicationStatus",
  component: ApplicationStatus,
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
} satisfies Meta<typeof ApplicationStatus>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ConsultationInProgress: Story = {
  args: {
    applicationStage: {
      stage: "Consultation",
      status: {
        consultation: "in progress",
      },
    },
  },
};
export const ConsultationExtended: Story = {
  args: {
    applicationStage: {
      stage: "Consultation",
      status: {
        consultation: "extended",
      },
    },
  },
};
export const AssessmentInProgress: Story = {
  args: {
    applicationStage: {
      stage: "Assessment",
      status: {
        assessment: "in progress",
      },
    },
  },
};
export const DecisionApproved: Story = {
  args: {
    applicationStage: {
      stage: "Decision",
      status: {
        decision: "approved",
      },
    },
  },
};
export const DecisionPendingApproval: Story = {
  args: {
    applicationStage: {
      stage: "Decision",
      status: {
        decision: "pending approval",
      },
    },
  },
};
export const DecisionRejected: Story = {
  args: {
    applicationStage: {
      stage: "Decision",
      status: {
        decision: "rejected",
      },
    },
  },
};
export const AppealInProgress: Story = {
  args: {
    applicationStage: {
      stage: "Appeal",
      status: {
        appeal: "in progress",
      },
    },
  },
};
export const AppealUnsuccessful: Story = {
  args: {
    applicationStage: {
      stage: "Appeal",
      status: {
        appeal: "unsuccessful",
      },
    },
  },
};
export const AppealSuccessful: Story = {
  args: {
    applicationStage: {
      stage: "Appeal",
      status: {
        appeal: "successful",
      },
    },
  },
};
export const Invalid: Story = {
  args: {
    applicationStage: {
      stage: "s",
      status: {
        appeal: "bob",
      },
    },
  },
};
export const ConsultationWithDeadlineInProgress: Story = {
  args: {
    consultationDeadline: fakeConsultationDeadline(20),
    applicationStage: {
      stage: "Consultation",
      status: {
        consultation: "in progress",
      },
    },
  },
};
export const ConsultationWithDeadlineExtended: Story = {
  args: {
    consultationDeadline: fakeConsultationDeadline(20),
    applicationStage: {
      stage: "Consultation",
      status: {
        consultation: "extended",
      },
    },
  },
};
export const ConsultationWithExpiredDeadlineInProgress: Story = {
  args: {
    consultationDeadline: fakeConsultationDeadline(-20),
    applicationStage: {
      stage: "Consultation",
      status: {
        consultation: "in progress",
      },
    },
  },
};
