import mongoose from 'mongoose';
import timeZone from "mongoose-timezone";
import bcrypt from 'bcrypt-nodejs';

const moment = require('moment-timezone');

// Define the model
const Schema = new mongoose.Schema({
    userName: 
    {
        type: String,
        required: true
    },
    companyName: {
        type: String
    },
    emailAddress: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        rquired: true,
    },
    location: {
        type: String,
        required: true
    },
    role: {
        type: Number,
        default: 0
    },
    bio: {
        type: String,
        required: true
    },
    checkProductUpdates: {
        type: Boolean,
        default: false
    },
    checkCommunityAnnouncementes: {
        type: Boolean,
        default: false
    },
    dataVerificationUpdates: {
        type: Boolean,
        default: false
    },
    accountNotification: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: () => moment().toDate(),
    },
    deletedAt: {
        type: Date,
        default: null,
    },
    paymentMethod: {
        type: String,
        default: ""
    }
}, { timestamps: { updatedAt: 'updatedAt' } });

Schema.plugin(timeZone, { path: ['createdAt'] });

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
