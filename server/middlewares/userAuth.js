import jwt from "jsonwebtoken";

const userAuth = async (req, res, next) => {
    const {token} = req.cookies;

    if(!token){
        return res.json({success: false, message: "No token provided"});
    }

    try {
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
        if(tokenDecode.id){
            req.user = { userId: tokenDecode.id };
        }else{
            return res.json({success: false, message: "Not Authorized Login Again"});
        }

        next();
        
    } catch (error) {
        res.json({success: false, message: `userAuth: ${error.message}`}); 
    }
}

export default userAuth;