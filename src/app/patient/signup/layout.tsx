import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Patient Signup",
};

export default function PatientSignupLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
