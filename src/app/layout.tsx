import type {Metadata} from "next";
import {Geist, Geist_Mono} from "next/font/google";
import "./globals.css";
import {SessProvider} from "@/app/session";
import Header from "@/app/components/Layout/Header";
import Footer from "@/app/components/Layout/Footer";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "My Notepad",
    description: "Easily and quickly create and save notes",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body
            className={`flex h-screen flex-col ${geistSans.variable} ${geistMono.variable} antialiased`}
        >
        <SessProvider>
            <div>
                <Header/>
            </div>
            <div className={`flex p-normal w-full h-full`}>
                {children}
            </div>
            <div>
                <Footer/>
            </div>
        </SessProvider>
        </body>
        </html>
    );
}
