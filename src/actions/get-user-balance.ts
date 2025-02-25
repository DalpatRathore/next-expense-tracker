"use server"

import { db } from "@/config/db";
import { auth } from "@clerk/nextjs/server";

export async function getUserBalance():Promise<{
    balance?: number;
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
            }
        })
        const balance = transactions.reduce((sum,transaction)=> sum+transaction.amount,0)
        return {balance}
    } catch (error) {
        
        return{ error:"Internal server error"}
    }
}