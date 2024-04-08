import { sendEmail, createEmailData } from "@/app/actions/email";
import { savefeedbackToGoogleSheet } from "@/app/actions/email";
import { saveComments } from "@/app/actions/actions";

jest.mock("../util/actions/email", () => ({
  sendEmail: jest.fn(),
  createEmailData: jest.fn(),
  savefeedbackToGoogleSheet: jest.fn(),
}));

describe("comments API", () => {
  let data: any;

  beforeEach(() => {
    data = {
      applicationNumber: "123",
      feeling: "good",
      comment: "Great job!",
      postcode: "12345",
    };
  });

  it("should send email and save to Google Sheet when POST request is made", async () => {
    jest.mock("../util/actions/actions", () => ({
      saveComments: jest.fn().mockReturnValue({
        status: 200,
        message: "Email sent & google sheet saved successfully",
      }),
    }));

    data = {
      applicationNumber: "123",
      feeling: "good",
      comment: "Great job!",
      postcode: "12345",
    };

    const emailData = {
      /* mock email data */
    };
    createEmailData.mockResolvedValue(emailData);

    const res = await saveComments(data);

    expect(createEmailData).toHaveBeenCalledWith(
      "123",
      "good",
      "Great job!",
      "12345",
    );
    // console.log(res, 'response');
    expect(sendEmail).toHaveBeenCalledWith(emailData);
    expect(savefeedbackToGoogleSheet).toHaveBeenCalledWith(data);
    expect(res.status).toBe(200);
    expect(res.message).toBe("Email sent & google sheet saved successfully");
  });

  it("should return 500 status when error ", async () => {
    jest.mock("../util/actions/actions", () => ({
      saveComments: jest.fn().mockReturnValue({
        status: 500,
        message: "Failed to store comments",
      }),
    }));

    const res = await saveComments(undefined);

    expect(res.status).toBe(500);
    expect(res.message).toBe("Failed to store comments");
  });
});
