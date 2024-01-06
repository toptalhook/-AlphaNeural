import jwt from 'jwt-simple';
import config from '../constant/config';

export default {
    generateToken: function (user) {
        const timeStamp = new Date().getTime();
        const payload = {
            sub: user.id,
            iat: timeStamp
        }
        return jwt.encode(payload, config.jwt_secret);
    },
    verifyToken: (token, cb) => {
        const decode = jwt.decode(token, config.jwt_secret)
        if (!decode) return cb(new Error('Token is not verified.'));
        cb(null, decode);
    }
}
