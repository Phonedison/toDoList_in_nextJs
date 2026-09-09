import { CardContent } from "@/components/ui/card";
import { Trash } from "lucide-react";

import { EditTask } from "../EditTask";

type item = {
  value: string;
};

interface ListPros {
  items: item[];
}

export const ListItens = ({ items }: ListPros) => {
  return (
    <CardContent>
      <div className=" border-b">
        {items?.map((item, index) => {
          return (
            <div
              key={index}
              className="h-14 flex justify-between items-center border-t"
            >
              <div className="w-2 h-full bg-green-300"></div>
              <p className="flex-1 px-2 tx-sm">{item.value}</p>
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
