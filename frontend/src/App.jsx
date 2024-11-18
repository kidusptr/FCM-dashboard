import React, { useState } from "react";
import UserTable from "./components/UserTable";
import UserForm from "./components/UserForm";

const App = () => {
  const [activeTab, setActiveTab] = useState("addUser");

  return (
    <div className="bg-gray-100 min-h-screen py-10 px-6">
      <div className="container mx-auto max-w-4xl bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-4xl font-bold text-center text-gray-700 mb-8">
          FCM Notification Dashboard
        </h1>

        {/* Tab Navigation */}
        <div className="flex justify-center space-x-4 mb-6 border-b border-gray-200 pb-2">
          <button
            className={`px-6 py-3 rounded-t-md font-medium text-lg ${
              activeTab === "addUser"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
            onClick={() => setActiveTab("addUser")}
          >
            Add New User
          </button>
          <button
            className={`px-6 py-3 rounded-t-md font-medium text-lg ${
              activeTab === "manageUsers"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
            onClick={() => setActiveTab("manageUsers")}
          >
            Manage Users
          </button>
        </div>

        {/* Tab Content */}
        <div className="bg-white p-6 rounded-b-md shadow-md">
          {activeTab === "addUser" ? <UserForm /> : <UserTable />}
        </div>
      </div>
    </div>
  );
};

export default App;
