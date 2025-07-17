import express from 'express';
import { createAccountController, loginUserController } from '../controllers/usersController.js';
import checkExistingAccount from "../middlewares/users/checkExistingAccount.js";
import { createAccountValidator, loginUserValidator } from "../middlewares/users/userValidator.js";

const usersRouter = express.Router();

usersRouter.post('/createAccount', createAccountValidator, checkExistingAccount, createAccountController);
usersRouter.post('/login', loginUserValidator, loginUserController);

export default usersRouter;