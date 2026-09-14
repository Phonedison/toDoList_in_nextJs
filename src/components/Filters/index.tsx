import { useTask } from "@/contexts";
import { ArrowBigRight, Check, List } from "lucide-react";
import { useEffect, useState } from "react";
import { Badge } from "../ui/badge";
import { CardContent } from "../ui/card";

export const Filter = () => {
  const { setFilterId } = useTask();
  const listBadge = [
    { id: 1, icon: <List />, text: "Todas" },
    { id: 2, icon: <ArrowBigRight />, text: "Não finalizados" },
    { id: 3, icon: <Check />, text: "Concluidas" },
  ];
  const [idSelect, setIdSelect] = useState(1);

  useEffect(() => {
    setFilterId(idSelect);
  }, [setFilterId, idSelect]);

  return (
    <CardContent className="flex gap-2 mt-2">
      {listBadge.map((item) => {
        const isSelect = item.id === idSelect;
        const handleFilter = () => {
          setIdSelect(item.id);
        };

        return (
          <Badge
            key={item.id}
            className="cursor-pointer"
            variant={isSelect ? "default" : "outline"}
            onClick={handleFilter}
          >
            {item.icon} {item.text}
          </Badge>
        );
      })}
    </CardContent>
  );
};
