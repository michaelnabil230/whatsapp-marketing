import { Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { login, message } from "./events";

export function connection(
    socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>,
) {
    console.log('A new user connected :)');

    socket.on('disconnect', () => console.log('User disconnected :('));

    socket.on('login', (phone: string) => login(socket, phone));

    socket.on('message', async (sleepPeriod: number, phones: string[], text: string) => await message(socket, sleepPeriod, phones, text));
}