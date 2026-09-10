"use server";

import { prisma } from "@/utils/db";

export const getTask = async () => {
  try {
    const tasks = await prisma.tasks.findMany();
    if (!tasks) return;
    console.log(tasks);
    return tasks;
  } catch (error) {
    throw error;
  }
};
