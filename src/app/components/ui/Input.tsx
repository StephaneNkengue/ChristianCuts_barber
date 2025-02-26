import { InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
};

export default function Input({ label, className, ...props }: InputProps) {
  return (
    <div className="flex flex-col w-full">
      {label && <label className="mb-1 text-sm font-medium">{label}</label>}
      <input
        className={`border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
        {...props}
      />
    </div>
  );
}
