import token from '../utils/token';
import UserModel from '../user/model';
import bcrypt from 'bcrypt-nodejs';
import ValidateData from './validate';

/**
 * @author Lee Jin
 * @title Application Authenticaton
 * @notice User Signup, Login, Profile management
*/

const { Types } = require("mongoose");

export default {
    /**
     * @notice Sever accepts signUp request and Generate JWT token and send it to the client
     * @dev validate signUp request params and find user from user table.
            if user exists in user table, return false.
            if user doesn't exist from table, add record user's record and return jwt token.
     * @param {*} req singUp user info(userName, companyName, emailAddress, password, confirmPassword)
     * @param {*} res 
     * @param {*} next 
     * @returns signUp flag, error string if exist and jwt token
     */
    signup: (req, res, next) => {

        const { userName, companyName, emailAddress, password, confirmPassword } = req.body;

        ValidateData.signUpCheck(userName, companyName, emailAddress, password, confirmPassword);

        UserModel
            .findOne({
                userName: username
            }, (err, existingUser) => {

                if (err) return res.status(422).send(err);
                console.log('we are here', existingUser)
                if (existingUser) {
                    return res
                        .status(425)
                        .send({ error: 'Username is in use' });
                }

                const user = new UserModel({
                    firstName: firstName,
                    lastName: lastName,
                    userName: username.toLowerCase(),
                    password: password,
                    approve: false,
                    sex: 'Male',
                    birthday: Date.now(),
                    ipAddress: realIpAddress
                })

                user.save((err, savedUser) => {
                    if (err) {
                        return next(err)
                    }
                    res.json({
                        success: true,
                        token: token.generateToken(savedUser)
                    })
                })
            })
    },

    signin: (req, res, next) => {
        const username = req.body.username;
        const password = req.body.password;

        const ipAddress = req.header('x-forwarded-for') || req.socket.remoteAddress;

        const realIpAddress = ipAddress.slice(':::ffff'.length);

        console.log("+++++++++++++++++++++Login Attempt++++++++++", username, realIpAddress, password)

        console.log('==========we meet the user============')

        if (!username || !password) {
            return res
                .status(422)
                .send({ error: 'You must provide username and password.' });
        }
        UserModel
            .findOne({
                userName: { $regex: new RegExp(username, "i") }
            }, (err, existingUser) => {
                if (err || !existingUser || existingUser.deletedAt) {
                    return res.status(401).send({ error: "User Not Found" })
                }
                if (existingUser) {
                    console.log('PASSWORD=', password);
                    console.log(existingUser.password);
                    existingUser.comparedPassword(password, function (err, good) {
                        console.log('===================2=');
                        console.log(err);
                        console.log(good);
                        console.log('===================1=');
                        if (err || !good) {
                            return res.status(402).send(err || { error: "Your password is not correct" })
                        }
                        if (existingUser.ipAddress != realIpAddress) {
                            return res.status(403).send(err || { error: "User Not Allowed From That IP Address" })
                        }
                        if (!existingUser.approve) {
                            return res.status(404).send("Please wait until you are approved.")
                        }
                        res.cookie('name', 'value', { maxAge: 180000 });
                        res.send({
                            user: existingUser,
                            token: token.generateToken(existingUser)
                        })
                    })
                }
            })
    },

    resetPassword: async (req, res, next) => {

        const { userId, values } = req.body
        const toObjId = (id) => {
            return Types.ObjectId(id);
        };

        try {

            const user = await UserModel.findById(toObjId(userId))

            // Check if the user exists and the old password is correct
            if (user && user.comparedPassword(values.password, user.password)) {
                if (err || !good) {
                    return res.status(401).send(err || 'User not found')
                }

                // Generate hash for the new password
                const newHashedPassword = bcrypt.hashSync(new_password, 10);

                // Update the password
                user.password = newHashedPassword;
                await user.save();
                return res.json({ message: 'Password changed successfully' });
            }
        }
        catch (err) {
            console.log(err)
            res.status(401).send(err || 'User not found')
        }
    }
}
