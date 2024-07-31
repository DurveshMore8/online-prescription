import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Doctor Signup",
};

export default function DoctorSignupLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
