import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import Card from "@mui/material/Card";
import "./globals.css";
import MainToolBar from "@/components/MainToolBar";
import StoreProvider from "./storeProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Employee Manager",
  description: "Employee Manager",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppRouterCacheProvider>
          <StoreProvider>
            <MainToolBar></MainToolBar>
            <Card variant="outlined" className="p-4 m-4">
              {children}
            </Card>
          </StoreProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
