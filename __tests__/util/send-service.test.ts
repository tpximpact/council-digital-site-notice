import { createEmailData, sendEmail } from "../../util/sendService";
import sgMail from "@sendgrid/mail";

jest.mock("@sendgrid/mail", () => ({
  setApiKey: jest.fn(),
  send: jest.fn().mockResolvedValue({}),
}));

describe("Email Functions", () => {
  let originalEnv: NodeJS.ProcessEnv;

  beforeEach(() => {
    originalEnv = process.env;
    process.env = {
      ...originalEnv,
      FEEDBACK_TO_EMAIL: "test_to@example.com",
      FEEDBACK_FROM_EMAIL: "test_from@example.com",
      SENDGRID_API_KEY: "mock_api_key",
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
    process.env = originalEnv;
  });

  describe("createEmailData", () => {
    it("should create correct email data", async () => {
      const applicationNumber = "12345";
      const feeling = "Happy";
      const comment = "Great service";
      const postcode = "AB123CD";

      const expected = {
        to: process.env.FEEDBACK_TO_EMAIL,
        from: {
          email: process.env.FEEDBACK_FROM_EMAIL,
          name: "Camden Digital Site Notice",
        },
        subject: `New feedback for planning application ${applicationNumber}`,
        html: expect.stringContaining(applicationNumber),
      };

      const data = await createEmailData(
        applicationNumber,
        feeling,
        comment,
        postcode,
      );

      expect(data).toEqual(expected);
    });
  });

  describe("sendEmail function", () => {
    it("calls sgMail.send with the correct options", async () => {
      const emailOptions = {
        to: "recipient@example.com",
        from: { email: "sender@example.com", name: "Test Sender" },
        subject: "Test Subject",
        html: "<p>This is a test</p>",
      };

      await sendEmail(emailOptions);

      expect(sgMail.send).toHaveBeenCalledWith(emailOptions);
    });
  });
});
