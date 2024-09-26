async function initMocks() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    // Server-side
    if (typeof window === "undefined") {
      const { server } = await import("./server");
      server.listen({ onUnhandledRequest: "bypass" });
    }
  } else {
    // Client-side
    const { worker } = await import("./browser");
    await worker.start({ onUnhandledRequest: "bypass" });
  }
}

export default initMocks;
