import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { ChangeEvent } from "react";

interface FieldInputProps {
  name: string;
  label: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export default function FieldInput({
  name,
  label,
  type,
  value,
  placeholder,
  onChange
}: FieldInputProps) {
  return (
    <div className="w-full">
      <Label htmlFor={name}>{label}</Label>
      <Input type={type} value={value} placeholder={placeholder} onChange={onChange}/>
    </div>
  );
}
