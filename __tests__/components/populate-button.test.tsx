import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import PopulateButton from "@/components/populate-button";
import "@testing-library/jest-dom";
import { useDocumentOperation, useFormValue } from "sanity";
import { getGlobalContent } from "@/actions/sanityClient";
import { fetchOpenApiData } from "@/actions/integrations";

const patchExecuteMock = jest.fn();
jest.mock("sanity", () => ({
  useFormValue: jest.fn(),
  useDocumentOperation: jest.fn(() => ({
    patch: { execute: patchExecuteMock },
  })),
}));

jest.mock("@/actions/sanityClient", () => ({
  getGlobalContent: jest.fn(),
}));

jest.mock("@/actions/integrations", () => ({
  fetchOpenApiData: jest.fn(),
}));

jest.mock("@sanity/ui", () => ({
  Button: ({ children, loading, onClick, ...props }: any) => (
    <button data-loading={loading ? "true" : "false"} onClick={onClick}>
      {props.text || children}
    </button>
  ),
  Card: ({ children, ...props }: any) => (
    <div data-testid="card" {...props}>
      {children}
    </div>
  ),
  Text: ({ children, ...props }: any) => <span {...props}>{children}</span>,
}));

jest.mock("@sanity/icons", () => ({
  ApiIcon: () => "apiIcon",
}));

describe("PopulateButton", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("does not render if integrationMethod is not openAPI", async () => {
    (useFormValue as jest.Mock).mockImplementation((path) => {
      if (path[0] === "applicationNumber") return "123";
      if (path[0] === "_id") return "drafts.abc";
    });
    (getGlobalContent as jest.Mock).mockResolvedValue({
      integrations: "manual",
    });

    render(<PopulateButton />);

    await waitFor(() => {
      expect(screen.queryByRole("button")).not.toBeInTheDocument();
    });
  });

  it("renders if integrationMethod is openAPI", async () => {
    (useFormValue as jest.Mock).mockImplementation((path) => {
      if (path[0] === "applicationNumber") return "123";
      if (path[0] === "_id") return "drafts.abc";
    });
    (getGlobalContent as jest.Mock).mockResolvedValue({
      integrations: "openAPI",
    });

    render(<PopulateButton />);

    await waitFor(() => {
      expect(screen.queryByRole("button")).not.toBeInTheDocument();
    });
  });

  it("shows button and handles successful fetch", async () => {
    (useFormValue as jest.Mock).mockImplementation((path) => {
      if (path[0] === "applicationNumber") return "123";
      if (path[0] === "_id") return "drafts.abc";
    });
    (getGlobalContent as jest.Mock).mockResolvedValue({
      integrations: "openAPI",
    });
    (fetchOpenApiData as jest.Mock).mockResolvedValue([
      {
        application_type: "TypeA",
        name: "Test Name",
        development_address: "123 Test St",
        development_description: "A test description",
        longitude: "1.23",
        latitude: "4.56",
      },
    ]);

    render(<PopulateButton />);
    const button = await screen.findByRole("button", {
      name: /fetch from openAPI/i,
    });
    fireEvent.click(button);

    await waitFor(() => {
      expect(patchExecuteMock).toHaveBeenCalled();
      expect(
        screen.getByText(/data fetched successfully/i),
      ).toBeInTheDocument();
    });
  });

  it("shows error if application number is missing", async () => {
    (useFormValue as jest.Mock).mockImplementation((path) => {
      if (path[0] === "applicationNumber") return undefined;
      if (path[0] === "_id") return "drafts.abc";
    });
    (getGlobalContent as jest.Mock).mockResolvedValue({
      integrations: "openAPI",
    });

    render(<PopulateButton />);
    const button = await screen.findByRole("button", {
      name: /fetch from openAPI/i,
    });
    fireEvent.click(button);

    await waitFor(() => {
      expect(patchExecuteMock).not.toHaveBeenCalled();
      expect(
        screen.getByText(/application number is required/i),
      ).toBeInTheDocument();
    });
  });

  it("shows error if fetchOpenApiData throws", async () => {
    (useFormValue as jest.Mock).mockImplementation((path) => {
      if (path[0] === "applicationNumber") return "123";
      if (path[0] === "_id") return "drafts.abc";
    });
    (getGlobalContent as jest.Mock).mockResolvedValue({
      integrations: "openAPI",
    });
    (fetchOpenApiData as jest.Mock).mockRejectedValue(new Error("API error"));

    render(<PopulateButton />);
    const button = await screen.findByRole("button", {
      name: /fetch from openAPI/i,
    });
    fireEvent.click(button);

    await waitFor(() => {
      expect(patchExecuteMock).not.toHaveBeenCalled();
      expect(
        screen.getByText(/Could not fetch the data. API error/i),
      ).toBeInTheDocument();
    });
  });

  it("shows error if formId or patch is missing", async () => {
    (useFormValue as jest.Mock).mockImplementation((path) => {
      if (path[0] === "applicationNumber") return "123";
      if (path[0] === "_id") return undefined;
    });
    (getGlobalContent as jest.Mock).mockResolvedValue({
      integrations: "openAPI",
    });

    render(<PopulateButton />);
    const button = await screen.findByRole("button", {
      name: /fetch from openAPI/i,
    });
    fireEvent.click(button);

    await waitFor(() => {
      expect(patchExecuteMock).not.toHaveBeenCalled();
      expect(
        screen.getByText(
          /Form ID, Document ID, or Patch function is not available./i,
        ),
      ).toBeInTheDocument();
    });
  });
});
