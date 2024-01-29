import https from 'https'
import express, { Request, Response } from 'express'
import { Server } from 'socket.io'
import * as path from 'path';
import * as fs from 'fs';
import config from './config';
import { connection } from './socket';

const expressApp = express()
expressApp.get('/', (_: Request, response: Response) => response.send('Server is work'));

const server = https.createServer({
    secureOptions: 67108864,
    key: fs.readFileSync(path.resolve(config.sslKey)),
    cert: fs.readFileSync(path.resolve(config.sslCert)),
}, expressApp);

const io = new Server(server, { cors: { origin: config.origin } });
io.on('connection', connection);
// io.use((socket, next) => {
//     checkPhoneIsRegistered('').then(() => {
//         next();
//     }).catch(() => {
//         next(new Error('Invalid'));
//     })
// });

server.listen(config.port, () => console.log('Server started and listening on *:' + config.port));