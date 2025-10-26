import { Types } from "mongoose";


export enum WalletStatus {
    ACTIVE = "ACTIVE",
    BLOCKED = "BLOCK",
    SUSPEND="SUSPEND",
    APPROVE="APPROVE"
    // You could also add 'FROZEN', 'DEACTIVATED', etc.
}
export interface IWallet {
    _id?: Types.ObjectId;
    owner: Types.ObjectId;
    status: WalletStatus,
    balance: number;
}