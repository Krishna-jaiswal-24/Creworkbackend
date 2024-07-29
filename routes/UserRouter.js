import express from "express";
import CreateUser from "../controllers/Users/CreateUser.js";
import LoginUser from "../controllers/Users/LoginUser.js";

const UserRouter = express.Router();

UserRouter.post("/register", CreateUser);
UserRouter.post("/login", LoginUser);

export default UserRouter;
