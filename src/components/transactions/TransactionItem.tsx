import { formatCurrency } from "@/lib/formatters";
import { cn } from "@/lib/utils";
import { Transaction } from "@/types/transaction";
import React from "react";

const TransactionItem = ({ transaction }: { transaction: Transaction }) => {
  return (
    <li
      key={transaction.id}
      className={cn(
        "w-full flex items-center justify-center gap-5 border  rounded-md mb-5 p-3 border-r-8",
        transaction.amount > 0 ? "border-r-green-800" : "border-r-rose-800"
      )}
    >
      <span className="flex h-2 w-2 rounded-full bg-sky-500" />
      <div className="w-full flex items-center justify-between">
        <p className="text-sm font-medium leading-none">{transaction.text}</p>
        <p className="text-sm">{formatCurrency(transaction.amount)}</p>
      </div>
    </li>
  );
};

export default TransactionItem;
