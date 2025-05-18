import { initializeApp, getApps, getApp, App, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

// Use a more robust path resolution for the service key.  This assumes
// the service_key.json file is in the same directory as the current
// script.  This is crucial for avoiding deployment issues.
const serviceKey = require("./service_key.json"); // Changed path

let app: App;

// Initialize Firebase Admin SDK
if (getApps().length === 0) {
    try {
        app = initializeApp({
            credential: cert(serviceKey),
        });
        console.log("Firebase Admin SDK initialized successfully.");
    } catch (error: any) {
        console.error("Error initializing Firebase Admin SDK:", error.message);
        throw new Error("Failed to initialize Firebase Admin SDK");
        process.exit(1); // Exit the process with an error code
    }
} else {
    app = getApp();
    console.log("Firebase Admin SDK already initialized. Reusing existing app instance.");
}



const adminDb = getFirestore(app);

export { adminDb, app as adminApp }; // Added initializeFirebaseApp to exports
