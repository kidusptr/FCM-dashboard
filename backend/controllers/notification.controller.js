import { messaging } from "../configs/fcm_config.js";
import User from "../models/user.model.js";

// Send notification to a single user by FCM token
export const sendToOneUser = async (req, res) => {
  const { email, title, body, url, imageUrl } = req.body;

  if (!email || !title || !body) {
    return res
      .status(400)
      .json({ error: "Email, title, and body are required" });
  }

  try {
    const user = await User.findOne({ email });

    if (!user || !user.fcmToken) {
      return res
        .status(404)
        .json({ error: "User not found or no FCM token available" });
    }
    console.log(user);
    const message = {
      notification: {
        title: title,
        body: body,
        image: imageUrl,
      },
      data: {
        url: url,
      },
      token: user.fcmToken,
    };

    const response = await messaging.send(message);
    res
      .status(200)
      .json({ message: "Notification sent successfully", response });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to send notification", details: error });
  }
};

// Send notification to all users with FCM tokens
export const sendToAllUsers = async (req, res) => {
  const { title, body, url, imageUrl } = req.body;

  if (!title || !body) {
    return res.status(400).json({ error: "Title and body are required" });
  }

  try {
    const users = await User.find({ fcmToken: { $exists: true, $ne: null } });

    if (users.length === 0) {
      return res.status(404).json({ error: "No users with FCM tokens found" });
    }

    const tokens = users.map((user) => user.fcmToken);
    console.log(tokens);
    const message = {
      notification: {
        title: title,
        body: body,
        image: imageUrl,
      },
      data: {
        url: url,
      },
      tokens: tokens,
    };

    console.log(message);

    const response = await messaging.sendEachForMulticast(message);
    res
      .status(200)
      .json({ message: "Notifications sent successfully", response });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to send notifications", details: error });
  }
};
