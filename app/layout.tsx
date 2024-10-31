import type { Metadata } from "next";
import localFont from "next/font/local";
import "@/app/css/satoshi.css";
import "@/app/css/style.css";
import ImageTitre from "@/components/communs/image-titre";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        suppressHydrationWarning={true}
        className={`antialiased`}
      >
        {/* Header */}
        <header className="bg-green-900 text-white p-4 shadow-lg">
          <div className="max-w-7xl mx-auto flex justify-center items-center">
            <span className="self-center">
              <ImageTitre width={50} />
              <h1 className="text-xl sm:text-2xl font-light">Sev - Semence pour la vie</h1>
            </span>
          </div>
        </header>
        <div className="">
          {children}
        </div>
      </body>
    </html>
  );
}
