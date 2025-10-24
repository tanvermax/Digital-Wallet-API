import { Router } from "express";
import { walletController } from "./moneywallet.controller";
import { cheakAuth } from "../middleware/cheakAuth";
import { Role } from "../modules/user/user.interface";


const router = Router();





router.get("/me",cheakAuth(...Object.values(Role)), walletController.getwallet)

export const WalletRoutes = router;
