"use client";
import { useForm } from "@tanstack/react-form";
import { useCreateAccount } from "@/hooks/mutations/useCreateAccount";
import { Button } from "@/components/ui/button";
import FieldInput from "../components/fieldInput/fileInput";
import FieldSelect from "../components/fieldSelect/fieldSelect";
import { selectOptions } from "./selectOptions";

interface CreateAccountFormProps {
  onSuccess?: () => void;
}

export default function CreateAccount({ onSuccess }: CreateAccountFormProps) {
  const mutation = useCreateAccount({ onSuccess });

  const form = useForm({
    defaultValues: {
      name: "",
      organizationType: "",
    },
    onSubmit: async ({ value }) => {
      mutation.mutate({
        name: value.name,
        organizationType: value.organizationType,
      });
    }
  });

  return (
    <form
      className="flex flex-col items-center justify-center gap-4"
      onSubmit={(event) => {
        event?.preventDefault();
        event?.stopPropagation();
        form.handleSubmit();
      }}
    >
      <form.Field name="name">
        {(field) => {
          return (
            <FieldInput
              name={field.name}
              label={"Name"}
              type={"text"}
              placeholder={field.name}
              value={field.state.value}
              onChange={(event) => field.handleChange(event.target.value)}
            />
          );
        }}
      </form.Field>
      <form.Field name="organizationType">
        {(field) => {
          return (
            <FieldSelect
              label="Organization type"
              value={field.state.value}
              options={selectOptions}
              onChange={field.handleChange}
            />
          );
        }}
      </form.Field>
      <form.Subscribe>
        {() => {
          return (
            <Button type="submit" disabled={mutation.isPending}>
              {mutation.isPending ? "Creating..." : "Create account"}
            </Button>
          );
        }}
      </form.Subscribe>
    </form>
  );
}
