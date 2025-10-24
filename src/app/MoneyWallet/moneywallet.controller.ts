/* eslint-disable @typescript-eslint/no-unused-vars */
import httpStatus from 'http-status-codes';
import { NextFunction, Request, Response } from "express";
import { sendResponse } from "../utils/sendresponse";
import { catchAsync } from '../utils/catchAsync';
import { JwtPayload } from 'jsonwebtoken';
import { moneyWallet } from './moneywallet.service';




const getwallet = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const decodedToken = req.user as JwtPayload
    
    console.log(decodedToken)
    
    const result = await moneyWallet.getMe(decodedToken.userId);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "Your walllet data Retrieved Successfully",
        data:result ,
    })

})


export const walletController = {
    getwallet
    // getallhistory
}
