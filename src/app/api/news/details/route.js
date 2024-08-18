import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET(req){
    try{
        let {searchParams} = new URL(req.url)
        let id = parseInt(searchParams.get('id'))
        let prisma = new PrismaClient()
        let result = await prisma.news_list.findUnique({
            where:{id:id},
            include:{categories:true}
        })

        return NextResponse.json({status:"success",data:result})
    }catch(err){
        return NextResponse.json({status:"fail",data:err})
    }
}