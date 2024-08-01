"use client";

import { FunctionComponent, useEffect, useState } from "react";
import "./page.css";
import { fetchService } from "@/services/fetch_services";
import ConsultationCard from "@/components/cards/consultation-card";

interface DoctorPrescriptionProps {}

const DoctorPrescription: FunctionComponent<DoctorPrescriptionProps> = () => {
  const [consultations, setConsultations] = useState<{ [key: string]: any }[]>(
    []
  );

  const fetchConsultations = async () => {
    const res = await fetchService({
      method: "GET",
      endpoint: `/consultation/doctor`,
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
    <main className="prescription">
      <section className="prescription-grid">
        {consultations.map((data, index) => {
          return (
            <ConsultationCard
              key={index}
              name={data.patientName}
              email={data.patientEmail}
              phone={data.patientPhone}
              dateBooked={data.dateBooked}
              illness={data.illness}
            />
          );
        })}
      </section>
    </main>
  );
};

export default DoctorPrescription;
