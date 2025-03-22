import "@/styles/global.scss";
import React from 'react'
import { Navbar } from '@/components/Navbar/Navbar'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl">
      <body>
      <Navbar />
        <main>{children}</main>
      <footer>
        <p>&copy; {new Date().getFullYear()} To-Do App</p>
      </footer>
      </body>
    </html>
  );
}
