import express from 'express';
import { isAuth, login, logout, register, getAllUsers } from '../controllers/user-controller.js';
import authUser from '../middlewares/auth-user.js';
import authSeller from '../middlewares/auth-seller.js';

const userRouter = express.Router();

userRouter.post('/register', register);
userRouter.post('/login', login);
userRouter.get('/is-auth', authUser, isAuth);
userRouter.get('/logout', authUser, logout);
userRouter.get('/admin', authSeller, getAllUsers);

export default userRouter;