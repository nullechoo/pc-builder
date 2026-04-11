"use client";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Component } from "@/lib/types";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef } from "react";
import { useFormStatus } from "react-dom";
import { SaveBuildFromState } from "../actions";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedByCategory: Record<string, Component | null>;
  defaultName?: string;
  redirectPath?: string;
};

const initialState: SaveBuildFromState = {
  status: "idle",
};

export function SaveBuildDialog({
  open,
  onOpenChange,
  selectedByCategory,
  defaultName,
  redirectPath,
}: Props) {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const { pending } = useFormStatus();
  //const [] = useActionState();

  const componentIds = useMemo(
    () =>
      Object.values(selectedByCategory)
        .filter((component): component is Component => component !== null)
        .map((component) => component.id),
    [selectedByCategory],
  );

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) {
      formRef.current?.reset();
    }

    onOpenChange(nextOpen);
  };

  useEffect(() => {}, [onOpenChange, redirectPath, router]);

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Save build</DialogTitle>
          <DialogDescription>Enter build name</DialogDescription>
        </DialogHeader>
        <form ref={formRef} className="space-y-4">
          <Input
            name="name"
            placeholder="Example: Gamer PC"
            defaultValue={defaultName}
            required
          />
          <input
            type="hidden"
            name="componentIds"
            value={componentIds.join(",")}
          />

          <DialogFooter>
            <Button
              type="submit"
              disabled={pending || componentIds?.length < 1}
            >
              {pending ? "Saving..." : "Save"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
