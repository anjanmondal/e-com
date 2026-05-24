import 'dotenv/config';
import dns from "node:dns";

dns.setServers(["8.8.8.8", "8.8.4.4"]);

import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import userRouter from "./routes/user-routes.js";
import sellerRouter from "./routes/seller-routes.js";

import productRouter from "./routes/product-routes.js";
import cartRouter from "./routes/cart-routes.js";
import addressRouter from "./routes/address-routes.js";
import orderRouter from "./routes/order-routes.js";
import { stripeWebhook } from "./controllers/order-controller.js";

const app = express();

await connectDB();


// stripe configuration
app.post("/stripe", express.raw({ type: "application/json" }), stripeWebhook);

const allowedOrigins = ["https://e-com-2-vmz6.onrender.com"];

// middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);

      if (allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use("/api/user", userRouter);
app.use("/api/admin", sellerRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/address", addressRouter);
app.use("/api/order", orderRouter);

app.listen(5000, () => {
  console.log(`Server is running `);
});
