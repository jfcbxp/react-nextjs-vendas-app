import { FormatUtils } from "@4us-dev/utils";
import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  columnClasses?: string;
  error?: string;
  formatter?: (value: string) => string;
}

export const Input: React.FC<InputProps> = ({
  id,
  label,
  columnClasses,
  error,
  formatter,
  onChange,
  ...inputProps
}: InputProps) => {
  const onInputChange = (event: any) => {
    const value = event.target.value;
    const name = event.target.name;

    const formattedValue = (formatter && formatter(value)) || value;
    onChange &&
      onChange({
        ...event,
        target: {
          name,
          value: formattedValue,
        },
      });
  };

  return (
    <div className={`field column ${columnClasses}`}>
      <label htmlFor={id}>{label}</label>
      <div className="control">
        <input
          className="input"
          onChange={onInputChange}
          id={id}
          {...inputProps}
        ></input>
        <p className="help is-danger"> {error}</p>
      </div>
    </div>
  );
};

export const InputMoney: React.FC<InputProps> = (props: InputProps) => {
  const formatUtils = new FormatUtils();
  return <Input {...props} formatter={formatUtils.formatOnlyIntegers} />;
};

export const InputCpf: React.FC<InputProps> = (props: InputProps) => {
  const formatUtils = new FormatUtils();
  return <Input {...props} formatter={formatUtils.formatCPF} />;
};

export const InputTelefone: React.FC<InputProps> = (props: InputProps) => {
  const formatUtils = new FormatUtils();
  return <Input {...props} formatter={formatUtils.formatPhone} />;
};
