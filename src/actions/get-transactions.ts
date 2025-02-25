"use server"

import { db } from "@/config/db";
import { Transaction } from "@/types/transaction";
import { auth } from "@clerk/nextjs/server";

export async function getTransactions():Promise<{
    transactions?: Transaction[];
    error?: string
}>{
    const {userId} = auth();

    if(!userId){
        return{error:"User not found"}
    }
    try {
        const transactions = await db.transaction.findMany({
            where:{
                userId
            },
            orderBy:{
                createdAt:'desc'
            }
        })

        return {transactions}
        

    } catch (error) {
        
        return{ error:"Internal server error"}
    }
}