import UserModel from '../user/model';
import token from '../utils/token';

/**
 * @author Lee Jin
 * @title Application Middleware
 * @notice verfy JWT token when user signin or signup
 * @dev Authorization check first in header
 */

/**
 * @notice JWT token validate and extract user from JWT token
 * @dev splic http request and validate it and extract user info from user table.
 * @param req request from client
 * @param res res to client
 * @param next
 * @return error 401 or 404 response, return response user
 */
export default {
  loginRequired: (req, res, next) => {
    // Check header authorization
    if (!req.header('Authorization')) return res.status(401).send({ message: 'Please make sure your request has an Authorization header.' });
    // Validate jwt
    let try_token = req.header('Authorization').split(' ')[1];

    //VerifyToken
    token.verifyToken(try_token, (err, payload) => {
      if (err) return res.status(401).send(err);
      UserModel.findById(payload.sub)
        .exec((err, user) => {
          if (err || !user) {
            return res.status(404).send(err || {
              error: 'middleware User not found!!!'
            });
          }
          delete user.password;
          req.user = user;
          next();
        })
    })
  }
}
