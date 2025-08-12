import UserModel from "../models/userModel.js";


export const getUserData = async (req, res) => {
    try {
        const {userId} = req.user;

        const user = await UserModel.findById(userId);
        if(!user){
            return res.json({success: false, message: "User not found"});
        }

        res.json({
            success: true,
            userData: {
                name: user.name,
                isAccountVerified: user.isAccountVerified,
                email: user.email,
            }
        })

    } catch (error) {
        res.json({success: false, message: error.message});
    }
}