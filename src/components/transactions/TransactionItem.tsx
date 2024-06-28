"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { formatCurrency } from "@/lib/formatters";
import { cn } from "@/lib/utils";
import { Transaction } from "@/types/transaction";
import { Edit, Edit2, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { deleteTransaction } from "@/actions/delete-transaction";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { DialogClose } from "@radix-ui/react-dialog";
import { toast } from "react-toastify";
import { DollarSign, Loader2, Tag } from "lucide-react";
import { editTransaction } from "@/actions/edit-transaction";
import { getTransaction } from "@/actions/get-transaction";

const formSchema = z.object({
  text: z
    .string({
      required_error: "Please provide amount text label",
    })
    .min(2, {
      message: "Text label must be of minimum 2 characters",
    }),
  amount: z
    .number({
      required_error: "Amount is required",
      invalid_type_error: "Amount must be a number",
    })
    .refine(value => !isNaN(value), {
      message: "Amount must be a number",
    }),
});

const TransactionItem = ({ transaction }: { transaction: Transaction }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [transactionData, setTransactionData] = useState({
    text: "",
    amount: 0,
  });

  useEffect(() => {
    const fetchTransaction = async () => {
      const { transaction: trans } = await getTransaction(transaction.id);
      if (trans) {
        setTransactionData(trans);
      }
    };
    fetchTransaction();
  }, [transaction.id]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      text: transactionData.text,
      amount: transactionData.amount,
    },
  });
  useEffect(() => {
    if (isModalOpen) {
      form.reset({
        text: transactionData.text,
        amount: transactionData.amount,
      });
    }
  }, [transactionData, form, isModalOpen]);
  const { isSubmitting } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // ✅ This will be type-safe and validated.
    const formData = {
      id: transaction.id,
      text: values.text,
      amount: values.amount,
    };
    // console.log(formData);
    const { data, error } = await editTransaction(formData);
    // console.log(data);

    if (data) {
      form.reset();
      setTransactionData(data); // Update the local state
      setIsModalOpen(false); // Close the modal
      toast.success("Transaction updated successfully!");
    } else {
      toast.error(error);
      console.log(error);
    }
  };

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
        "w-full flex items-center justify-center gap-5 border  rounded-md mb-5 p-3 border-l-8 hover:bg-sky-100 dark:hover:bg-gray-900",
        transaction.amount > 0 ? "border-l-green-800" : "border-l-rose-800"
      )}
    >
      <span className="flex h-2 w-2 rounded-full bg-sky-500" />
      <div className="w-full flex items-center justify-between">
        <p className="text-sm font-medium leading-none">{transaction.text}</p>
        <div className="flex items-center gap-x-5">
          <p className="font-bold">{formatCurrency(transaction.amount)}</p>

          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger asChild>
              <Button variant={"outline"} size={"icon"}>
                <Edit className="w-4 h-4 text-green-700"></Edit>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg">
              <DialogHeader>
                <DialogTitle>Edit Transaction</DialogTitle>
                <DialogDescription>
                  Make changes to your transaction here. Click update when youre
                  done.
                </DialogDescription>
              </DialogHeader>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-8"
                >
                  <FormField
                    control={form.control}
                    name="text"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center">
                          <Tag className="w-4 h-4"></Tag>Text
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="Enter text"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Text label of the transaction, e.g. Paycheck
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="amount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center">
                          <DollarSign className="w-4 h-4"></DollarSign>
                          Amount
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            step={"0.01"}
                            placeholder="Enter amount"
                            {...field}
                            onChange={e =>
                              field.onChange(parseFloat(e.target.value))
                            }
                          />
                        </FormControl>
                        <FormDescription>
                          Negative - expense and Positive - income.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex items-center justify-center gap-5">
                    <Button type="submit" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-5 h-5  animate-spin mr-2"></Loader2>
                          Updating...
                        </>
                      ) : (
                        <>Update</>
                      )}
                    </Button>
                    <DialogClose asChild>
                      <Button type="button" variant="destructive">
                        Close
                      </Button>
                    </DialogClose>
                  </div>
                </form>
              </Form>
            </DialogContent>
          </Dialog>

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
