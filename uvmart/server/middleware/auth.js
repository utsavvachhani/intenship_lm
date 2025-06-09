import jwt from 'jsonwebtoken'

const auth = ( req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const isCustomAuth  = token.length < 500;
        let decodedData;
        if( token && isCustomAuth){
            decodedData = jwt.verify(token, 'test');
            req.userId = decodedData?.id;
            console.log("Custom auth called!!");
            
        } else {
            decodedData = jwt.decode(token);
            req.userId = decodedData?.sub;
            console.log("google auth called!!");
        }

        next();
    } catch (error) {
        console.log(error);

    }
}

export default auth;