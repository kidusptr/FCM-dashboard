import { create } from "zustand";
import axios from "axios";

const useUserStore = create((set) => ({
  users: [],
  loading: false,
  error: null,

  // Fetch users from the backend
  fetchUsers: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get("/api/users/get-users-with-tokens");
      set({ users: response.data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  // Save or update a user
  saveUser: async (userData) => {
    try {
      await axios.post("/api/users/save-token", userData);
      set((state) => ({ users: [...state.users, userData] }));
    } catch (error) {
      console.error("Error saving user:", error.message);
    }
  },

  // Send notification to one user
  sendToOneUser: async (email, notificationData) => {
    try {
      await axios.post("/api/notifications/send-to-one", {
        email,
        ...notificationData,
      });
      alert("Notification sent successfully");
    } catch (error) {
      console.error("Error sending notification:", error.message);
    }
  },

  // Send notifications to all users
  sendToAllUsers: async (notificationData) => {
    try {
      await axios.post("/api/notifications/send-to-all", notificationData);
      alert("Notifications sent successfully");
    } catch (error) {
      console.error("Error sending notifications:", error.message);
    }
  },
}));

export default useUserStore;
