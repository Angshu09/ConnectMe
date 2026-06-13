import jwt from 'jsonwebtoken'

const generateToken = async (id) => {
    try {
        const token = await jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: "4d"})
        return token
    } catch (error) {
        console.log("Generate token error")
    }
}

export default generateToken