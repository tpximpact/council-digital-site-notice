import { savefeedbackToGoogleSheet } from "@/actions/googleSheet";
import { GoogleSpreadsheet } from "google-spreadsheet";
import { JWT } from "google-auth-library";

jest.mock("google-spreadsheet", () => {
  return {
    GoogleSpreadsheet: jest.fn().mockImplementation(() => ({
      loadInfo: jest.fn(),
      sheetsByIndex: [
        {
          addRow: jest.fn(),
        },
      ],
    })),
  };
});
jest.mock("google-auth-library", () => ({
  JWT: jest.fn(),
}));

describe("savefeedbackToGoogleSheet", () => {
  const OLD_ENV = process.env;
  const mockData = { foo: "bar" };

  beforeEach(() => {
    jest.clearAllMocks();
    process.env = {
      ...OLD_ENV,
      GOOGLE_SERVICE_ACCOUNT_EMAIL: "test@test.com",
      GOOGLE_SERVICE_PRIVATE_KEY: "key",
      COMMENT_SPREADSHEET_ID: "spreadsheet123",
    };
  });

  afterAll(() => {
    process.env = OLD_ENV;
  });

  it("returns false if env vars are missing", async () => {
    process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL = "";
    const result = await savefeedbackToGoogleSheet(mockData);
    expect(result).toBe(false);
  });

  it("returns true if row is added successfully", async () => {
    const docInstance =
      (GoogleSpreadsheet as unknown as jest.Mock).mock.instances[0] ||
      new (GoogleSpreadsheet as any)();
    docInstance.loadInfo = jest.fn();
    docInstance.sheetsByIndex = [
      { addRow: jest.fn().mockResolvedValue(undefined) },
    ];

    (GoogleSpreadsheet as unknown as jest.Mock).mockImplementation(
      () => docInstance,
    );

    const result = await savefeedbackToGoogleSheet(mockData);
    expect(docInstance.loadInfo).toHaveBeenCalled();
    expect(docInstance.sheetsByIndex[0].addRow).toHaveBeenCalledWith(mockData);
    expect(result).toBe(true);
  });

  it("returns false if an error is thrown", async () => {
    const docInstance =
      (GoogleSpreadsheet as unknown as jest.Mock).mock.instances[0] ||
      new (GoogleSpreadsheet as any)();
    docInstance.loadInfo = jest.fn().mockRejectedValue(new Error("fail"));
    docInstance.sheetsByIndex = [{ addRow: jest.fn() }];

    (GoogleSpreadsheet as unknown as jest.Mock).mockImplementation(
      () => docInstance,
    );

    const result = await savefeedbackToGoogleSheet(mockData);
    expect(result).toBe(false);
  });
});
