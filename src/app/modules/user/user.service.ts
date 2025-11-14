import httpStatus from 'http-status-codes';
import { IAuthProvider, IUser } from "./user.interface";
import { User } from "./user.model";
import bcryptjs from "bcryptjs"
import AppError from '../../errorHelper/AppError';
import { Wallet } from '../waller/wallet.model';
import mongoose from 'mongoose';
// import { Transaction } from '../transaction/transaction.model';

const createUser = async (payload: Partial<IUser>) => {

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const { email, password, phone, ...rest } = payload;
console.log(email, password, phone,)
        if (!phone) {
            throw new AppError(httpStatus.NOT_ACCEPTABLE, "please provide phone number")
        }

        const hashpassword = await bcryptjs.hash(password as string, 10)
        const isUserExit = await User.findOne({ email });

        if (isUserExit) {
            throw new AppError(httpStatus.BAD_REQUEST, "User alredy exit in")
        }
        const isUserNumberExit = await User.findOne({ phone });

        if (isUserNumberExit) {
            throw new AppError(httpStatus.BAD_REQUEST, "User number alredy exit in")
        }

        const authprovider: IAuthProvider = { provider: "creadentials", providerId: email as string }
        const user = await User.create([
            {

                email,
                phone,
                password: hashpassword,
                auth: [authprovider],
                ...rest,
            }
        ], { session })
        // console.log(user)
        const ownerInfo = {
            _id: user[0]._id,
            name: user[0].name,
            email: user[0].email,
            role: user[0].role
        };
        await Wallet.create([
            {
                owner: ownerInfo,
                balance: 50
            }
        ], { session })
        await session.commitTransaction();
        session.endSession();

        return user[0];


    } catch (error) {
        console.log(error)
    }
}

const getMe = async (userId: string) => {
    const user = await User.findById(userId).select("-password");
    return {
        data: user
    }
};

export const userService = {
    createUser, getMe
}