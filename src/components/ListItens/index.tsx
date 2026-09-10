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
  const { deleteTask } = useTask();

  return (
    <CardContent>
      <div className=" border-b">
        {items?.map((item) => {
          return (
            <div
              key={item.id}
              className="h-14 flex justify-between items-center border-t"
            >
              <div className="w-2 h-full bg-green-300"></div>
              <p className="flex-1 px-2 tx-sm">{item.task}</p>
              <div className="flex gap-4">
                <EditTask />
                <Trash size={16} className="cursor-pointer" />
              </div>
            </div>
          );
        })}
      </div>
    </CardContent>
  );
};
