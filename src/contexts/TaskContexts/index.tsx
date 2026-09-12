"use client";

import { AddTask } from "@/actions/add-task";
import { DeleteTask } from "@/actions/delete-task";
import { ToggleDone } from "@/actions/toggle-done";
import { Tasks } from "@/generated/prisma";
import { ReactNode, useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { TaskContext } from "..";
import { getTask } from "../../actions/get-task-from-bd";

interface TaskProviderProps {
  children: ReactNode;
}

export const TaskProvider = ({ children }: TaskProviderProps) => {
  const [listItens, setListItens] = useState<Tasks[]>([]);
  const [task, setTask] = useState<Tasks>();

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
      toast.success("Ativididade adicionada com sucesso!");
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
      if (!deletedTask) return;
      toast.warning("Atividade deletada com sucesso!");
    } catch (error) {
      throw error;
    } finally {
      await fetchTasks();
    }
  };

  const alterTask = async (id: string) => {
    const previousTaks = [...listItens];
    try {
      setListItens((prev) => {
        const updatedTaskList = prev.map((task: Tasks) => {
          if (task.id === id) {
            return {
              ...task,
              done: !task.done,
            };
          } else {
            return task;
          }
        });

        return updatedTaskList;
      });
      await ToggleDone(id);
    } catch (error) {
      setListItens(previousTaks);
      throw error;
    } finally {
      await fetchTasks();
    }
  };

  return (
    <TaskContext.Provider value={{ addTask, listItens, deleteTask, alterTask }}>
      {children}
    </TaskContext.Provider>
  );
};
