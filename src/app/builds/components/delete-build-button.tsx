"use client";

import { Button } from "@/components/ui/button";
import { useTransition } from "react";

type Props = {
  buildId: string;
  deleteAction: (formData: FormData) => void;
};

export function DeleteBuildButton({ buildId, deleteAction }: Props) {
  const [isPending, startTransition] = useTransition();

  const handleClick = () => {
    if (!confirm("Delete build?")) {
      return;
    }

    const fd = new FormData();
    fd.set("buildId", buildId);

    startTransition(() => deleteAction(fd));
  };

  return (
    <Button
      type="button"
      variant="destructive"
      size="sm"
      disabled={isPending}
      onClick={handleClick}
    >
      Delete
    </Button>
  );
}
