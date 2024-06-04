"use client";

import { useInitSocket, useServiceWorker } from "../model";

export const Composer = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  useInitSocket({ maxRetries: 5 });
  useServiceWorker();
  return <>{children}</>;
};
