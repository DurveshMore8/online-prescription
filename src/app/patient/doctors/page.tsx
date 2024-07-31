"use client";

import { FunctionComponent, useEffect, useState } from "react";
import "./page.css";
import { fetchService } from "@/services/fetch_services";
import DoctorCard from "@/components/cards/doctor-card";

interface PatientHomeProps {}

const PatientHome: FunctionComponent<PatientHomeProps> = () => {
  const [doctors, setDoctors] = useState<{ [key: string]: any }[]>([]);

  const fetchDoctors = async () => {
    const res = await fetchService({
      method: "GET",
      endpoint: "/user/doctor-list",
    });

    if (res.code == 200) {
      setDoctors(res.data.doctors);
      console.log(res.data.doctors);
    } else {
      alert(res.data.message);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  return (
    <main className="doctors">
      <section className="doctors-grid">
        {doctors.map((doctor, index) => {
          return (
            <DoctorCard
              key={index}
              id={doctor.id}
              image={doctor.profileImage}
              name={doctor.name}
              speciality={doctor.speciality}
            />
          );
        })}
      </section>
    </main>
  );
};

export default PatientHome;
