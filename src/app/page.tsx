"use client";

import { Filter } from "@/components/Filters";
import { Footer } from "@/components/Footer";
import { InputInsert } from "@/components/InputValues";
import { ListItens } from "@/components/ListItens";

import { Card, CardContent } from "@/components/ui/card";

import { Separator } from "@/components/ui/separator";

const list = [
  { value: "Estudando React" },
  { value: "Estudando React" },
  { value: "Estudando React" },
];

const Home = () => {
  return (
    <main className="w-full h-screen bg-gray-100 flex justify-center items-center">
      <Card className="w-lg p-4">
        {/*  */}

        <InputInsert />

        <CardContent className="flex">
          <Separator />
        </CardContent>

        <Filter />
        <ListItens items={list} />
        <Footer />
        {/*  */}
      </Card>
    </main>
  );
};

export default Home;
