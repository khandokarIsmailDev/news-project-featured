import { CreateToken } from "@/utility/JWTTokenHelper";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(req,res){
    try{
        let reqBody = await req.json()
        const prisma = new PrismaClient()
        const result = await prisma.users.findUnique({where:reqBody})

        if(result.length === 0){
            return NextResponse.json({status:"failed",data:result})
        }else{
            let token = await CreateToken(result['email'],result['id'])
            let expirDuration = new Date(Date.now()+24*60*60*1000) //1day mili second
            const cokieString = `token=${token};expire:${expirDuration.toUTCString()};path=/`

            return NextResponse.json({status:"success",data:token},{status:200,headers:{'Set-Cookie':cokieString}})
        }



        return NextResponse.json({status:"success",data:result})
    }catch(err){
        return NextResponse.json({status:"fail",data:err})
    }
}