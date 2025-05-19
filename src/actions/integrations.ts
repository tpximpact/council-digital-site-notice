"use server";

export const fetchOpenApiData = async (applicationNumber: string) => {
  if (!applicationNumber) {
    throw new Error("Application number is required.");
  }

  if (!process.env.OPEN_API_URL) {
    throw new Error("OPEN_API_URL is not defined.");
  }

  const apiUrl = process.env.OPEN_API_URL;

  const url = `${apiUrl}.json?$where=application_number='${applicationNumber.toUpperCase()}'`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch data from OpenAPI");
  }

  const data = await response.json();
  if (data.length === 0) {
    throw new Error("No data found for the given application number");
  }
  return data;
};
