import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  columnClasses?: string;
  currency?: boolean;
  error?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  columnClasses,
  id,
  currency,
  error,
  ...inputProps
}: InputProps) => {
  return (
    <div className={`field column ${columnClasses}`}>
      <label htmlFor={id}>{label}</label>
      <div className="control">
        <input className="input" id={id} {...inputProps}></input>
        <p className="help is-danger"> {error}</p>
      </div>
    </div>
  );
};
