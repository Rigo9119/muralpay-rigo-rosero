import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type SelectOption = {
  value: string;
  label: string;
};

interface FieldSelectProps {
  value: string;
  label: string;
  options: SelectOption[];
  onChange: (value: string) => void;
}

export default function FieldSelect({
  value,
  label,
  options,
  onChange,
}: FieldSelectProps) {
  return (
    <div className="w-full">
      <Label>{label}</Label>
      <Select onValueChange={onChange} defaultValue={value}>
        <SelectTrigger>
          <SelectValue placeholder="Select customer type" />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
