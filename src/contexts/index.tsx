import { Tasks } from "@/generated/prisma";
import { createContext, useContext } from "react";

interface TaskContextType {
  addTask: (task: string) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  alterTask?: () => void;
  isConclused?: boolean;
  listItens: Tasks[];
}

export const TaskContext = createContext<TaskContextType | undefined>(
  undefined,
);

export const useTask = () => {
  const context = useContext(TaskContext);
  if (!context)
    throw new Error("TaskContext deve ser usado dentro de TaskProvider");
  return context;
};
