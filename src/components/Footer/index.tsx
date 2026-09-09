import { ListCheck, Sigma } from "lucide-react";
import { Alert } from "../Alert";
import { CardContent } from "../ui/card";

export const Footer = ({ value }: { value: number }) => {
  return (
    <CardContent className="gap-4">
      <div className="flex gap-2 justify-between mt-4">
        <div className="flex gap-2 items-center">
          <ListCheck size={16} />
          <p>Tarefas Concluidas (3/{value})</p>
        </div>
        <Alert />
      </div>
      <div className="h-2 w-full bg-gray-100 mt-4 rounded-md">
        <div
          className="h-full bg-emerald-700 rounded-md"
          style={{ width: "50%" }}
        ></div>
      </div>
      <div className="flex justify-end items-center mt-2 gap-2">
        <Sigma size={18} />
        <p className="text-xs">{value} tarefas no total</p>
      </div>
    </CardContent>
  );
};
