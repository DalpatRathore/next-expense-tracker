import AddTransaction from "@/components/AddTransaction";
import Guest from "@/components/Guest";
import { checkUser } from "@/lib/check-user";

export default async function Home() {
  const user = await checkUser();

  if (!user) {
    return <Guest></Guest>;
  }

  return (
    <div className="flex flex-col items-center justify-start max-w-7xl mx-auto p-4 space-y-8 h-full">
      <h1>Welcome, {user.name}</h1>
      <AddTransaction></AddTransaction>
    </div>
  );
}
