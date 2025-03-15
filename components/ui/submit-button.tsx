"use client";

import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";
import { CgSpinner } from "react-icons/cg";

export default function SubmitButton({ children }: { children: React.ReactNode }) {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" variant="secondary" className="px-10" disabled={pending}>
      {pending ?
        <CgSpinner className="animate-spin" />
        :
        children
      }
    </Button>
  )
}