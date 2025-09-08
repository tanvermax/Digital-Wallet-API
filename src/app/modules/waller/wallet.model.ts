import { model, Schema } from "mongoose"
import { IWallet, WalletStatus } from "./wallet.interface"

const walletSchema = new Schema<IWallet>({
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User', 
    required: true,
    unique: true,
  },
  balance: {
    type: Number,
    required: true,
    default: 50
  },
  status: {
    type: String,
    enum: Object.values(WalletStatus),
    default: WalletStatus.ACTIVE, 
    required: true,}
  }, {
  timestamps: true,
})

export const Wallet = model<IWallet>("Wallet", walletSchema)