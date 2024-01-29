import dotenv from 'dotenv';
import assert from 'assert';

const mode = process.env.NODE_ENV ?? 'development';

dotenv.config({ path: mode === 'production' ? '.env.production' : '.env' });

const {
    PORT,
    HOST,
    SSL_KEY,
    SSL_CERT,
    ORIGIN,
    API_KEY,
    AUTH_DOMAIN,
    PROJECT_ID,
    STORAGE_BUCKET,
    MESSAGING_SENDER_ID,
    APP_ID,
} = process.env;

assert(PORT, 'Port is required');
assert(HOST, 'Host is required');
assert(SSL_KEY, 'Ssl key is required');
assert(SSL_CERT, 'Ssl cert is required');

export default {
    host: HOST,
    port: PORT,
    sslKey: SSL_KEY,
    sslCert: SSL_CERT,
    origin: ORIGIN,
    firebase: {
        apiKey: API_KEY,
        authDomain: AUTH_DOMAIN,
        projectId: PROJECT_ID,
        storageBucket: STORAGE_BUCKET,
        messagingSenderId: MESSAGING_SENDER_ID,
        appId: APP_ID,
    },
};
