import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import config from "../config";

const app = initializeApp(config.firebase);
const database = getFirestore(app);

export { database };