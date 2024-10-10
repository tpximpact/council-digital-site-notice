export function verifyApiKey(key: string): boolean {
  return process.env.OUR_API_KEY === key;
}
