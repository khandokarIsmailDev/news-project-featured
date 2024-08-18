import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET(req){
    try{
        let {searchParams}= new URL(req.url)
        let keywords = searchParams.get('keywords')
        let prisma = new PrismaClient()
        let result = await prisma.news_list.findMany({
            where:{title:{contains:keywords}}
        })

        return NextResponse.json({status:"success",data:result})
    }catch(err){
        return NextResponse.json({status:"fail",data:err})
    }
}