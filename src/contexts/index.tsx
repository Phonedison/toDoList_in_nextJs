import { Tasks } from "@/generated/prisma";
import { createContext, useContext } from "react";

interface TaskContextType {
  addTask: (task: string) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  alterTask: (id: string, newTask: string) => Promise<void>;
  alterConclusion: (id: string) => Promise<void>;
  deleteAll: () => Promise<void>;
  isConclused?: boolean;
  listItens: Tasks[];
  isLoading: boolean;
  qtdTask: () => { qtdItem: number; qtdItemConcluded: number };
  setFilterId: (id: number) => void;
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
