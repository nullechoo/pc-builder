"use client";

import { Button } from "@/components/ui/button";
import { TypographyH1 } from "@/components/ui/typography-h1";
import { ComponentCategories } from "@/lib/constants";
import { Component } from "@/lib/types";
import { useCallback, useState } from "react";
import { TableParts } from "./table";

export const CurrentBuild = () => {
  const [selectedByCategory, setSelectedByCategory] = useState<
    Record<string, Component | null>
  >({});
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);

  const onSelectComponent = useCallback(
    (categoryId: string, component: Component | null) => {
      setSelectedByCategory((prev) => ({ ...prev, [categoryId]: component }));
    },
    [],
  );

  return (
    <>
      <div className="flex justify-between mb-8">
        <TypographyH1>Create your build</TypographyH1>
        <Button onClick={() => setSaveDialogOpen(true)}>Create</Button>
      </div>
      <div className="min-w-0 overflow-x-auto">
        <TableParts
          components={ComponentCategories}
          onSelectedComponent={onSelectComponent}
          selectedByCategory={selectedByCategory}
        />
      </div>
    </>
  );
};
