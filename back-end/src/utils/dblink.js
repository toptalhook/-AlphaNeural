import mongoose from 'mongoose';

const connectDatabase = async () => {
    try {
        mongoose.connect(config.database.url, {
            // 'mongodb://127.0.0.1:27017'            process.env.MONGO_URI
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }).then(() => console.log("Mongoose Connected"));
    } catch(error) {
        console.log(error);

    }
}