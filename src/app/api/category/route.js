import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET(req,res){
    try{
        let prisma = new PrismaClient()
        let result = await prisma.categories.findMany({
            select:{id:true,name:true}
        })

        return NextResponse.json({status:'success',data:result})
    }catch(err){
        return NextResponse.json({status:"fail",data:err.toString()})
    }
}