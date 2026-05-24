import express from 'express';
import authUser from '../middlewares/auth-user.js';
import { getAllOrders, getUserOrders, placeOrderCOD, placeOrderStripe } from '../controllers/order-controller.js';
import authSeller from '../middlewares/auth-seller.js';

const orderRouter = express.Router();

orderRouter.post('/cod', authUser, placeOrderCOD);
orderRouter.post('/stripe', authUser, placeOrderStripe);
orderRouter.get('/user', authUser, getUserOrders);
orderRouter.get('/admin', authSeller, getAllOrders);

export default orderRouter;