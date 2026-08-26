import { ReactNode } from "react";

interface FormInputProps {
  id: string;
  name: string;
  label: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  autoComplete?: string;
  required?: boolean;
  icon?: ReactNode;
}

export default function FormInput({
  id,
  name,
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  autoComplete,
  required = true,
  icon,
}: FormInputProps) {
  return (
    <div>
      <label htmlFor={id} className="auth-label">
        {label}
      </label>
      <div className="relative">
        {icon && (
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-hotel-navy-400">
            {icon}
          </div>
        )}
        <input
          id={id}
          name={name}
          type={type}
          required={required}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete={autoComplete}
          className={`auth-input ${icon ? "pl-11" : ""}`}
        />
      </div>
    </div>
  );
}
