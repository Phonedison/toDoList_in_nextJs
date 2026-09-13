"use server";

import { prisma } from "@/utils/db";

export const EditTask = async (id: string, newValue: string) => {
  try {
    if (!id) return;

    const editTask = await prisma.tasks.update({
      where: { id },
      data: {
        task: newValue,
      },
    });
    if (!editTask) return;
    return editTask;
  } catch (error) {
    throw error;
  }
};
