"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  ArrowBigRight,
  Check,
  List,
  ListCheck,
  Plus,
  Sigma,
  SquarePen,
  Trash,
} from "lucide-react";
const Home = () => {
  return (
    <main className="w-full h-screen bg-gray-100 flex justify-center items-center ">
      <Card className="w-lg p-4">
        <CardContent className="flex gap-2">
          <Input placeholder="Adicionar tarefa" />
          <Button variant="outline" className="cursor-pointer">
            <Plus />
            Adicionar
          </Button>
        </CardContent>

        <CardContent className="flex gap-2">
          <Separator />
        </CardContent>

        <CardContent className="flex gap-2">
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

        <CardContent>
          <div className="mt-4 border-b">
            <div className="h-14 flex justify-between items-center border-t">
              <div className="w-2 h-full bg-green-300"></div>
              <p className="flex-1 px-2 tx-sm">Estudar React</p>
              <div className="flex gap-4">
                <SquarePen size={16} className="cursor-pointer" />
                <Trash size={16} className="cursor-pointer" />
              </div>
            </div>
          </div>
        </CardContent>

        <CardContent className="gap-4 p-5">
          <div className="flex gap-2 justify-between mt-4">
            <div className="flex gap-2 items-center">
              <ListCheck size={16} />
              <p>Tarefas Concluidas (3/3)</p>
            </div>
            <Button
              variant={"outline"}
              className={"cursor-pointer text-xs h-7"}
            >
              <Trash /> Limpar tarefas concluídas
            </Button>
          </div>
          <div className="h-2 w-full bg-gray-100 mt-4 rounded-md">
            <div
              className="h-full bg-emerald-700 rounded-md"
              style={{ width: "50%" }}
            ></div>
          </div>
          <div className="flex justify-end items-center mt-2 gap-2">
            <Sigma size={18} />
            <p className="text-xs">3 tarefas no total</p>
          </div>
        </CardContent>
      </Card>
    </main>
  );
};

export default Home;
