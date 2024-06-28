"use client";
import { formatCurrency } from "@/lib/formatters";
import { cn } from "@/lib/utils";
import { Transaction } from "@/types/transaction";
import { Edit, Edit2, Trash2 } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import { toast } from "react-toastify";
import { deleteTransaction } from "@/actions/delete-transaction";

const TransactionItem = ({ transaction }: { transaction: Transaction }) => {
  const handleDelete = async (transactionId: string) => {
    const confirm = window.confirm(
      "Are you sure, you want to delete this transaction?"
    );
    if (!confirm) return;

    const { message, error } = await deleteTransaction(transactionId);
    if (error) {
      toast.error(error);
    }
    toast.success(message);
  };
  return (
    <li
      key={transaction.id}
      className={cn(
        "w-full flex items-center justify-center gap-5 border  rounded-md mb-5 p-3 border-l-8 hover:bg-sky-100",
        transaction.amount > 0 ? "border-l-green-800" : "border-l-rose-800"
      )}
    >
      <span className="flex h-2 w-2 rounded-full bg-sky-500" />
      <div className="w-full flex items-center justify-between">
        <p className="text-sm font-medium leading-none">{transaction.text}</p>
        <div className="flex items-center gap-x-5">
          <p className="font-bold">{formatCurrency(transaction.amount)}</p>
          <Button variant={"outline"} size={"icon"}>
            <Edit className="w-4 h-4 text-green-700"></Edit>
          </Button>
          <Button
            variant={"outline"}
            size={"icon"}
            onClick={() => handleDelete(transaction.id)}
          >
            <Trash2 className="w-4 h-4 text-rose-500"></Trash2>
          </Button>
        </div>
      </div>
    </li>
  );
};

export default TransactionItem;
