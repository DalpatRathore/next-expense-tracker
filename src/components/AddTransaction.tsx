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

const formSchema = z.object({
  text: z.string().nonempty("Text is required"),
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
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // ✅ This will be type-safe and validated.
    const formData = {
      text: values.text,
      amount: values.amount,
    };

    const { data, error } = await addTransaction(formData);

    if (error) {
      console.log(error);
    } else {
      console.log(data);
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto px-5">
      <h2>Add Transactions</h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="text"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Text</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Enter text" {...field} />
                </FormControl>
                <FormDescription>
                  Description of the transaction.
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
                <FormLabel>Amount</FormLabel>
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
          <Button type="submit">Add Transaction</Button>
        </form>
      </Form>
    </div>
  );
};

export default AddTransaction;
