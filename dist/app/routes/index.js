"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const auth_routs_1 = require("../modules/auth/auth.routs");
const user_route_1 = require("../modules/user/user.route");
const transaction_route_1 = require("../modules/transaction/transaction.route");
const agent_route_1 = require("../modules/agent/agent.route");
const admin_routs_1 = require("../modules/admin/admin.routs");
const moneywallet_route_1 = require("../MoneyWallet/moneywallet.route");
exports.router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: "/user",
        route: user_route_1.UserRoutes
    },
    {
        path: "/agent",
        route: agent_route_1.AgentRouter
    },
    {
        path: "/auth",
        route: auth_routs_1.AuthRoute
    },
    {
        path: "/transaction",
        route: transaction_route_1.TransactionRoute
    },
    {
        path: "/admin",
        route: admin_routs_1.AdminRouter
    },
    {
        path: "/wallet",
        route: moneywallet_route_1.WalletRoutes
    }
];
moduleRoutes.forEach((route) => {
    exports.router.use(route.path, route.route);
});
