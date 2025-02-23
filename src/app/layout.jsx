import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Chatify",
  description: "Messaging between friends.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-bg`}
      >
        <Toaster
          toastOptions={{
            unstyled: true,
            classNames: {
              success:
                "flex w-full border-3 border-border justify-start px-4 items-center text-lg text-black gap-2 bg-bg text-text rounded-xl py-4",
              error:
                "flex w-full border-3 border-border justify-start px-4 items-center text-lg text-black gap-2 bg-bg text-text rounded-xl py-4",
            },
          }}
        />
        {children}
      </body>
    </html>
  );
}
