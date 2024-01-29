import { Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import qr2 from 'qrcode';
import { createClient } from "../../whatsapp/client";

export function login(
    socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>,
    phone: string,
) {
    socket.data.client = createClient(phone);

    socket.data.client.on('qr', (qrCode: string) => {
        console.log('Qr code is ready!');

        qr2.toDataURL(qrCode, (error: Error | null | undefined, url: string) => {
            if (error) socket.emit('error', 'Error occurred');
            socket.emit('qr-ready', url);
        });
    });

    socket.data.client.on('ready', () => {
        console.log('Client is ready!');
        socket.emit('whatsapp-connected');
    });

    socket.data.client.initialize();
}