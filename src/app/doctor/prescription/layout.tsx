import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Prescription",
};

export default function DoctorHomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
