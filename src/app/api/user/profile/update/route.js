import { PrismaClient } from "@prisma/client";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req,res){
    try{
        let headerList = headers()
        let id = parseInt(headerList.get('id'))
        let reqBody = await req.json()
        const prisma = new PrismaClient()

        let result = await prisma.users.update({
            where:{id:id},
            data:reqBody
        })

        return NextResponse.json({status:"success",data:result})

    }catch(err){
        return NextResponse.json({status:"success",data:err})
    }
}