"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.moneyWallet = void 0;
const wallet_model_1 = require("../modules/waller/wallet.model");
const getMe = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(userId);
    const wallet = yield wallet_model_1.Wallet.findOne({ owner: userId });
    console.log(wallet);
    return {
        data: wallet
    };
});
exports.moneyWallet = {
    getMe
};
