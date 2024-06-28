import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/formatters";
import { getIncomeExpense } from "@/actions/get-income-expense";
const IncomeExpense = async () => {
  const { income, expense } = await getIncomeExpense();
  return (
    <div className="w-full flex items-center justify-center gap-2">
      <Card className="w-full max-w-80 mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="uppercase">Income</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center">
          <p className="text-2xl font-bold text-green-600">
            {formatCurrency(income ?? 0)}
          </p>
        </CardContent>
      </Card>
      <Card className="w-full max-w-80 mx-auto ">
        <CardHeader className="text-center">
          <CardTitle className="uppercase">Expense</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center">
          <p className="text-2xl font-bold text-rose-700">
            {formatCurrency(expense ?? 0)}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default IncomeExpense;
