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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminService = void 0;
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const AppError_1 = __importDefault(require("../../errorHelper/AppError"));
const transaction_model_1 = require("../transaction/transaction.model");
const user_model_1 = require("../user/user.model");
const wallet_interface_1 = require("../waller/wallet.interface");
const wallet_model_1 = require("../waller/wallet.model");
const mongoose_1 = __importDefault(require("mongoose"));
const getalluser = () => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield user_model_1.User.find({ role: "USER" });
    const totalUser = yield user_model_1.User.countDocuments();
    return {
        data: users,
        meta: {
            totaluser: totalUser
        }
    };
});
const getallagent = () => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield user_model_1.User.find({ role: "AGENT" });
    const totalAgent = yield user_model_1.User.countDocuments();
    return {
        data: users,
        meta: {
            totaluser: totalAgent
        }
    };
});
const allwallets = () => __awaiter(void 0, void 0, void 0, function* () {
    const wallets = yield wallet_model_1.Wallet.find({});
    const totwallets = yield wallet_model_1.Wallet.countDocuments();
    const totalbalance = wallets.reduce((sum, wallet) => sum + wallet.balance, 0);
    return {
        data: wallets,
        meta: {
            totaluser: totwallets,
            totalbalance: totalbalance
        }
    };
});
const allTansactions = (query) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("userId", query);
    const tansactions = yield transaction_model_1.Transaction.find(query);
    const totaltansactions = yield transaction_model_1.Transaction.countDocuments(query);
    return {
        meta: {
            totaltansactions: totaltansactions
        },
        tansactions: tansactions,
    };
});
const updateWallet = (userId, status) => __awaiter(void 0, void 0, void 0, function* () {
    if (!Object.values(wallet_interface_1.WalletStatus).includes(status)) {
        throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, "Invalid wallet status provided.");
    }
    const updatedWallet = yield user_model_1.User.findOneAndUpdate({ _id: new mongoose_1.default.Types.ObjectId(userId) }, { isActive: status }, { new: true, runValidators: true } // Return the updated document and run schema validators
    );
    return {
        data: updatedWallet
    };
});
exports.adminService = {
    getalluser, getallagent, allwallets, allTansactions, updateWallet
};
