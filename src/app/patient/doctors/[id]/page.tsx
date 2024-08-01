/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { ChangeEvent, FunctionComponent, useEffect, useState } from "react";
import "./page.css";
import { useParams, useRouter } from "next/navigation";
import { fetchService } from "@/services/fetch_services";
import Textarea from "@/components/textarea";
import Textfield from "@/components/textfield";
import PaymentPopup from "@/components/popups/payment-popup";

interface PatientDoctorConsultProps {}

const PatientDoctorConsult: FunctionComponent<
  PatientDoctorConsultProps
> = () => {
  const router = useRouter();
  const id = useParams().id;
  const [step, setStep] = useState<number>(1);
  const [viewPayment, setViewPayment] = useState(false);

  const [patient, setPatient] = useState<{ [key: string]: any }>({});
  const [doctor, setDoctor] = useState<{ [key: string]: any }>({});

  const [additionalData, setAdditionalData] = useState<{ [key: string]: any }>({
    surgeryTime: "",
    diabetes: "",
    allergies: "",
    others: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setAdditionalData({ ...additionalData, [e.target.id]: e.target.value });
  };

  const handleNext = () => {
    if (step === 3) {
      setViewPayment(true);
      return;
    }
    setStep(step + 1);
  };

  const handlePrevious = () => {
    if (step != 1) {
      setStep(step - 1);
    }
  };

  const fetchDoctor = async () => {
    const res = await fetchService({
      method: "GET",
      endpoint: `/user/doctor/${id}`,
    });

    if (res.code == 200) {
      setDoctor(res.data);
    } else {
      alert(res.data.message);
    }
  };

  const fetchData = async () => {
    const res = await fetchService({
      method: "GET",
      endpoint: `/user/user-by-token`,
    });

    if (res.code == 200) {
      setPatient(res.data);
      fetchDoctor();
    } else {
      alert(res.data.message);
    }
  };

  const createConsultation = async (transactionId: string) => {
    const res = await fetchService({
      method: "POST",
      endpoint: "/consultation",
      data: {
        doctorName: doctor.name,
        doctorEmail: doctor.email,
        doctorPhone: doctor.phoneNumber,
        patientName: patient.name,
        patientEmail: patient.email,
        patientPhone: patient.phoneNumber,
        illness: patient.illness,
        surgery: patient.surgery,
        ...additionalData,
        transactionId,
      },
    });

    if (res.code == 200) {
      alert(res.data.message);
      setViewPayment(false);
      router.push("/patient/doctors");
    } else {
      alert(res.data.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <main className="consult">
      <section className="doctor-info">
        <h2 className="doctor-name">{doctor.name}</h2>
        <p className="specialty">Specialty: {doctor.speciality}</p>
        <p className="email">
          Email: <a href={`mailto:${doctor.email}`}>{doctor.email}</a>
        </p>
        <p className="phone">Phone: {doctor.phoneNumber}</p>
      </section>
      <section className="form-container">
        {step === 1 && (
          <div className="form-step">
            <h2 className="form-step-head">
              Step 1: Current Illness & Surgery Details
            </h2>
            <div className="form-group">
              <label className="form-group-label" htmlFor="illness">
                Current Illness:
              </label>
              <Textarea
                id="illness"
                value={patient.illness}
                placeholder="Current Illness"
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label className="form-group-label" htmlFor="surgery">
                Current Surgery Details:
              </label>
              <Textarea
                id="surgery"
                value={patient.surgery}
                placeholder="Surgery Details"
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label className="form-group-label" htmlFor="surgeryTime">
                Surgery Time:
              </label>
              <input
                className="form-group-input"
                id="surgeryTime"
                type="date"
                value="Surgery Time"
                onChange={handleChange}
              />
            </div>
            <div className="form-buttons">
              <button
                className="form-button"
                type="button"
                onClick={handleNext}
              >
                Next
              </button>
            </div>
          </div>
        )}
        {step === 2 && (
          <div className="form-step">
            <h2 className="form-step-head">
              Step 2: Additional Health Information
            </h2>
            <div className="form-group">
              <label className="form-group-label" htmlFor="diabetes">
                Do you have diabetes?
              </label>
              <div>
                <label>
                  <input
                    id="diabetes"
                    type="radio"
                    name="diabetes"
                    value="yes"
                    checked={additionalData.diabetes === "yes"}
                    onChange={handleChange}
                  />
                  Yes
                </label>
                <label>
                  <input
                    id="diabetes"
                    type="radio"
                    name="diabetes"
                    value="no"
                    checked={additionalData.diabetes === "no"}
                    onChange={handleChange}
                  />
                  No
                </label>
              </div>
            </div>
            <div className="form-group">
              <label className="form-group-label" htmlFor="allergies">
                Any Allergies:
              </label>
              <Textfield
                id="allergies"
                value={additionalData.allergies}
                placeholder="Enter any allergies"
                type="text"
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label className="form-group-label" htmlFor="others">
                Others:
              </label>
              <Textfield
                id="others"
                value={additionalData.others}
                placeholder="Enter any other issues"
                type="text"
                onChange={handleChange}
              />
            </div>
            <div className="form-buttons">
              <button
                className="form-button"
                type="button"
                onClick={handlePrevious}
              >
                Previous
              </button>
              <button
                className="form-button"
                type="button"
                onClick={handleNext}
              >
                Next
              </button>
            </div>
          </div>
        )}
        {step > 2 && (
          <div className="form-step">
            <h2 className="form-step-head">Step 3: Confirm Details</h2>
            <div className="form-group">
              <span className="form-group-label">
                Current Illness:{" "}
                <span className="form-group-label-value">
                  {patient.illness}
                </span>
              </span>
              <span className="form-group-label">
                Current Surgery Details:{" "}
                <span className="form-group-label-value">
                  {patient.surgery}
                </span>
              </span>
              <span className="form-group-label">
                Surgery Time:{" "}
                <span className="form-group-label-value">
                  {additionalData.surgeryTime}
                </span>
              </span>
              <span className="form-group-label">
                Diabetes:{" "}
                <span className="form-group-label-value">
                  {additionalData.diabetes}
                </span>
              </span>
              <span className="form-group-label">
                Any Allergies:{" "}
                <span className="form-group-label-value">
                  {additionalData.allergies}
                </span>
              </span>
              <span className="form-group-label">
                Others:{" "}
                <span className="form-group-label-value">
                  {additionalData.others}
                </span>
              </span>
            </div>
            <div className="form-buttons">
              <button
                className="form-button"
                type="button"
                onClick={handlePrevious}
              >
                Previous
              </button>
              <button
                className="form-button"
                type="button"
                onClick={handleNext}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </section>
      {viewPayment && (
        <PaymentPopup
          viewPayment={viewPayment}
          setViewPayment={setViewPayment}
          createConsultation={createConsultation}
        />
      )}
    </main>
  );
};

export default PatientDoctorConsult;
