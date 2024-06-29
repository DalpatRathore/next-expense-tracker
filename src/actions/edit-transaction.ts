"use server";

import { db } from "@/config/db";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

interface TransactionData {
  id:string;
  text: string;
  amount: number;
}

interface TransactionResult {
  data?: TransactionData;
  error?: string;
}

export async function editTransaction(data: TransactionData): Promise<TransactionResult> {

  const { text, amount,id } = data;

  if (!text || text === "" || !amount || !id) {
    return { error: "Text or amount or id is missing" };
  }

//   Get logged in user
  const {userId} = auth();

    if(!userId){
        return {error:"User not found"}
    }

  try {
    const transactionData: TransactionData = await db.transaction.update({
      where: {
        id: id,
        userId: userId,
      },
      data: {
        text: text,
        amount: amount,
      },
    });

    revalidatePath("/")
  
    return { data: transactionData };
  } catch (error) {
    return{
        error:"Transaction not added"
    }
    
  }
}
