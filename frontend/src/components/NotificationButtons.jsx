import React from "react";
import useUserStore from "../store/userStore";

const NotificationButtons = () => {
  const { sendToOneUser, sendToAllUsers, users } = useUserStore();

  const handleSendToAll = () => {
    sendToAllUsers({
      title: "Hello",
      body: "This is a notification for all users.",
    });
  };

  const handleSendToOne = (email) => {
    sendToOneUser(email, {
      title: "Hello",
      body: "This is a personal notification.",
    });
  };

  return (
    <div className="flex flex-wrap gap-4 mt-4">
      <button
        className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
        onClick={handleSendToAll}
      >
        Send to All
      </button>
      {users.map((user) => (
        <button
          key={user.email}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          onClick={() => handleSendToOne(user.email)}
        >
          Send to {user.name}
        </button>
      ))}
    </div>
  );
};

export default NotificationButtons;
