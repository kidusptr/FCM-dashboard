import React, { useState, useEffect } from "react";
import useUserStore from "../store/userStore";
import NotificationPopup from "./NotificationPopup";

const UserTable = () => {
  const { users, loading, error, fetchUsers } = useUserStore();
  const [showPopup, setShowPopup] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const openPopup = (user) => {
    setCurrentUser(user);
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
    setCurrentUser(null);
  };

  return (
    <div className="overflow-x-auto flex flex-col justify-right">
      <button
        className="bg-green-500 text-white py-2 px-4 rounded mb-4 ml-auto hover:bg-green-600"
        onClick={() => openPopup("all")}
      >
        Send Notification to All
      </button>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <table className="table-auto w-full border border-gray-200 rounded-lg shadow-md">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">FCM Token</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-4 py-2 border-t text-black">{user.name}</td>
                <td className="px-4 py-2 border-t text-black ">{user.email}</td>
                <td className="px-4 py-2 border-t text-black text-wrap-break max-w-xs truncate">
                  {user.fcmToken}
                </td>
                <td className="px-4 py-2 border-t text-black">
                  <button
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                    onClick={() => openPopup(user)}
                  >
                    Send Notification
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Notification Popup */}
      {showPopup && (
        <NotificationPopup user={currentUser} closePopup={closePopup} />
      )}
    </div>
  );
};

export default UserTable;
