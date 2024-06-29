"use server";

import { db } from "@/config/db";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

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

  try {
    const transactionData: TransactionData = await db.transaction.create({
      data:{  
          text,
          amount,
          userId
      }
    });

    revalidatePath("/")
  
    return { data: transactionData };
  } catch (error) {

    return{
        error:"Transaction not added"
    }
    
  }
}
