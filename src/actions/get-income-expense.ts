"use server"

import { db } from "@/config/db";
import { auth } from "@clerk/nextjs/server";

export async function getIncomeExpense():Promise<{
    income?: number;
    expense?: number;
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
        const amounts = transactions.map(transaction =>(
            transaction.amount
        ));
        const income = amounts.filter((amount)=> amount >0).reduce((sum, amount)=> sum+amount,0);
      
        const expense = amounts.filter((amount)=> amount < 0).reduce((sum, amount)=> sum+amount,0);

        return {income, expense:Math.abs(expense)}

    } catch (error) {
        
        return{ error:"Internal server error"}
    }
}