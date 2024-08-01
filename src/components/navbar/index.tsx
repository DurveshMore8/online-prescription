"use client";

import { FunctionComponent } from "react";
import "./style.css";
import { usePathname } from "next/navigation";
import Link from "next/link";

interface NavbarProps {}

const Navbar: FunctionComponent<NavbarProps> = () => {
  const pathname = usePathname();

  const doctorNav = [
    {
      name: "Prescription",
      route: "/doctor/prescription",
    },
    {
      name: "Profile",
      route: "/doctor/profile",
    },
    {
      name: "Logout",
      route: "/login",
    },
  ];

  const patientNav = [
    {
      name: "Doctors",
      route: "/patient/doctors",
    },
    {
      name: "Consultations",
      route: "/patient/consultations",
    },
    {
      name: "Logout",
      route: "/login",
    },
  ];

  return (
    pathname !== "/" &&
    pathname.split("/")[1] !== "login" &&
    pathname.split("/")[2] !== "signup" && (
      <nav className="navbar">
        <h2 className="navbar-head">Prescriptioner</h2>
        <ul className="navbar-list">
          {pathname.split("/")[1] === "doctor"
            ? doctorNav.map((doctor, index) => {
                return (
                  <li key={index} className="navbar-list-item">
                    <Link href={doctor.route}>{doctor.name}</Link>
                  </li>
                );
              })
            : patientNav.map((patient, index) => {
                return (
                  <li key={index} className="navbar-list-item">
                    <Link href={patient.route}>{patient.name}</Link>
                  </li>
                );
              })}
        </ul>
      </nav>
    )
  );
};

export default Navbar;
