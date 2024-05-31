import { io } from "socket.io-client";

import { env } from "@/shared/consts";

export const socket = io(env.socketUrl, {});
