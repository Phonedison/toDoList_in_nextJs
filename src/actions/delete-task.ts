"use server";

import { prisma } from "@/utils/db";

export const DeleteTask = async (id: string) => {
  try {
    if (!id) return;
    const deletedTask = await prisma.tasks.delete({ where: { id } });
    if (!deletedTask) return;
    return deletedTask;
  } catch (error) {
    throw error;
  }
};

export const DeleteAllTask = async () => {
  try {
    const deletedTask = await prisma.tasks.deleteMany({
      where: { done: true },
    });
    if (!deletedTask) return;
    return deletedTask;
  } catch (error) {
    throw error;
  }
};
