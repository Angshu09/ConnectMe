import jwt from "jsonwebtoken"

const isAuth = async (req, res, next) => {
    try {
        
        let token = req.cookies.token
        // console.log(token)

        if(!token){
            return res.status(400).json({
                message: "Token is not found"
            })
        }

        let verifyToken = await jwt.verify(token, process.env.JWT_SECRET)
        // console.log(verifyToken)
        req.userId = verifyToken.id
        
        next()
    } catch (error) {
        return res.status(500).json({
            message: `isAuth error - ${error}`
        })
    }
}

export default isAuth;