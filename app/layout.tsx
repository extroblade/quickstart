import type { Metadata } from "next";

import { Layout as Component } from "@/app";
export const metadata: Metadata = {
  title: "Title",
  description: "Description",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <Component>{children}</Component>;
}
