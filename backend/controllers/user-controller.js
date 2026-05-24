import User from "../models/user.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// register user : /api/user/register
export const register = async (req, res)=>{
    try {

        const {name, email, password} = req.body;
        if (!name || !email || !password) {
            return res.json({success: false, message: 'All fields are required'});
        }

        const existingUser = await User.findOne({email});
        if (existingUser) {
            return res.json({success: false, message: 'User already exists'});
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({name, email, password: hashedPassword});

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET_KEY, {expiresIn: '7d'});
        res.cookie('token', token, {
            httpOnly: true, // prevent client side JS to access the cookie
            secure:false, // use secure cookies in production
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict', // CSRF protection
            maxAge: 7*24*60*60*1000 // 7 days
        })

        return res.json({success: true, user: {email: user.email, name: user.name}});

    } catch (error) {
        console.log(error.message)
        res.json({success: false, message: error.message});
    }
}

// login user : /api/user/login
export const login = async (req, res)=>{
    try {

        const {email, password} = req.body;
        if (!email || !password) {
            return res.json({success: false, message: 'Email and password are required'});
        }
        const user = await User.findOne({email});
        if (!user){
            return res.json({success: false, message: 'Invalid email'});
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.json({success: false, message: 'Incorrect password'});
        }

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET_KEY, {expiresIn: '7d'});
        res.cookie('token', token, {
            httpOnly: true, // prevent client side JS to access the cookie
            secure: process.env.NODE_ENV === 'production', // use secure cookies in production
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict', // CSRF protection
            maxAge: 7*24*60*60*1000 // 7 days
        })

        return res.json({success: true, user: {email: user.email, name: user.name}});

    } catch (error) {
        console.log(error.message)
        res.json({success: false, message: error.message});
    }
}

// check auth : /api/user/is-auth
export const isAuth = async (req, res) =>{
    try {
        const {userId} = req;
        const user = await User.findById(userId).select("-password");
        return res.json({success: true, user});
    } catch (error) {
        console.log(error.message)
        res.json({success: false, message: error.message});
    }
}

// logout user : /api/user/logout
export const logout = async (req, res) =>{
    try {
        res.clearCookie('token', {
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

// get all users for seller or admin : /api/user/admin
export const getAllUsers = async (req, res)=>{
    try {
        const users = await User.find().sort({createdAt: -1});
        res.json({success: true, users})
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}