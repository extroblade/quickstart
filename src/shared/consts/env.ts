const socketUrl = process.env.NEXT_PUBLIC_SOCKET_URL as string;
const apiUrl = process.env.NEXT_PUBLIC_API_URL as string;
const ym = process.env.NEXT_PUBLIC_YM as unknown as number;
export const env = {
  socketUrl,
  apiUrl,
  ym,
};
