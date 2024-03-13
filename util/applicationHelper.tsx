export const aplicationStageStyle = (value: string) => {
  const style: { [key: string]: string } = {
    approved: "approved-status",
    "pending approval": "approved-status",
    refused: "rejected-status",
    successful: "approved-status",
    unsuccessful: "refected-status",
  };

  return style[value?.toLowerCase()] || "default-status";
};

export const applicationStageMessage = (stage: string, status: string) => {
  const consultation: { [key: string]: string } = {
    "in progress":
      "People in the local community can share feedback and comment on the proposed plans.",
    extended:
      "People in the local community can share feedback and comment on the proposed plans",
  };

  const assessment: { [key: string]: string } = {
    "in progress":
      "Assessment of the application is being made by the appropriate authorities. People in the local community can still comment on the plans until a decision is made.",
  };

  const decision: { [key: string]: string } = {
    approved: "This planning application has been approved.",
    decision:
      "This planning application has been approved pending legal confirmation.",
    rejected: "This planning application has been rejected.",
  };

  const appeal: { [key: string]: string } = {
    "in progress":
      "An appeal has been lodged to try to change the decision about this application.",
    successful:
      "The initial decision has been overturned in appeal, and the application is now approved.",
    unsucessful:
      "The initial decision has been upheld in appeal, and the application is still rejected.",
  };

  const message: { [key: string]: string } = {
    Consultation: consultation[status],
    Assessment: assessment[status],
    Decision: decision[status],
    Appeal: appeal[status],
  };
  return message[stage];
};
