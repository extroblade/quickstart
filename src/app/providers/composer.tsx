"use client";

import { useInitSocket, useServiceWorker } from "../model";

export const Composer = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  //useInitSocket();
  useServiceWorker();
  return <>{children}</>;
};
