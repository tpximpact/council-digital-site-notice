export const questions: { [key: number]: string } = {
  3: "Design, size or height of new buildings or extensions",
  4: "Use and function of the proposed development",
  5: "Impacts on natural light",
  6: "Privacy of neighbours",
  7: "Access",
  8: "Noise from new uses",
  9: "Traffic, parking or road safety",
  10: "Other",
};

export const phoneRegex =
  /^(((\+44\s?\d{4}|\(?0\d{4}\)?)\s?\d{3}\s?\d{3})|((\+44\s?\d{3}|\(?0\d{3}\)?)\s?\d{3}\s?\d{4})|((\+44\s?\d{2}|\(?0\d{2}\)?)\s?\d{4}\s?\d{4}))(\s?\#(\d{4}|\d{3}))?$/;
export const postCodeRegex =
  /([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9][A-Za-z]?))))\s?[0-9][A-Za-z]{2})/;

export const aplicationStageStyle = (value: string) => {
  const style: { [key: string]: string } = {
    approved: "approved-status",
    "pending approval": "approved-status",
    refused: "rejected-status",
    rejected: "rejected-status",
    successful: "approved-status",
    unsuccessful: "rejected-status",
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
    "pending approval":
      "This planning application has been approved pending legal confirmation.",
    rejected: "This planning application has been rejected.",
  };

  const appeal: { [key: string]: string } = {
    "in progress":
      "An appeal has been lodged to try to change the decision about this application.",
    successful:
      "The initial decision has been overturned in appeal, and the application is now approved.",
    unsuccessful:
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

export function getLocalStorage({ key, defaultValue }: any) {
  const getValue = localStorage.getItem(key);

  let storagedValue = defaultValue;

  if (getValue && getValue !== "undefined") {
    storagedValue = JSON.parse(getValue);
  }

  return storagedValue;
}
