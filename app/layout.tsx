import "@/app/css/satoshi.css";
import "@/app/css/style.css";
import ImageTitre from "@/components/communs/image-titre";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sev - Semence pour la vie",
  description: "Semence pour la vie",
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
        className="antialiased min-h-screen flex flex-col"
      >
        {/* Header */}
        <header className="bg-green-900 text-white p-4 shadow-lg">
          <div className="max-w-7xl mx-auto flex justify-center items-center">
            <Link href="/" className="flex items-center space-x-4 hover:opacity-90 transition-opacity">
              <ImageTitre width={50} />
              <h1 className="text-xl sm:text-2xl font-light">Sev - Semence pour la vie</h1>
            </Link>
          </div>
        </header>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {children}
        </div>
      </body>
    </html>
  );
}
