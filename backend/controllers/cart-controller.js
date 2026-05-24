import User from "../models/user.js";


// update user cart data : /api/cart/update
export const updateCart = async (req, res)=>{
    try {
        const {cartItems} = req.body;
        const userId = req.userId;
        if (!userId || !cartItems) {
            return res.json({success: false, message: 'Missing user ID or cart items'});
        }
        await User.findByIdAndUpdate(userId, {cartItems})
        res.json({success: true, message: 'Cart updated'})
    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message}) 
    }
}