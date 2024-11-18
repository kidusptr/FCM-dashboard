import React from "react";
import UserTable from "./components/UserTable";
import UserForm from "./components/UserForm";
import NotificationButtons from "./components/NotificationButtons";

const App = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">FCM Dashboard</h1>
      <UserForm />
      <NotificationButtons />
      <UserTable />
    </div>
  );
};

export default App;
