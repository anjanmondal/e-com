import Order from "../models/order.js";
import User from "../models/user.js";
import Product from "../models/product.js";
import stripe from "stripe";


// place order COD : /api/order/cod
export const placeOrderCOD = async (req, res) => {
    try {
       
        const { userId, items, address } = req.body;

        // 2. Simple check: Do we have an address and items?
        if (!address || !items || items.length === 0) {
            return res.json({ success: false, message: 'Your cart is empty or address is missing' });
        }

        // 3. Calculate the total cost
        let subtotal = 0;

        for (const item of items) {
            const product = await Product.findById(item.product);
            
            if (product) {
                // Add (Price * Quantity) to our total
                subtotal += product.offerPrice * item.quantity;
            }
        }

        // 4. Add a 2% tax
        const tax = subtotal * 0.02;
        const finalAmount = Math.floor(subtotal + tax);

        // 5. Save the order to your Database
        const newOrder = await Order.create({
            userId: userId,
            items: items,
            amount: finalAmount,
            address: address,
            paymentType: "COD",
            status: "Order Placed" 
        });

        
        return res.json({ 
            success: true, 
            message: "Order placed successfully", 
            orderId: newOrder._id 
        });

    } catch (error) {
        // 7. If anything goes wrong, send the error message
        console.error("Order Error:", error);
        return res.json({ success: false, message: "Something went wrong on our end" });
    }
};

// place order online (stripe) : /api/order/stripe
export const placeOrderStripe = async (req, res)=>{
    try {
        const {userId, items, address} = req.body;
        const {origin} = req.headers;
        
        if (!address || items.length === 0) {
            return res.json({success: false, message: 'Invalid data'})
        }

        let productData = [];

        // calculate amount using items
        let amount = await items.reduce(async(acc, item)=>{
            const product = await Product.findById(item.product);
            productData.push({
                name: product.name,
                price: product.offerPrice,
                quantity: item.quantity,
            });
            return (await acc) + product.offerPrice * item.quantity;
        }, 0)
        // add tax charge 2%
        amount += Math.floor(amount * 0.02);

        const order = await Order.create({
            userId,
            items,
            amount,
            address,
            paymentType: "Online",
        });

        // stripe gateway initialization
        const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);

        //create line items for stripe
        const line_items = productData.map((item)=>{
            return {
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: item.name,
                    },
                    unit_amount: Math.floor(item.price + item.price * 0.02) * 100, // amount in cents with tax
                },
                quantity: item.quantity,
            }
        })

        // create stripe checkout session
        const session = await stripeInstance.checkout.sessions.create({
            line_items,
            mode: "payment",
            success_url: `${origin}/loader?next=my-orders`,
            cancel_url: `${origin}/cart`,
            metadata: {
                orderId: order._id.toString(),
                userId,
            }
        })

        return res.json({success: true, url: session.url})
    } catch (error) {
        return res.json({success: false, message: error.message}) 
    }
}

// stripe webhooks to verify payments action : /stripe
export const stripeWebhook = async (req, res)=>{
    // stripe gateway initialization
    const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);
    const sig = req.headers["stripe-signature"]
    let event;
    try {
        event = stripeInstance.webhooks.constructEvent(
            req.body,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET
        )
    } catch (error) {
        res.status(400).send(`Webhook Error: ${error.message}`);
    }

    // handle the checkout.session.completed event
    switch (event.type) {
        case "payment_intent.succeeded": {
            const paymentIntent = event.data.object;
            const paymentIntentId = paymentIntent.id;

            // getting session metadata from payment intent
            const session = await stripeInstance.checkout.sessions.list({
                payment_intent: paymentIntentId,
            })
            const {orderId, userId} = session.data[0].metadata;

            // mark payment as true in order collection
            await Order.findByIdAndUpdate(orderId, {isPaid: true})
            // clear the user's cartdata
            await User.findByIdAndUpdate(userId, {cartItems: {}})
            break;
        }
            
        case "payment_intent.payment_failed": {
            const paymentIntent = event.data.object;
            const paymentIntentId = paymentIntent.id;

            // getting session metadata from payment intent
            const session = await stripeInstance.checkout.sessions.list({
                payment_intent: paymentIntentId,
            })
            const {orderId} = session.data[0].metadata;
            await Order.findByIdAndDelete(orderId);
            break;
        }
    
        default:
            console.error(`Unhandled event type ${event.type}`);
            break;
    }
    res.json({received: true});
}

// get orders by user id : /api/order/user
export const getUserOrders = async (req, res)=>{
    try {
        const userId = req.userId;
        const orders = await Order.find({
            userId,
            $or: [{paymentType: "COD"}, {isPaid: true}]
        }).populate("items.product address").sort({createdAt: -1});
        res.json({success: true, orders})
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}

// get all orders for seller or admin : /api/order/admin
export const getAllOrders = async (req, res)=>{
    try {
        const orders = await Order.find({
            $or: [{paymentType: "COD"}, {isPaid: true}]
        }).populate("items.product address").sort({createdAt: -1});
        res.json({success: true, orders})
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}