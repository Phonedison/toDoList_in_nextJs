"use client";

import { Filter } from "@/components/Filters";
import { Footer } from "@/components/Footer";
import { InputInsert } from "@/components/InputValues";
import { ListItens } from "@/components/ListItens";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useTask } from "@/contexts";

const Home = () => {
  const { listItens } = useTask();
  return (
    <main className="w-full h-screen bg-gray-100 flex justify-center items-center">
      <Card className="w-lg p-4">
        {/*  */}

        <InputInsert />

        <CardContent className="flex">
          <Separator />
        </CardContent>

        <Filter />
        <ListItens items={listItens} />
        <Footer value={listItens.length} />
        {/*  */}
      </Card>
    </main>
  );
};

export default Home;
