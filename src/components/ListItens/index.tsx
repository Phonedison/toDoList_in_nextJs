import { CardContent } from "@/components/ui/card";
import { useTask } from "@/contexts";
import { Trash } from "lucide-react";
import { EditTask } from "../EditTask";

export type Task = {
  id: string;
  createdAt: Date;
  done: boolean;
  task: string;
};

export interface ListTaskProps {
  items: Task[];
}

export const ListItens = ({ items }: ListTaskProps) => {
  const { deleteTask, alterConclusion } = useTask();

  return (
    <CardContent>
      <div className=" border-b">
        {items.length === 0 && (
          <p className="text-xs border-t p-4 ">
            Você não possui atividades cadastradas
          </p>
        )}
        {items.map((item) => {
          return (
            <div
              key={item.id}
              className="h-14 flex justify-between items-center border-t"
            >
              <div
                className={`w-1 h-full ${item.done ? " bg-green-300" : " bg-red-400"}`}
              ></div>
              <p
                className={`transition-all duration-500 ease-in-out flex-1 px-2 tx-sm cursor-pointer hover:text-gray-600 ${item.done && "line-through italic"}`}
                onClick={() => alterConclusion(item.id)}
              >
                {item.task}
              </p>
              <div className="flex gap-4">
                <EditTask item={item} />
                <Trash
                  size={16}
                  className="cursor-pointer"
                  onClick={() => deleteTask(item.id)}
                />
              </div>
            </div>
          );
        })}
      </div>
    </CardContent>
  );
};
