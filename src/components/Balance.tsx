import { getUserBalance } from "@/actions/get-user-balance";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatCurrency } from "@/lib/formatters";
const Balance = async () => {
  const { balance } = await getUserBalance();
  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="uppercase">Your Balance</CardTitle>
        <CardDescription>
          Lorem, ipsum. lorem ipsum dolor sit amet.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex items-center justify-center">
        <p className="text-2xl font-bold">{formatCurrency(balance ?? 0)}</p>
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
};

export default Balance;
