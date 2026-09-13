"use client";

import { AddTask } from "@/actions/add-task";
import { DeleteTask } from "@/actions/delete-task";
import { EditTask } from "@/actions/edit-task";
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
  const [loading, setLoading] = useState<boolean>(false);

  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getTask();
      if (data) setListItens(data);
    } catch (error) {
      console.error("Erro ao carregar tarefas:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const addTask = async (task: string) => {
    try {
      if (task.length === 0 || !task) {
        toast.error("Insira uma atividade!");
        return;
      }
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

  const alterConclusion = async (id: string) => {
    const previousTaks = [...listItens];
    try {
      setListItens((prev) => {
        const updatedTaskList = prev.map((task: Tasks) => {
          if (task.id === id) {
            toast.info("status da tarefa alterada!");
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

  const alterTask = async (idTask: string, newTask: string) => {
    try {
      if (!idTask) return;

      const oldTask = listItens?.find((item) => item.id === idTask);
      if (!oldTask) return;

      if (oldTask.task !== newTask) await EditTask({ idTask, newTask });
      else toast.info("Mesmo As informações não foram alteradas");
    } catch (error) {
      throw error;
    } finally {
      await fetchTasks();
    }
  };

  const qtdTask = () => {
    const qtdItem = listItens.length;
    const qtdItemConcluded = listItens.filter(
      (item) => item.done === true,
    ).length;

    return { qtdItem, qtdItemConcluded };
  };
  return (
    <TaskContext.Provider
      value={{
        addTask,
        deleteTask,
        alterConclusion,
        alterTask,
        listItens,
        isLoading: loading,
        qtdTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
