import { ChangeEvent, FunctionComponent } from "react";
import "./style.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

interface TextareaProps {
  id: string;
  value: string;
  placeholder: string;
  rows?: number;
  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}

const Textarea: FunctionComponent<TextareaProps> = ({
  id,
  value,
  placeholder,
  rows = 4,
  onChange,
}) => {
  return (
    <div className="textarea">
      <textarea
        className={`textarea-input ${inter.className}`}
        id={id}
        onChange={onChange}
        placeholder={placeholder}
        value={value}
        rows={rows}
      />
    </div>
  );
};

export default Textarea;
