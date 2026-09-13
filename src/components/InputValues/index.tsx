import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTask } from "@/contexts";
import { LoaderCircle, Plus } from "lucide-react";
import { useState } from "react";
import { CardContent } from "../ui/card";

export const InputInsert = () => {
  const [task, setTask] = useState<string>("");
  const { addTask, isLoading } = useTask();

  return (
    <CardContent className="flex gap-2">
      <Input
        placeholder="Adicionar tarefa"
        value={task}
        onChange={(v) => setTask(v.target.value)}
      />
      <Button
        variant="outline"
        className="cursor-pointer"
        onClick={() => {
          addTask(task);
          setTask("");
        }}
        disabled={isLoading}
      >
        {isLoading ? <LoaderCircle className=" animate-spin" /> : <Plus />}
        Adicionar
      </Button>
    </CardContent>
  );
};
