"use client";

import { useInitSocket } from "../model";

export const Composer = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  useInitSocket();
  return <>{children}</>;
};
