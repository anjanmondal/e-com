import jwt from 'jsonwebtoken';

// admin login : /api/admin/login
export const sellerLogin = async (req, res) =>{

    try {
            const { email, password } = req.body;
            if (email === process.env.SELLER_EMAIL && password === process.env.SELLER_PASSWORD) {
                const token = jwt.sign({email}, process.env.JWT_SECRET_KEY, {expiresIn: '7d'});
                res.cookie('sellerToken', token, {
                    httpOnly: true, // prevent client side JS to access the cookie
                    secure: process.env.NODE_ENV === 'production', // use secure cookies in production
                    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict', // CSRF protection
                    maxAge: 7*24*60*60*1000 // 7 days
                });
                return res.json({success: true, message: "Loggedin successfully"});
            } else {
                return res.json({success: false, message: "Invalid credentials"});
            }
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message});
    }
}

// check auth : /api/admin/is-auth
export const isSellerAuth = async (req, res) =>{
    try {
        return res.json({success: true});
    } catch (error) {
        console.log(error.message)
        res.json({success: false, message: error.message});
    }
}

// logout admin : /api/admin/logout
export const sellerLogout = async (req, res) =>{
    try {
        res.clearCookie('sellerToken', {
            httpOnly: true, // prevent client side JS to access the cookie
            secure: process.env.NODE_ENV === 'production', // use secure cookies in production
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict', // CSRF protection
        });
        return res.json({success: true, message: 'Logged out successfully'});
    } catch (error) {
        console.log(error.message)
        res.json({success: false, message: error.message});
    }
}