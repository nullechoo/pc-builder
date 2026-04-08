"use server";

import { prisma } from "@/lib/db";
import { categotyIdToDbType, Component } from "@/lib/types";

export async function getComponentsByCategory(
  categoryId: string,
): Promise<Component[]> {
  const dbType = categotyIdToDbType[categoryId];

  if (!dbType) {
    return [];
  }

  const components = await prisma.component.findMany({
    where: {
      type: dbType,
    },
    orderBy: {
      price: "asc",
    },
  });

  return components;
}
