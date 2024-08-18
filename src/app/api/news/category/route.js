import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET(req){
    try{
        let {searchParams} = new URL(req.url)
        let catID = parseInt(searchParams.get('catID'))
        let prisma = new PrismaClient()
        let result = await prisma.news_list.findMany({
            where:{catID:catID},
            select:{id:true,short_des:true,img1:true,img2:true}
        })

        return NextResponse.json({status:"success",data:result})
    }catch(err){
        return NextResponse.json({status:"fail",data:err.toString()})
    }
}