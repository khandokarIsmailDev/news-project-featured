import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET(req){
    try{
        let prisma = new PrismaClient()
        let result = await prisma.users.findMany({
            select:{email:true}
        })

        return NextResponse.json({status:"success",data:result})
    }catch(err){
        return NextResponse.json({status:"success",data:err.toString()})
    }
}