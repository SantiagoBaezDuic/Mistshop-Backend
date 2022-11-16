import jwt from "jsonwebtoken";

const PRIVATE_KEY = process.env.JWT_KEY;

function generateToken(user){
    const token = jwt.sign({data: user}, PRIVATE_KEY, {expiresIn: "24h"})
    return token;
}

function verifyToken(token){
    const resp = jwt.verify(token, PRIVATE_KEY, (err, decoded) => {
        if(err){
            return { status: "failure", err};
        } else {
            return { status: "success", decoded};
        }
    })
    return resp;
}

async function AuthMiddleware(req, res, next){
    const headerToken = req.headers.authorization;

    if(!headerToken){
        return { status: "failure", message: "Access denied" };
    } else {
        const token = headerToken.split(" ")[1];
        //Me faltaría poder conseguir la blacklist de tokens para poder chequear que no esté el token utilizado
        const response = verifyToken(token);
        if(response.status === "success"){
            next();
        } else {
            return { status: "failure", message: response.err}
        }
    }
}

export { generateToken, verifyToken, AuthMiddleware };