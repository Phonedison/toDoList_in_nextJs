"use client";

import { AddTask } from "@/actions/add-task";
import { DeleteAllTask, DeleteTask } from "@/actions/delete-task";
import { EditTask } from "@/actions/edit-task";
import { ToggleDone } from "@/actions/toggle-done";
import { Tasks } from "@/generated/prisma";
import { ReactNode, useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { TaskContext } from "..";
import { getTask } from "../../actions/get-task-from-bd";

interface TaskProviderProps {
  children: ReactNode;
}

export const TaskProvider = ({ children }: TaskProviderProps) => {
  const [listItens, setListItens] = useState<Tasks[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [filterId, setFilterId] = useState<number>(1);

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

  const deleteAll = async () => {
    try {
      const hasCompletedTasks = listItens.filter((item) => item.done);
      if (!hasCompletedTasks) {
        toast.info("A lista não contém tarefas concluídas");
        return;
      }
      await DeleteAllTask();
      toast.success("Todas as tarefas concluídas foram removidas!");
    } catch (error) {
      throw error;
    } finally {
      await fetchTasks();
    }
  };

  const alterConclusion = async (id: string) => {
    const previousTasks = [...listItens];
    try {
      setListItens((prev) =>
        prev.map((task) =>
          task.id === id ? { ...task, done: !task.done } : task,
        ),
      );
      toast.info("Status da tarefa alterado!");
      await ToggleDone(id);
    } catch (error) {
      setListItens(previousTasks);
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
      else toast.info("As informações não foram alteradas");
    } catch (error) {
      throw error;
    } finally {
      await fetchTasks();
    }
  };

  const qtdTask = () => {
    const qtdItem = listItens.length;
    const qtdItemConcluded = listItens.filter((item) => item.done).length;

    return { qtdItem, qtdItemConcluded };
  };

  const filteredTasks = useMemo(() => {
    switch (filterId) {
      case 2:
        return listItens.filter((item) => !item.done);
      case 3:
        return listItens.filter((item) => item.done);
      case 1:
      default:
        return listItens;
    }
  }, [listItens, filterId]);

  return (
    <TaskContext.Provider
      value={{
        addTask,
        deleteTask,
        alterConclusion,
        alterTask,
        listItens: filteredTasks,
        isLoading: loading,
        qtdTask,
        deleteAll,
        setFilterId,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
