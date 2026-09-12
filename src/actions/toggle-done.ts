"use server";

import { prisma } from "@/utils/db";

export const ToggleDone = async (taskId: string) => {
  try {
    if (!taskId) return;

    const currentTask = await prisma.tasks.findUnique({
      where: { id: taskId },
    });

    if (!currentTask) return;

    const updateStatus = await prisma.tasks.update({
      where: { id: taskId },
      data: { done: !currentTask.done },
    });

    if (!updateStatus) return;
  } catch (error) {
    throw error;
  }
};

/* try{}
catch{
} */
