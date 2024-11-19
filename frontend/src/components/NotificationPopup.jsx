import React, { useState } from "react";
import useUserStore from "../store/userStore";

const NotificationPopup = ({ user, closePopup }) => {
  const { sendToOneUser, sendToAllUsers } = useUserStore();
  const [notificationData, setNotificationData] = useState({
    title: "",
    body: "",
    url: "",
    imageUrl: "",
  });

  const handleSubmit = () => {
    if (user === "all") {
      sendToAllUsers(notificationData);
    } else {
      sendToOneUser(user.email, notificationData);
    }
    closePopup();
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4 text-black text-center">
          Send Notification{" "}
          {user === "all" ? "to All Users" : `to ${user.name}`}
        </h2>
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label className="block font-medium text-black">Title</label>
            <input
              type="text"
              className="w-full border p-2 rounded bg-gray-300 text-black"
              placeholder="Enter title"
              value={notificationData.title}
              onChange={(e) =>
                setNotificationData({
                  ...notificationData,
                  title: e.target.value,
                })
              }
            />
          </div>
          <div>
            <label className="block font-medium text-black">Body</label>
            <textarea
              className="w-full border p-2 rounded bg-gray-300 text-black"
              placeholder="Enter message body"
              value={notificationData.body}
              onChange={(e) =>
                setNotificationData({
                  ...notificationData,
                  body: e.target.value,
                })
              }
            ></textarea>
          </div>
          <div>
            <label className="block font-medium text-black">URL</label>
            <input
              type="url"
              className="w-full border p-2 rounded  bg-gray-300 text-black"
              placeholder="Enter URL"
              value={notificationData.url}
              onChange={(e) =>
                setNotificationData({
                  ...notificationData,
                  url: e.target.value,
                })
              }
            />
          </div>
          <div>
            <label className="block font-medium text-black">Image URL</label>
            <input
              type="url"
              className="w-full border p-2 rounded bg-gray-300 text-black"
              placeholder="Enter Image URL"
              value={notificationData.imageUrl}
              onChange={(e) =>
                setNotificationData({
                  ...notificationData,
                  imageUrl: e.target.value,
                })
              }
            />
          </div>
          <div className="flex justify-between mt-6">
            <button
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              onClick={closePopup}
            >
              Cancel
            </button>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              onClick={handleSubmit}
            >
              Send Notification
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NotificationPopup;
