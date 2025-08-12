import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import UserModel from "../models/userModel.js";
import transporter from "../config/nodemailer.js";
import { EMAIL_VERIFY_TEMPLATE, PASSWORD_RESET_TEMPLATE } from "../config/emailTemplates.js";

export const register = async (req, res) => {
    const {name, email, password} = req.body;

    if(!name || !email || !password) {
        return res.json({success: false, message: "All fields are required"});
    }

    try {
        // if there is already the same email then no need to create another account with same email
        const existingUser = await UserModel.findOne({email});
        if(existingUser){
            return res.json({success: false, message: "User with this email already exists"});
        }

        // encrypt password
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new UserModel({name, email, password: hashedPassword});
        await user.save();
        
        
        // generate JWT token
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '1h'})

        res.cookie('token', token, { // added JWT token in cookie
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // false
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : "strict", // for localhost write Strict, else none
            maxAge: 60 * 60 * 1000 // 1 hour  // cookie expires in 1 hour
        })


        // sending email 
        const mailOptions = {
    from: process.env.SENDER_EMAIL,
    to: email,
    subject: "Welcome to Teacher Finder – Let’s Make Learning Simple!",
    text: `Hi ${name},

Welcome to Teacher Finder! 🎉  
We’re thrilled to have you join our growing community of learners and educators.

At Teacher Finder, our mission is simple:  
To connect students with the right educators, and make quality learning accessible to everyone.

Here’s what you can expect:
✔ Easy access to verified faculty profiles  
✔ Up-to-date contact information for quick communication  
✔ A growing network of academic excellence

This is just the beginning – we’re constantly improving to give you the best experience possible.

Thank you for trusting us to be part of your learning journey.  
We’re glad to have you on board!

Warm regards,  
Abdul Rahman Azam & Mufeez Hanif  
Co-Founders – Teacher Finder`
};

        await transporter.sendMail(mailOptions);

        return res.json({success: true, message: "Registration successful"});
    } catch (error) {
        res.json({success: false, message: error.message});
    }
}


export const login = async (req, res) => {
    const {email, password} = req.body;

    if(!email || !password){
        return res.json({success: false, message: "Email and password are required"});
    }

    try {
        // to check either their is email present in the database
        const user = await UserModel.findOne({email});
        if(!user){
            return res.json({success: false, message: "Invalid email"});
        }

        // check password is correct or not
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.json({success:false, message:"Invalid password"})
        }

        // generate JWT token
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '1h'});
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : "strict",
            maxAge: 60 * 60 * 1000 // 1 hour
        })

        return res.json({success: true, message: "Login successful"});
    } catch (error) {
        return res.json({success: false, message: error.message});
    }
}


export const logout = async (req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : "strict",
        })

        return res.json({success: true, message: "Logout successful"});
    } catch (error) {
        return res.json({success: false, message:error.message});
    }
}


export const sendVerifyOtp = async (req, res) => {
    try {
        const {userId} = req.user;
        const user = await UserModel.findById(userId);


        if(user.isAccountVerified){
            return res.json({success: false, message: "Account is already verified"});
        }

        const otp = String(Math.floor(100000 + Math.random() * 900000)).substring(0, 6);
        user.verifyOtp = otp;
        user.verifyOtpExpireAt = Date.now() + 60 * 60 * 1000; // 1 hour expiry

        await user.save();

        // Send OTP via email
        const mailOption = {
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: "Verify Your Teacher Finder Account",
            html: EMAIL_VERIFY_TEMPLATE.replace("{{email}}", user.email).replace("{{otp}}", otp),
            // `
            //     <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px;">
            //         <h2>Hello ${user.name},</h2>
            //         <p>Your verification code is:</p>
            //         <div style="background-color: #f0f0f0; padding: 15px; border-radius: 5px; text-align: center; margin: 20px 0;">
            //             <h1 style="color: #2563eb; font-size: 32px; letter-spacing: 8px; margin: 0;"><strong>${otp}</strong></h1>
            //         </div>
            //         <p><em>Valid for 1 hour.</em></p>
            //         <br>
            //         <p>Best regards,<br>
            //         <strong>Abdul Rahman Azam & Mufeez Hanif</strong><br>
            //         Teacher Finder Team</p>
            //     </div>
            // `,
            // text: `Hello ${user.name},\n\nYour verification code is: ${otp}\n\nValid for 1 hour.\n\nBest regards,\nAbdul Rahman Azam & Mufeez Hanif`
        }

        await transporter.sendMail(mailOption);

        res.json({success: true, message: "OTP sent successfully"});

    } catch (error) {
        res.json({success: false, message: error.message});
    }
}

export const verifyEmail = async (req, res) => {
    const { otp } = req.body;
    const { userId } = req.user;

    if(!userId || !otp){
        return res.json({success: false, message: "User ID and OTP are required"});
    }

    try {
        const user = await UserModel.findById(userId);
        if(!user){
            return res.json({success: false, message: "User not found"});
        }

        if(user.verifyOtp === '' || user.verifyOtp !== otp){
            return res.json({success: false, message: `Invalid OTP`});
        }

        if(user.verifyOtpExpireAt < Date.now()){
            return res.json({success: false, message: "OTP has expired"});
        }

        user.isAccountVerified = true;
        user.verifyOtp = '';
        user.verifyOtpExpireAt = 0; // Reset OTP and expiry

        await user.save();

        return res.json({success: true, message: "Email verified successfully"});
        
    } catch (error) {
        res.json({success: false, message: `verifyEmail: ${error.message}`});
    }

}


export const isAuthenticated = async (req, res) => {
    try {
        return res.json({success: true, message: "User is authenticated"});
    } catch (error) {
        res.json({success: false, message: `isAuthenticated: ${error.message}`});
    }
}

// send Password Reset OTP
export const sendResetOtp = async (req, res) => {
    const {email} = req.body;

    if(!email){
        return res.json({success: false, message: `sendResetOtp: Email is required` });
    }

    try {
        const user = await UserModel.findOne({email});
        if(!user){
            return res.json({success: false, message: `sendResetOtp: User not found` });
        }

        const otp = String(Math.floor(100000 + Math.random() * 900000)).substring(0, 6);
        user.resetOtp = otp;
        user.resetOtpExpireAt = Date.now() + 60 * 60 * 1000; // 1 hour expiry

        await user.save();
        // Send OTP via email
        const mailOption = {
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: "Password Reset OTP",
            html: PASSWORD_RESET_TEMPLATE.replace("{{email}}", user.email).replace("{{otp}}", otp),
            //  `
            //     <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px;">
            //         <h2>Hello ${user.name},</h2>
            //         <p>Your password reset OTP is: </p>
            //         <div style="background-color: #f0f0f0; padding: 15px; border-radius: 5px; text-align: center; margin: 20px 0;">
            //             <h1 style="color: #2563eb; font-size: 32px; letter-spacing: 8px; margin: 0;"><strong>${otp}</strong></h1>
            //         </div>
            //         <p><em>Valid for 1 hour.</em></p>
            //         <br>
            //         <p>Best regards,<br>
            //         <strong>Abdul Rahman Azam & Mufeez Hanif</strong><br>
            //         Teacher Finder Team</p>
            //     </div>
            // `,
            // text: `Hello ${user.name},\n\nYour password reset OTP is: ${otp}. Use this OTP to proceed with resetting your password\n\nValid for 1 hour.\n\nBest regards,\nAbdul Rahman Azam & Mufeez Hanif`
        }

        await transporter.sendMail(mailOption);

        return res.json({success: true, message: "Password reset OTP sent successfully"});

    } catch (error) {
        return res.json({success: false, message: `sendResetOtp: ${error.message}` });
    }
}

// Rest User Password
export const resetPassword = async (req, res) => {
    const { email, newPassword, otp } = req.body;

    if(!email ||  !otp || !newPassword) {
        return res.json({success: false, message: "Email, OTP and new password are required"});
    }

    try {
        const user = await UserModel.findOne({ email });

        if(!user){
            return res.json({success: false, message: "User not found"});
        }

        if(user.resetOtp === '' || user.resetOtp !== otp){
            return res.json({success: false, message: "Invalid or expired OTP"});
        }

        if(user.resetOtpExpireAt < Date.now()){
            return res.json({success: false, message: "OTP has expired"});
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        user.resetOtp = '';
        user.resetOtpExpireAt = 0; // Reset OTP and expiry

        await user.save();

        return res.json({success: true, message: "Password reset successfully"});

    } catch (error) {
        res.json({success: false, message: `resetPassword: ${error.message}`});
    }
}