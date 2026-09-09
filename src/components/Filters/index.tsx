import { Badge } from "@/components/ui/badge";
import { ArrowBigRight, Check, List } from "lucide-react";
import { CardContent } from "../ui/card";

export const Filter = () => {
  return (
    <CardContent className="flex gap-2 mt-2">
      <Badge className="cursor-pointer">
        <List /> Todas
      </Badge>
      <Badge className="cursor-pointer" variant={"outline"}>
        <ArrowBigRight /> Não finalizados
      </Badge>
      <Badge className="cursor-pointer" variant={"outline"}>
        <Check /> Concluidas
      </Badge>
    </CardContent>
  );
};
