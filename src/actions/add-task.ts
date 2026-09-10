"use server";

import { prisma } from "@/utils/db";

export const AddTask = async (newTask: string) => {
  try {
    if (!newTask) return;
    const newItem = await prisma.tasks.create({
      data: { task: newTask, done: false },
    });
  } catch (error) {
    throw error;
  }
};
