import jsonwebtoken from 'jsonwebtoken'
import { JWT_EXPIRES_IN } from './constants.js'
import dotenv from 'dotenv';

dotenv.config();

const generateJwtToken = (userPayload) => {
    return jsonwebtoken.sign(userPayload, process.env.JWT_SECRET, {
        expiresIn: JWT_EXPIRES_IN
    })
}

export default generateJwtToken;