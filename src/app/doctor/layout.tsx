import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Doctor",
};

export default function DoctorLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
