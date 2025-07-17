import jsonwebtoken from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const authMiddleWare = (req, res, next) => {

    const jwtToken = req.cookies.token;

    if (!jwtToken) {
        return res.status(401).send('Unauthorized');
    }

    jsonwebtoken.verify(jwtToken, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            console.log("Invalid JWT token");
            return res.status(401).send('Unauthorized');
        }
        req.user = user;
        next();
    });
}

export default authMiddleWare;