import { Wallet } from "../modules/waller/wallet.model";

const getMe = async (userId: string) => {
    console.log(userId)
    const wallet = await Wallet.findOne({owner:userId});
    console.log(wallet)
    return {
         data:wallet
    }
};



export const moneyWallet = {
   getMe
}