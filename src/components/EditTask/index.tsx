import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Tasks } from "@/generated/prisma";
import { SquarePen } from "lucide-react";
import { useState } from "react";

type TaskProps = {
  item: Tasks;
};

export const EditTask = ({ item }: TaskProps) => {
  const [editedTask, setEditedTask] = useState<string>(item.task);

  const handleEditTask = () => {};
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
          <Input
            value={editedTask}
            onChange={(e) => setEditedTask(e.target.value)}
          />
          <Button className="cursor-pointer">Editar</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
