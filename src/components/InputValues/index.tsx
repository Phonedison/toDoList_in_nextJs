import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import { CardContent } from "../ui/card";

export const InputInsert = () => {
  return (
    <CardContent className="flex gap-2">
      <Input placeholder="Adicionar tarefa" />
      <Button variant="outline" className="cursor-pointer">
        <Plus />
        Adicionar
      </Button>
    </CardContent>
  );
};
