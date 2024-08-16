import { SendEmail } from "@/utility/EmailUtility";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET(req){
    try{
        let{searchParams}=new URL(req.url)
        let email = searchParams.get('email')
        let prisma = new PrismaClient()

        //user count
        const count = await prisma.users.count({where:{email:email}})

        if(count===1){
            //create the random OTP
            let code = Math.floor(100000+Math.random()*900000)
            //send this otp in email
            let EmailText =  `Your OTP code is ${code}`
            let EmailSubject = `Next News Verification code`
            await SendEmail(email,EmailText,EmailSubject)

            //now update the otp code in database
            let result = await prisma.users.update({
                where:{email:email},
                data:{otp:code.toString()}
            }) 

            return NextResponse.json({status:"success",data:result})

        }else{
            return NextResponse.json({status:"fail",data:"No user found"})
        }

    }catch(err){
        return NextResponse.json({status:"fail",data:err})
    }
}