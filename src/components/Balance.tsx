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
import { DollarSign } from "lucide-react";

const Balance = async () => {
  const { balance } = await getUserBalance();
  return (
    <Card className="w-full max-w-lg mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="uppercase">Your Balance</CardTitle>
        <CardDescription>
          Lorem, ipsum. lorem ipsum dolor sit amet.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex items-center justify-center">
        <DollarSign className="w-7 h-7"></DollarSign>
        <p className="text-2xl font-bold">{balance ?? 0}</p>
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
};

export default Balance;
