"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";
import { addTransaction } from "@/actions/add-transaction";
import { toast } from "react-toastify";
import { ArrowLeftRight, DollarSign, Loader2, Tag } from "lucide-react";

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

const AddTransaction = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      text: "",
      amount: 0,
    },
  });

  const { isSubmitting } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // ✅ This will be type-safe and validated.
    const formData = {
      text: values.text,
      amount: values.amount,
    };

    const { data, error } = await addTransaction(formData);

    if (error) {
      toast.error(error);
      console.log(error);
    } else {
      form.reset();
      toast.success("Transaction added successfully!");
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto px-5">
      <h2 className="text-xl mb-5">Add Transaction</h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="text"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center">
                  <Tag className="w-4 h-4"></Tag>Text
                </FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Enter text" {...field} />
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
                    onChange={e => field.onChange(parseFloat(e.target.value))}
                  />
                </FormControl>
                <FormDescription>
                  Negative - expense and Positive - income.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex items-center justify-center">
            <Button type="submit" size={"lg"} disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5  animate-spin mr-2"></Loader2>
                  Adding...
                </>
              ) : (
                <>
                  Add Transaction
                  <ArrowLeftRight className="w-5 h-5 ml-2"></ArrowLeftRight>
                </>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AddTransaction;
