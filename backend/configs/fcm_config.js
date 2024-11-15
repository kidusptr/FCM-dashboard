// firebase.js
import admin from "firebase-admin";
import dotenv from "dotenv";

dotenv.config();

let messaging; // Messaging instance

export const connectFCM = async () => {
  try {
    // Ensure ACCOUNT_KEY is defined
    if (!process.env.ACCOUNT_KEY) {
      throw new Error(
        "ACCOUNT_KEY is not defined in the environment variables"
      );
    }

    // Parse the service account key
    const serviceAccount = JSON.parse(process.env.ACCOUNT_KEY);

    // Initialize Firebase Admin SDK
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });

    console.log("FCM initialized successfully");

    // Set messaging instance
    messaging = admin.messaging();
  } catch (error) {
    console.error("Error initializing Firebase:", error);
    process.exit(1); // Exit process if initialization fails
  }
};

// Export the messaging instance
export { messaging };
