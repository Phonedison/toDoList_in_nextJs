"use server";

import { prisma } from "@/utils/db";

export const AddTask = async (newTask: string) => {
  try {
    if (!newTask) return;
    const addTask = await prisma.tasks.create({
      data: { task: newTask, done: false },
    });
    console.log(addTask);
  } catch (error) {
    throw error;
  }
};
