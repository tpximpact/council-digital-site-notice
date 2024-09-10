export async function register() {
  if (process.env.NEXT_PUBLIC_API_MOCKING === "enabled") {
    const { default: initMocks } = await import("../mocks");
    await initMocks();
  }
}
