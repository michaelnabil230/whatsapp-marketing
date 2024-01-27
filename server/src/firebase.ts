import { initializeApp } from "firebase/app";
import {
    getFirestore,
    collection,
    doc,
    addDoc,
    getDoc,
    getDocs,
    updateDoc,
    deleteDoc,
} from "firebase/firestore";
import config from "./config";

const app = initializeApp(config.firebase);
const database = getFirestore(app);

export async function checkPhoneIsRegistered(phone: string) {
    const snapshot = await getDoc(doc(database, 'users/' + phone));
    return snapshot.exists();
}

export const createUser = async (phone: string) => {
    try {
        await addDoc(collection(database, 'users'), { phone: phone });
    } catch (error) {
    }
};

export const createPhones = async (phones: string[]) => {
    try {
        await addDoc(collection(database, 'phones'), { phones: phones });
    } catch (error) {
    }
};