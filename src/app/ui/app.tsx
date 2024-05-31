import "./globals.css";

import { fonts } from "@/shared/consts";

import { ProviderComposer } from "../providers";

export const App = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang='ru' dir='ltr'>
      <body className={fonts.inter.className}>
        <ProviderComposer>{children}</ProviderComposer>
      </body>
    </html>
  );
};
