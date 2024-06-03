const socketUrl = process.env.NEXT_PUBLIC_SOCKET_URL as string;
const apiUrl = process.env.NEXT_PUBLIC_API_URL as string;

export const env = {
  socketUrl,
  apiUrl,
};
