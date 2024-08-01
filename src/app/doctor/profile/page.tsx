"use client";

import { FunctionComponent, useEffect, useState } from "react";
import "./page.css";
import { fetchService } from "@/services/fetch_services";
import Image from "next/image";

interface DoctorProfileProps {}

const DoctorProfile: FunctionComponent<DoctorProfileProps> = () => {
  const [doctor, setDoctor] = useState<{ [key: string]: any }>({});

  const getDoctor = async () => {
    const res = await fetchService({
      method: "GET",
      endpoint: "/user/user-by-token",
    });

    if (res.code == 200) {
      setDoctor(res.data);
    } else {
      alert(res.data.message);
    }
  };

  useEffect(() => {
    getDoctor();
  }, [doctor]);

  return (
    <main className="profile-page">
      <div className="profile-header">
        <div className="profile-image">
          {doctor.profileImage ? (
            <Image
              src={doctor.profileImage}
              alt={`${doctor.name}'s profile`}
              width={100}
              height={100}
            />
          ) : (
            <div className="placeholder-image">No Image</div>
          )}
        </div>
        <h1 className="profile-name">{doctor.name}</h1>
      </div>
      <div className="profile-info">
        <p>
          <strong>Speciality:</strong> {doctor.speciality}
        </p>
        <p>
          <strong>Email:</strong> {doctor.email}
        </p>
        <p>
          <strong>Phone Number:</strong> {doctor.phoneNumber}
        </p>
        <p>
          <strong>Experience:</strong> {doctor.experience} years
        </p>
      </div>
    </main>
  );
};

export default DoctorProfile;
