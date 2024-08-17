import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET(req,res){
    try{
        let prisma = new PrismaClient()
        let {searchParams} = new URL(req.url)
        let type = searchParams.get('type')
        let result = await prisma.policies.findMany({
            where:{type:type}
        })

        return NextResponse.json({status:"success",data:'got data'})
    }catch(err){
        return NextResponse.json({status:"fail",data:err.toString()})
    }
}