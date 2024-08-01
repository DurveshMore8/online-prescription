/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import {
  ChangeEvent,
  FunctionComponent,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import "./page.css";
import { useParams } from "next/navigation";
import { fetchService } from "@/services/fetch_services";
import Textarea from "@/components/textarea";
import Button from "@/components/button";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import PdfCard from "@/components/popups/pdf-card";

interface PatientConsultationViewProps {}

const PatientConsultationView: FunctionComponent<
  PatientConsultationViewProps
> = () => {
  const id = useParams().id;
  const [viewPdf, setViewPdf] = useState<boolean>(false);
  const [consultation, setConsultation] = useState<{ [key: string]: any }>({});
  const [doctorView, setDoctorView] = useState<{ [key: string]: any }>({
    careTaken: "",
    medicines: "",
  });

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setDoctorView({ ...doctorView, [e.target.id]: e.target.value });
  };

  const fetchConsultation = async () => {
    const res = await fetchService({
      method: "GET",
      endpoint: `/consultation/${id}`,
    });

    if (res.code == 200) {
      setConsultation(res.data.consultation);
      setDoctorView({
        careTaken: res.data.consultation.careTaken ?? "",
        medicines: res.data.consultation.medicines ?? "",
      });
    } else {
      alert(res.data.message);
    }
  };

  useEffect(() => {
    fetchConsultation();
  }, []);

  return (
    <main className="prescription-view">
      <section className="p-doctor-info">
        <h2 className="p-doctor-name">{consultation.doctorName}</h2>
        <p className="p-email">
          Email:{" "}
          <a href={`mailto:${consultation.doctorEmail}`}>
            {consultation.doctorEmail}
          </a>
        </p>
        <p className="p-phone">Phone: {consultation.doctorPhone}</p>
        <p className="p-phone">Illness: {consultation.illness}</p>
        <p className="p-phone">Surgery: {consultation.surgery}</p>
        <p className="p-phone">Surgery Time: {consultation.surgeryTime}</p>
        <p className="p-phone">Diabetes: {consultation.diabetes}</p>
        <p className="p-phone">Allergies: {consultation.allergies}</p>
        <p className="p-phone">Other: {consultation.others}</p>
      </section>
      <section className="p-doctor-prescription">
        <div className="form-group">
          <label className="form-group-label" htmlFor="surgery">
            Care to be taken:
          </label>
          <Textarea
            id="careTaken"
            value={doctorView.careTaken}
            placeholder="Enter text here.."
            onChange={handleChange}
            isReadOnly={true}
          />
        </div>
        <div className="form-group">
          <label className="form-group-label" htmlFor="surgery">
            Medicines:
          </label>
          <Textarea
            id="medicines"
            value={doctorView.medicines}
            placeholder="Enter text here.."
            onChange={handleChange}
            isReadOnly={true}
          />
        </div>
        <div className="d-form-buttons">
          <Button onClick={() => setViewPdf(true)} type="button" value="View" />
        </div>
      </section>
      <PdfCard
        consultation={consultation}
        view={viewPdf}
        setView={setViewPdf}
      />
    </main>
  );
};

export default PatientConsultationView;
