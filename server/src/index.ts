import http from "http"
import express from "express"
import { Server } from "socket.io"
import { checkPhoneIsRegistered, createPhones } from "./firebase";
import Whatsapp from "whatsapp-web.js";
import qr2 from "qrcode";
import sleep from "sleep-promise";

const { Client, LocalAuth } = Whatsapp;

const app = express()
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173"
    }
});

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

    socket.on('login', (phone: string) => {
        socket.data.client = new Client({
            authStrategy: new LocalAuth({ clientId: `session-${phone}` }),
        });

        socket.data.client.on("qr", (qrCode: string) => {
            console.log("Qr code is ready!");

            qr2.toDataURL(qrCode, (error: Error | null | undefined, url: string) => {
                if (error) socket.emit('error', "Error occurred");
                socket.emit('qr-ready', url);
            });
        });

        socket.data.client.on("ready", () => {
            console.log("Client is ready!");
            socket.emit('whatsapp-connected');
        });

        socket.data.client.initialize();
    });

    socket.on('message', async (sleepPeriod: number, phones: string[], message: string) => {
        for (let index = 0; index < phones.length; index++) {
            await socket.data.client.sendMessage(phones[index] + '@c.us', message);
            socket.emit('finished-sending', 'fished ' + (index + 1) + ' of ' + phones.length);
            await sleep(sleepPeriod * 1000);
        }

        socket.emit('finished-sended');
        createPhones(phones);
    });
});

// io.use((socket, next) => {
//     checkPhoneIsRegistered('').then(() => {
//         next();
//     }).catch(() => {
//         next(new Error("invalid"));
//     })
// });

server.listen(3000, () => {
    console.log('Server started and listening on *:3000');
});