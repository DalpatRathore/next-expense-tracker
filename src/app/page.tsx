import AddTransaction from "@/components/AddTransaction";
import Balance from "@/components/Balance";
import IncomeExpense from "@/components/IncomeExpense";
import Guest from "@/components/Guest";
import { checkUser } from "@/lib/check-user";

export default async function Home() {
  const user = await checkUser();

  if (!user) {
    return <Guest></Guest>;
  }

  return (
    <div className="flex flex-col items-center justify-start max-w-7xl mx-auto p-4 space-y-8 h-full">
      <h1 className="text-2xl">
        Welcome, <span className="font-bold">{user.name}</span>
      </h1>
      <div className="flex flex-col lg:flex-row w-full gap-5 ">
        <div className="flex flex-col w-full items-center justify-start gap-y-5">
          <Balance></Balance>
          <IncomeExpense></IncomeExpense>
        </div>
        <AddTransaction></AddTransaction>
      </div>
    </div>
  );
}
