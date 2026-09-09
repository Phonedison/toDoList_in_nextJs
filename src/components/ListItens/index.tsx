import { CardContent } from "@/components/ui/card";
import { SquarePen, Trash } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

import { Dialog } from "@/components/ui/dialog";

type item = {
  value: string;
};

interface ListPros {
  items: item[];
}

const EditValue = () => {
  return (
    <Dialog>
      <DialogTrigger>
        <SquarePen size={16} className="cursor-pointer" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar Tarefa</DialogTitle>
        </DialogHeader>
        <div className="flex gap-2">
          <Input placeholder="Editar tarefa" />
          <Button className="cursor-pointer">Editar</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

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
                <EditValue />
                <Trash size={16} className="cursor-pointer" />
              </div>
            </div>
          );
        })}
      </div>
    </CardContent>
  );
};
