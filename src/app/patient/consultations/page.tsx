"use client";

import { FunctionComponent, useEffect, useState } from "react";
import "./page.css";
import ConsultationCard from "@/components/cards/consultation-card";
import { fetchService } from "@/services/fetch_services";

interface PatientDoctorConsultationsProps {}

const PatientDoctorConsultations: FunctionComponent<
  PatientDoctorConsultationsProps
> = () => {
  const [consultations, setConsultations] = useState<{ [key: string]: any }[]>(
    []
  );

  const fetchConsultations = async () => {
    const res = await fetchService({
      method: "GET",
      endpoint: `/consultation/patient`,
    });

    if (res.code == 200) {
      setConsultations(res.data.consultations);
    } else {
      alert(res.data.message);
    }
  };

  useEffect(() => {
    fetchConsultations();
  }, []);

  return (
    <main className="consultations">
      <section className="consultations-grid">
        {consultations.map((data, index) => {
          return (
            <ConsultationCard
              key={index}
              doctorName={data.doctorName}
              doctorEmail={data.doctorEmail}
              doctorPhone={data.doctorPhone}
              dateBooked={data.dateBooked}
              illness={data.illness}
            />
          );
        })}
      </section>
    </main>
  );
};

export default PatientDoctorConsultations;
