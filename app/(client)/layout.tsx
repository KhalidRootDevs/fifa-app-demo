import { Footer } from "@/components/layouts/client/footer";
import { Header } from "@/components/layouts/client/header";
import { ScrollToTop } from "@/components/scroll-to-top";
import type React from "react";

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-1 pt-12">{children}</main>

      {/* Footer */}
      <Footer />

      {/* Scroll to top button */}
      <ScrollToTop />
    </div>
  );
}
