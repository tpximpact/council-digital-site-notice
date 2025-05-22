import { createEmailData, sendEmail } from "@/actions/email";
import sgMail from "@sendgrid/mail";

jest.mock("@sendgrid/mail", () => ({
  setApiKey: jest.fn(),
  send: jest.fn(),
}));

describe("createEmailData", () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    process.env = {
      ...OLD_ENV,
      FEEDBACK_TO_EMAIL: "to@example.com",
      FEEDBACK_FROM_EMAIL: "from@example.com",
    };
  });

  afterAll(() => {
    process.env = OLD_ENV;
  });

  it("returns correct email data with all fields", async () => {
    const result = await createEmailData("A1", "happy", "Nice!", "N1 1AA");
    expect(result).toMatchObject({
      to: "to@example.com",
      from: { email: "from@example.com", name: "Camden Digital Site Notice" },
      subject: expect.stringContaining("A1"),
      html: expect.stringContaining("Nice!"),
    });
    expect(result.html).toContain("N1 1AA");
  });

  it("fills in defaults for missing comment and postcode", async () => {
    const result = await createEmailData("A2", "sad");
    expect(result.html).toMatch(/Not provided/);
  });
});

describe("sendEmail", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    process.env.SENDGRID_API_KEY = "SG.key";
  });

  it("calls setApiKey and send with options", async () => {
    const options = {
      to: "to@example.com",
      from: { email: "from@example.com", name: "Test" },
      subject: "Test",
      html: "<p>Test</p>",
    };
    await sendEmail(options);
    expect(sgMail.setApiKey).toHaveBeenCalledWith("SG.key");
    expect(sgMail.send).toHaveBeenCalledWith(options);
  });

  it("does not throw if send fails", async () => {
    (sgMail.send as jest.Mock).mockRejectedValueOnce(new Error("fail"));
    await expect(
      sendEmail({
        to: "to@example.com",
        from: { email: "from@example.com", name: "Test" },
        subject: "Test",
        html: "<p>Test</p>",
      }),
    ).resolves.toBeUndefined();
  });
});
