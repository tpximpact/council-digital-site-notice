export function verifyApiKey(key: string): boolean {
    return process.env.NEXT_PUBLIC_API_KEY === key;
}
