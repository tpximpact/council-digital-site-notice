import { setupWorker } from "msw/browser";
import { handlers } from "./handlers";

export const worker = setupWorker(...handlers);

export const startWorker = async () => {
  try {
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      await worker.start({
        serviceWorker: {
          url: `${window.location.origin}/mockServiceWorker.js`,
        },
        onUnhandledRequest: "bypass",
      });
      console.log("MSW worker started successfully");
    } else {
      console.warn(
        "MSW cannot be started. Service workers are not supported in this environment.",
      );
    }
  } catch (error) {
    console.error("Failed to start MSW worker:", error);
  }
};
