import React from "react";

import { getUserBalance } from "@/actions/get-user-balance";
import { formatCurrency } from "@/lib/formatters";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const Balance = async () => {
  const { balance } = await getUserBalance();
  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="uppercase">Your Balance</CardTitle>
        <CardDescription>lorem ipsum dolor sit amet.</CardDescription>
      </CardHeader>
      <CardContent className="flex items-center justify-center">
        <p className="text-2xl font-bold text-sky-700">
          {formatCurrency(balance ?? 0)}
        </p>
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
};

export default Balance;
