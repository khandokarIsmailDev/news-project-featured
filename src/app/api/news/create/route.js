import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(req){
    try{
        let reqBody = await req.json()
        let prisma = new PrismaClient()
        let result = await prisma.news_list.create({data:reqBody})

        return NextResponse.json({status:"success",data:result})
    }catch(err){
        return NextResponse.json({status:"fail",data:err.toString()})
    }
}