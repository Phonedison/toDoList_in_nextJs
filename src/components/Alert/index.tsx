import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useTask } from "@/contexts";
import { Trash } from "lucide-react";

export const Alert = () => {
  const { deleteAll, qtdTask } = useTask();
  const { qtdItemConcluded } = qtdTask();
  const isTrue = qtdItemConcluded === 0;

  return (
    <AlertDialog>
      <AlertDialogTrigger
        render={
          <Button
            variant="outline"
            className={"cursor-pointer text-xs h-7"}
            disabled={isTrue}
          />
        }
      >
        <Trash /> Limpar tarefas concluídas
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Tem certeza que deseja excluir {qtdItemConcluded} itens?
          </AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction onClick={deleteAll}>Continuar</AlertDialogAction>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
