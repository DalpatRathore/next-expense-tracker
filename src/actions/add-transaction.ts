"use server";

import { auth } from "@clerk/nextjs/server";

interface TransactionData {
  text: string;
  amount: number;
}

interface TransactionResult {
  data?: TransactionData;
  error?: string;
}

export async function addTransaction(data: TransactionData): Promise<TransactionResult> {

  const { text, amount } = data;

  if (!text || text === "" || !amount) {
    return { error: "Text or amount is missing" };
  }

//   Get logged in user
const {userId} = auth();

if(!userId){
    return {error:"User not found"}
}
// console.log(userId)

  const transactionData: TransactionData = {
    text,
    amount,
  };

  return { data: transactionData };
}
