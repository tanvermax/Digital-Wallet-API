# Digital Wallet API

A secure, modular, and role-based backend API for a digital wallet system, built with Express.js and Mongoose. This project facilitates core financial operations like sending, adding, and withdrawing money, with distinct roles for users, agents, and administrators.

🔗 **Live Link**: [Digital Wallet](https://digital-wallet-api-flax.vercel.app/)

---

## 🚀 Features

* **JWT-based Authentication**: Secure user login with JSON Web Tokens.
* **Role-based Authorization**: Differentiated access for `admin`, `user`, and `agent` roles.
* **Secure Password Hashing**: Passwords are securely stored using `bcrypt`.
* **Automated Wallet Creation**: A wallet is automatically created for each user and agent upon registration, with an initial balance of ৳50.
* **Transactional Logic**:
  * **Users**: Can send money, withdraw funds, and view their transaction history.
  * **Agents**: Can add money (cash-in) to user wallets and view their own transaction history.
  * **Admins**: Have full visibility and control, able to view all users, agents, wallets, and transactions. They can also block user wallets and approve/suspend agents.
* **Business Logic for Restrictions**:
  * **Blocked Users**: A blocked user cannot send or withdraw money until unblocked by an admin.
  * **Suspended Agents**: A suspended agent cannot perform cash-in (add money) operations until approved again by an admin.
* **Robust API Endpoints**: RESTful and well-defined endpoints for all functionalities.
* **Modular Architecture**: The codebase is organized into modules (`auth`, `user`, `agent`, `transaction`, `admin`), ensuring clarity and scalability.

---

## 🛠️ Technology Stack

* **Backend**: Node.js, Express.js
* **Database**: MongoDB, Mongoose
* **Security**: JSON Web Tokens (JWT), `bcrypt.js`

---

## 📂 Project Structure

The project follows a clean, modular architecture to promote maintainability and separation of concerns.
# 📌 API Endpoints and Access Control

---

### ➡️ Public Access

These endpoints do not require authentication.

* `POST /api/v1/auth/login` - Authenticates a user and returns a JWT.  
* `POST /api/v1/user/register` - Creates a new user account and a wallet.  

---

### ➡️ User Role Access

These endpoints can only be accessed by a user with the `user` role.

* `POST /api/v1/user/sendmoney` - Sends money to another user.  
  🔒 **Blocked users cannot perform this action.**

* `POST /api/v1/user/withdraw` - Withdraws money from the user's wallet.  
  🔒 **Blocked users cannot perform this action.**

* `GET /api/v1/user/history` - Retrieves the user's transaction history.  

---

### ➡️ Agent Role Access

These endpoints can only be accessed by a user with the `agent` role.

* `POST /api/v1/agent/addmoney` - Adds money to a user's wallet (cash-in).  
  🔒 **Suspended agents cannot perform this action.**

* `GET /api/v1/agent/history` - Retrieves the agent's transaction history.  

---

### ➡️ Admin Role Access

These endpoints can only be accessed by a user with the `admin` role.

* `GET /api/v1/admin/alluser` - Retrieves a list of all users.  
* `GET /api/v1/admin/wallets` - Retrieves a list of all wallets in the system.  
* `GET /api/v1/admin/transactions` - Retrieves all system-wide transactions.  
* `GET /api/v1/transaction/history` - Retrieves all system-wide transactions.  

* `PATCH /api/v1/admin/wallet/user/:userId` - Blocks or unblocks a specific user's wallet.  
  ⚙️ **Business Logic**: A blocked user cannot send or withdraw money.  

* `PATCH /api/v1/admin/wallet/agent/:agentId` - Approves or suspends an agent's status.  
  ⚙️ **Business Logic**: A suspended agent cannot perform add money (cash-in) operations.  

---
 
```plaintext
digital-wallet-api/
├── src/
│   ├── modules/
│   │   ├── admin/
│   │   ├── agent/
│   │   ├── auth/
│   │   ├── transaction/
│   │   └── user/
│   ├── middlewares/
│   ├── config/
│   ├── routes/
│   ├── app.ts
│   └── server.ts
├── .gitignore
├── package.json
├── README.md
└── tsconfig.json
