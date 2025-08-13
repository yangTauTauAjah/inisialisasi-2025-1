import { Geist, Geist_Mono, Ubuntu } from "next/font/google";
import "@ant-design/v5-patch-for-react-19";
import { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css"; // Import global CSS
import { GlobalStateProvider } from "../../contexts/GlobalStateContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const ubuntu = Ubuntu({
  variable: "--font-ubuntu",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Inisiasi 2025",
  description: "Webpage pengumupulan tugas untuk Inisiasi 2025",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const header = await headers();
  const studentId = header.get("x-student-id");
  
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${ubuntu.variable} antialiased`}
        style={{
          background: "var(--primary-bg)",
          color: "var(--primary-text)",
          margin: 0,
          padding: 0,
          minHeight: "100vh"
        }}
      >
        <GlobalStateProvider initialNim={studentId || undefined}>
          {children}
        </GlobalStateProvider>
      </body>
    </html>
  );
}
