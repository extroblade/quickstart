import { useEffect, useRef, useState } from "react";

import { socket } from "@/shared/api/socket";

export const useInitSocket = ({ maxRetries }: { maxRetries: number }) => {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const retryCount = useRef(0);

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
      retryCount.current = 0;
    }

    function onDisconnect() {
      setIsConnected(false);
      if (retryCount.current < maxRetries) {
        retryCount.current++;
        console.log(
          `WebSocket disconnected. Retry attempt ${retryCount.current}/${maxRetries}...`,
        );
        setTimeout(() => {
          socket.connect();
        }, 1000);
      } else {
        console.log("Max retries reached. Giving up.");
      }
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, []);

  console.log("WS connected:", isConnected);
};
