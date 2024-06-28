import { CheckIcon } from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getTransactions } from "@/actions/get-transactions";
import TransactionItem from "./TransactionItem";

const TransactionList = async () => {
  const { transactions, error } = await getTransactions();

  if (!transactions) {
    return null;
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Transaction History</CardTitle>
        <CardDescription>You have 3 unread messages.</CardDescription>
      </CardHeader>
      <CardContent>
        <ul>
          {transactions.map(transaction => (
            <TransactionItem
              transaction={transaction}
              key={transaction.id}
            ></TransactionItem>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default TransactionList;
