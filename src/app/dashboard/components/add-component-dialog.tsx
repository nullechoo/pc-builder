"use client";

import {
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Component } from "@/lib/types";
import { useEffect, useState } from "react";
import { getComponentsByCategory } from "../actions";
import { ComponentCard } from "./component-card";

type Props = {
  categoryId: string;
  categotyName: string;
  onSelect: (component: Component) => void;
};

export function AddComponentDialogContent({
  categoryId,
  categotyName,
  onSelect,
}: Props) {
  const [components, setComponents] = useState<Component[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getComponentsByCategory(categoryId).then((data) => {
      setComponents(data);
      setLoading(false);
    });
  }, [categoryId]);

  return (
    <DialogContent className="max-w-4xl w-[90vw] max-h-[85vh] overflow-hidden flex flex-col">
      <DialogHeader>
        <DialogTitle>Add component - {categotyName}</DialogTitle>
      </DialogHeader>
      <DialogDescription className="overflow-y-auto flex-1 mx-1 px-1">
        <>
          {" "}
          {components.length > 0 ? (
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {components.map((c) => (
                <ComponentCard
                  key={c.id}
                  name={c.name}
                  price={c.price}
                  onClick={() => onSelect(c)}
                />
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground text-sm py-4">
              {loading ? "Loading..." : "No components available"}
            </p>
          )}
        </>
      </DialogDescription>
    </DialogContent>
  );
}
