import { addDoc, collection, doc, getDoc } from "firebase/firestore";
import { database } from "../firebase";

export async function checkPhoneIsRegistered(phone: string) {
    const snapshot = await getDoc(doc(database, 'users/' + phone));
    return snapshot.exists();
};

export async function createUser(phone: string) {
    try {
        await addDoc(collection(database, 'users'), { phone: phone });
    } catch (error) {
    }
};

export async function createPhones(phones: string[]) {
    try {
        await addDoc(collection(database, 'phones'), { phones: phones });
    } catch (error) {
    }
};