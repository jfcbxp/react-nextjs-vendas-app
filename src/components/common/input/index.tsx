import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  onChange?: (value: any) => void;
  label: string;
  columnClasses?: string;
  currency?: boolean;
}

export const Input: React.FC<InputProps> = ({
  onChange,
  label,
  columnClasses,
  id,
  currency,
  ...inputProps
}: InputProps) => {
  return (
    <div className={`field column ${columnClasses}`}>
      <label htmlFor={id}>{label}</label>
      <div className="control">
        <input
          className="input"
          id={id}
          {...inputProps}
          onChange={(event) => {
            if (event.target.value && currency) {
            }
            if (onChange) {
              onChange(event.target.value);
            }
          }}
        ></input>
      </div>
    </div>
  );
};