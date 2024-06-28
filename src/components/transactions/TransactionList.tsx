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
  // console.log(transactions);

  if (!transactions || error) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <CardTitle>Transaction History</CardTitle>
          <CardDescription>You have 0 transaction.</CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <p>You have no transaction history</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-xl">Transaction History</CardTitle>
        <CardDescription>
          You have <span className="font-bold mx-1">{transactions.length}</span>
          transaction(s).
        </CardDescription>
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
