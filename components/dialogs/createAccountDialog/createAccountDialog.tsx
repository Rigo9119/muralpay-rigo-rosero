"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import CreateAccount from "@/components/forms/createAccountForm/createAccountForm";
import { useState } from "react";

export default function CreateAccountDialog() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-emerald-600">Create an account</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create account</DialogTitle>
          <DialogDescription>
            Fill in the information below to create your account.
          </DialogDescription>
        </DialogHeader>
        <CreateAccount onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
} 