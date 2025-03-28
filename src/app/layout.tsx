import "@/styles/global.scss";
import React from 'react'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl">
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}
