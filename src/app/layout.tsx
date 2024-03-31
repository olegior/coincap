import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { Content } from "antd/es/layout/layout";
import AppHeader from "@/components/Header/Header";
import '@a1rth/css-normalize';
import "./globals.css";
import StoreProvider from "@/lib/store/StoreProvider";

const inter = Inter({ subsets: ["latin","cyrillic"] });

export const metadata: Metadata = {
  title: "Currency | Coincap",
  authors: [{ name: 'olegior', url: 'https://github.com/olegior/' }],
};

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AntdRegistry>
          <StoreProvider>
            <AppHeader />
            <Content className="content">
              {children}
            </Content>
          </StoreProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
