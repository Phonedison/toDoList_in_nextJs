"use client";

import { AddTask } from "@/actions/add-task";
import { Tasks } from "@/generated/prisma";
import { ReactNode, useCallback, useEffect, useState } from "react";
import { TaskContext } from "..";
import { getTask } from "../../actions/get-task-from-bd";

interface TaskProviderProps {
  children: ReactNode;
}

export const TaskProvider = ({ children }: TaskProviderProps) => {
  const [listItens, setListItens] = useState<Tasks[]>([]);

  const fetchTasks = useCallback(async () => {
    try {
      const data = await getTask();
      if (data) setListItens(data);
    } catch (error) {
      console.error("Erro ao carregar tarefas:", error);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const addTask = async (task: string) => {
    if (task.length === 0 || !task) return;
    await AddTask(task);
    await fetchTasks();
  };

  return (
    <TaskContext.Provider value={{ addTask, listItens }}>
      {children}
    </TaskContext.Provider>
  );
};
