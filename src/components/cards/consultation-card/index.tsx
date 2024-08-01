import { FunctionComponent } from "react";
import "./style.css";

interface ConsultationCardProps {
  doctorName: string;
  doctorEmail: string;
  doctorPhone: string;
  dateBooked: string;
  illness: string;
}

const ConsultationCard: FunctionComponent<ConsultationCardProps> = ({
  doctorName,
  doctorEmail,
  doctorPhone,
  dateBooked,
  illness,
}) => {
  const date = new Date(dateBooked);

  return (
    <div className="consultation-card">
      <div className="consultation-card-header">
        <h2>Appointment Details</h2>
      </div>
      <div className="consultation-card-body">
        <p>
          <strong>Doctor:</strong> {doctorName}
        </p>
        <p>
          <strong>Email:</strong> {doctorEmail}
        </p>
        <p>
          <strong>Phone:</strong> {doctorPhone}
        </p>
        <p>
          <strong>Date Booked:</strong>{" "}
          {`${date.getDay()} - ${date.getMonth()} - ${date.getFullYear()}`}
        </p>
        <p>
          <strong>Illness:</strong> {illness}
        </p>
      </div>
    </div>
  );
};

export default ConsultationCard;
