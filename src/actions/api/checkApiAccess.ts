"use server";
import { getGlobalContent } from "@/actions/sanityClient";

export const checkApiAccess = async (
  apiKey?: string | null,
): Promise<{ status: number; message: string } | null> => {
  // Check for API key
  if (!apiKey) {
    return { status: 401, message: "Invalid API key" };
  }

  // Verify API key
  const isValidApiKey = process.env.OUR_API_KEY === apiKey;

  if (!isValidApiKey) {
    return { status: 401, message: "Invalid API key" };
  }

  // Check if uniform integration is enabled
  const globalContent = await getGlobalContent();
  const integrationMethod = globalContent?.integrations ?? "manual";
  if (integrationMethod !== "uniformAPI") {
    return { status: 403, message: "Uniform integration is not enabled" };
  }

  // Return null if access is allowed
  return null;
};
