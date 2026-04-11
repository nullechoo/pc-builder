"use client";

import {
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
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
  categotyName: categoryName,
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
        <DialogTitle>Add component - {categoryName}</DialogTitle>
      </DialogHeader>
      <ScrollArea className="h-120 rounded-md border">
        <div className="p-4">
          {components.length > 0 ? (
            <div className="grid gap-3 grid-cols-2">
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
            <div className="text-muted-foreground text-sm py-4">
              {loading ? "Loading..." : "No components available"}
            </div>
          )}
        </div>
      </ScrollArea>
    </DialogContent>
  );
}
