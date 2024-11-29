import "@/styles/globals.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

import AuthProvider from "@/context/AuthProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-slate-950">
        <AuthProvider>
          <main className="flex flex-col h-screen">{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}
