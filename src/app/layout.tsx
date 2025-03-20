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
      <header>
        <nav>
          <ul>
            <li><a href="/auth/login">Logowanie</a></li>
            <li><a href="/auth/register">Rejestracja</a></li>
            <li><a href="/dashboard">Dashboard</a></li>
          </ul>
        </nav>
      </header>
        <main>{children}</main>
      <footer>
        <p>&copy; {new Date().getFullYear()} To-Do App</p>
      </footer>
      </body>
    </html>
  );
}
