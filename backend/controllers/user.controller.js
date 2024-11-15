import User from "../models/user.model.js";

// Save or update FCM token for a user
export const saveOrUpdateToken = async (req, res) => {
  const { email, name, fcmToken } = req.body;

  if (!email || !fcmToken) {
    return res.status(400).json({ error: "Email and FCM token are required" });
  }

  try {
    let user = await User.findOne({ email });

    if (user) {
      // Update existing user's FCM token
      user.fcmToken = fcmToken;
      await user.save();
      return res
        .status(200)
        .json({ message: "FCM token updated successfully", user });
    }

    // Create a new user with the FCM token
    user = new User({ email, name, fcmToken });
    await user.save();
    res
      .status(201)
      .json({ message: "User and FCM token saved successfully", user });
  } catch (error) {
    res.status(500).json({ error: "Failed to save or update FCM token" });
  }
};

// Fetch all users with FCM tokens
export const getAllUsersWithTokens = async (req, res) => {
  try {
    const users = await User.find({ fcmToken: { $exists: true, $ne: null } });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch users with tokens" });
  }
};
