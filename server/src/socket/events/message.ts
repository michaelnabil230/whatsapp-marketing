import { Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import sleep from "sleep-promise";
import { createPhones } from "../../database/query";

export async function message(
    socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>,
    sleepPeriod: number,
    phones: string[],
    message: string,
) {
    for (let index = 0; index < phones.length; index++) {
        await socket.data.client.sendMessage(phones[index] + '@c.us', message);
        socket.emit('finished-sending', 'fished ' + (index + 1) + ' of ' + phones.length);
        await sleep(sleepPeriod * 1000);
    }

    socket.emit('finished-sended');
    createPhones(phones);
}