"use client";

import { AddTask } from "@/actions/add-task";
import { DeleteTask } from "@/actions/delete-task";
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
    try {
      if (task.length === 0 || !task) return;
      await AddTask(task);
    } catch (error) {
      throw error;
    } finally {
      await fetchTasks();
    }
  };

  const deleteTask = async (id: string) => {
    try {
      if (!id) return;

      const deletedTask = await DeleteTask(id);

      if (deletedTask) return;
    } catch (error) {
      throw error;
    } finally {
      await fetchTasks();
    }
  };

  return (
    <TaskContext.Provider value={{ addTask, listItens, deleteTask }}>
      {children}
    </TaskContext.Provider>
  );
};
