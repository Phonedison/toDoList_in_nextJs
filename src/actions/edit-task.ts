"use server";

import { prisma } from "@/utils/db";

export interface EditProps {
  idTask: string;
  newTask: string;
}

export const EditTask = async ({ idTask, newTask }: EditProps) => {
  try {
    if (newTask) return;

    const editedTask = await prisma.tasks.update({
      where: { id: idTask },
      data: { task: newTask },
    });
    if (!editedTask) return;
  } catch (error) {
    throw error;
  }
};
