import React, { useState } from "react";
import useUserStore from "../store/userStore";

const UserForm = () => {
  const { saveUser } = useUserStore();
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    fcmToken: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await saveUser(userData);
    setUserData({ name: "", email: "", fcmToken: "" });
  };

  return (
    <form
      className="p-4 border border-gray-300 rounded shadow-lg"
      onSubmit={handleSubmit}
    >
      <h2 className="text-xl font-bold mb-4 text-black">Add User</h2>
      <div className="mb-4">
        <label className="block font-medium text-black">Name</label>
        <input
          type="text"
          className="w-full border p-2 rounded bg-gray-300 text-black"
          value={userData.name}
          onChange={(e) => setUserData({ ...userData, name: e.target.value })}
        />
      </div>
      <div className="mb-4">
        <label className="block font-medium  text-black">Email</label>
        <input
          type="email"
          className="w-full border p-2 rounded bg-gray-300 text-black"
          value={userData.email}
          onChange={(e) => setUserData({ ...userData, email: e.target.value })}
        />
      </div>
      <div className="mb-4">
        <label className="block font-medium text-black">FCM Token</label>
        <input
          type="text"
          className="w-full border p-2 rounded bg-gray-300 text-black"
          value={userData.fcmToken}
          onChange={(e) =>
            setUserData({ ...userData, fcmToken: e.target.value })
          }
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
      >
        Save User
      </button>
    </form>
  );
};

export default UserForm;
