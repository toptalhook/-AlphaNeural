import dotenv from 'dotenv';
import path from 'path';

if(process.env.NODE_ENV !== 'production'){
  try {
    dotenv.config({
      path: path.resolve(__dirname, '.env'),
      silent: true
    });
  } catch (e) {
    console.error(e.message)
  }
}

var dbUrl;

if (process.env.DATABASE_URL) {
    dbUrl = process.env.DATABASE_URL;
} else if (
    process.env.DATABASE_NAME &&
    process.env.DATABASE_USER &&
    process.env.DATABASE_PASSWORD &&
    process.env.DATABASE_HOST &&
    process.env.DATABASE_PORT
) {
    dbUrl =
        "mongodb://" +
        process.env.DATABASE_USER +
        ":" +
        process.env.DATABASE_PASSWORD +
        "@" +
        process.env.DATABASE_HOST +
        ":" +
        process.env.DATABASE_PORT +
        "/" +
        process.env.DATABASE_NAME;
} else {
    dbUrl = "mongodb://127.0.0.1:27017/alphaneural_db";
}

var config = {
    database: {
        url: dbUrl,
    },
    server: {
        host: "127.0.0.1",
        port: "3000",
    },
    jwt_secret: process.env.JWT_SECRET || 'unsafe_jwt_secret',
    port: process.env.PORT || 3000

};

module.exports = config;