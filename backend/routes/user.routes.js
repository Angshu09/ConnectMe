import express from "express";

import isAuth from "../middlewares/isAuth.js";
import { getCurrentUser } from "../controllers/user.controllers.js";
const userRouter = express.Router();

//Here we are putting a middleware isAuth for getting the userId from the token
userRouter.get("/currentUser", isAuth, getCurrentUser);

export default userRouter;
