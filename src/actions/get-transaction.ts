"use server"

import { db } from "@/config/db";
import { Transaction } from "@/types/transaction";
import { auth } from "@clerk/nextjs/server";

export async function getTransaction(transactionId:string):Promise<{
    transaction?: Transaction;
    error?: string
}>{
    const {userId} = auth();

    if(!userId){
        return{error:"User not found"}
    }
    
    try {
        const transaction = await db.transaction.findUnique({
            where:{
                id:transactionId,
                userId
            },
           
        })

        if(!transaction){
            return {error:"No transaction"};
        }

        return {transaction}
        

    } catch (error) {
        
        return{ error:"Internal server error"}
    }
}