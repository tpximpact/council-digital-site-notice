import { saveComments } from "@/actions/saveComments";
import { sendEmail, createEmailData } from "@/actions/email";
import { savefeedbackToGoogleSheet } from "@/actions/googleSheet";

jest.mock("@/actions/email", () => ({
  sendEmail: jest.fn(),
  createEmailData: jest.fn(),
}));
jest.mock("@/actions/googleSheet", () => ({
  savefeedbackToGoogleSheet: jest.fn(),
}));

describe("saveComments", () => {
  const mockData = {
    applicationNumber: "A1",
    feeling: "positive",
    comment: "Great!",
    postcode: "N1 1AA",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("returns success when email and sheet save succeed", async () => {
    (createEmailData as jest.Mock).mockResolvedValue({
      to: "test@example.com",
    });
    (sendEmail as jest.Mock).mockResolvedValue(undefined);
    (savefeedbackToGoogleSheet as jest.Mock).mockResolvedValue(undefined);

    const result = await saveComments(mockData);
    expect(createEmailData).toHaveBeenCalledWith(
      "A1",
      "positive",
      "Great!",
      "N1 1AA",
    );
    expect(sendEmail).toHaveBeenCalled();
    expect(savefeedbackToGoogleSheet).toHaveBeenCalledWith(mockData);
    expect(result).toEqual({
      message: "Email sent & google sheet saved successfully",
      status: 200,
      ok: true,
    });
  });

  it("returns failure if any error is thrown", async () => {
    (createEmailData as jest.Mock).mockRejectedValue(new Error("fail"));

    const result = await saveComments(mockData);
    expect(result).toEqual({
      message: "Failed to store comments",
      status: 500,
      ok: false,
    });
  });
});
