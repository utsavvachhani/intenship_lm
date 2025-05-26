import jwt from 'jsonwebtoken'

const auth = ( req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Authorization token missing or malformed" });
        }
        
        const token = authHeader.split(" ")[1];
        const isCustomAuth  = token.length < 500;

        let decodedData;

        if( token && isCustomAuth){
            decodedData = jwt.verify(token, "test");
            req.userId = decodedData?.id;
        } else {
            decodedData = jwt.decode(token);
            req.userId = decodedData?.sub;
        }

        next();
    } catch (error) {   
        console.log(error);
        
    }
}

export default auth;