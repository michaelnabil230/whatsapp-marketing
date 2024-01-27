// export default {
//     host: "0.0.0.0",
//     port: 3000,
//     firebase: {
//         apiKey: process.env.API_KEY,
//         authDomain: process.env.AUTH_DOMAIN,
//         databaseURL: process.env.DATABASE_URL,
//         projectId: process.env.PROJECT_ID,
//         storageBucket: process.env.STORAGE_BUCKET,
//         messagingSenderId: process.env.MESSAGING_SENDER_ID,
//         appId: process.env.APP_ID,
//     }
// }


import dotenv from 'dotenv';
import assert from 'assert';

dotenv.config();

const {
    PORT,
    HOST,
    API_KEY,
    AUTH_DOMAIN,
    PROJECT_ID,
    STORAGE_BUCKET,
    MESSAGING_SENDER_ID,
    APP_ID,
} = process.env;

assert(PORT, 'Port is required');
assert(HOST, 'Host is required');

export default {
    host: HOST,
    port: PORT,
    firebase: {
        apiKey: API_KEY,
        authDomain: AUTH_DOMAIN,
        projectId: PROJECT_ID,
        storageBucket: STORAGE_BUCKET,
        messagingSenderId: MESSAGING_SENDER_ID,
        appId: APP_ID,
    },
};
