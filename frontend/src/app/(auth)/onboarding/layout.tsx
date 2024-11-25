import type { Metadata } from "next";
import "../../globals.css";

export const metadata: Metadata = {
  title: "Onboarding",
  description: "Onboarding",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <div className="flex flex-col scrollbar-hide justify-center items-center h-full w-full scroll-smooth">
      {children}
    </div>
  );
}