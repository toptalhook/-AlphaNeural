import mongoose from 'mongoose';
import timeZone from "mongoose-timezone";
import bcrypt from 'bcrypt-nodejs';

const moment = require('moment-timezone');

// Define the model
const Schema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    userName: {
        type: String,
        unique: true,
    },
    nickName: {
        type: String
    },
    group: String,
    role: {
        type: String,
        default: "General"
    },
    password: String,
    approve: {
        type: Boolean,
        default: false
    },
    stacks: String,
    birthday: {
        type: Date,
    },
    ipAddress: {
        type: String,
        default: null
    },
    ipMsgId: {
        type: String,
        default: null
    },
    netKeyId: {
        type: String,
        default: null
    },
    teamNo: {
        type: String,
        default: null
    },
    roomNo: {
        type: String,
        default: null
    },
    createdAt: {
        type: Date,
        default: () => moment().toDate(),
    },
    deletedAt: {
        type: Date,
        default: null,
    },
    sex: {
        type: String,
        default: null
    },
    group: String
    
}, { timestamps: { updatedAt: 'updatedAt' } });

Schema.plugin(timeZone, { path: ['createdAt', 'birthday'] });

Schema.pre('save', function (next) {
    // get access to user model, then we can use user.email, user.password
    const user = this;

    bcrypt.genSalt(10, function (err, salt) {
        if (err) { return next(err) }

        bcrypt.hash(user.password, salt, null, function (err, hash) {
            if (err) { return next(err); }

            user.password = hash;
            next()
        })
    })
})

// Make use of methods for comparedPassword
Schema.methods.comparedPassword = function (candidatePassword, cb) {
    console.log('-----------------', candidatePassword, this.password)
    bcrypt.compare(candidatePassword, this.password, function (err, good) {
        console.log(err);
        console.log(good);
        console.log('===============');
        if (err) { return cb(err) }
        cb(null, good);
    })
}

// Export the model
export default mongoose.model('User', Schema);
