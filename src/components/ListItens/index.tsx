import { CardContent } from "@/components/ui/card";
import { useTask } from "@/contexts";
import { Trash } from "lucide-react";
import { EditTask } from "../EditTask";

export type item = {
  id: string;
  createdAt?: Date;
  done: Boolean;
  task: string;
};

export interface ListTaskProps {
  items: item[];
}

export const ListItens = ({ items }: ListTaskProps) => {
  const { deleteTask, alterTask } = useTask();

  return (
    <CardContent>
      <div className=" border-b">
        {items?.map((item) => {
          return (
            <div
              key={item.id}
              className="h-14 flex justify-between items-center border-t"
            >
              <div
                className={`w-1 h-full ${item.done ? " bg-green-300 " : " bg-red-400 "}`}
              ></div>
              <p
                className="flex-1 px-2 tx-sm cursor-pointer hover:text-gray-600"
                onClick={() => alterTask(item.id)}
              >
                {item.task}
              </p>
              <div className="flex gap-4">
                <EditTask />
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
