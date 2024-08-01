import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Patient",
};

export default function PatientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
