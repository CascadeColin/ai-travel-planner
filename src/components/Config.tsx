import React, { useState } from "react";

export default function Config() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleSaveChanges = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Handle the logic to save changes here
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Current Password:", currentPassword);
    console.log("New Password:", newPassword);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-3xl font-bold mb-8 text-gray-800 text-center">User Settings</h2>
        <form onSubmit={handleSaveChanges}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => { setName(e.target.value); }}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Update your name"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); }}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Update your email"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-1">
              Current Password
            </label>
            <input
              type="password"
              id="currentPassword"
              value={currentPassword}
              onChange={(e) => { setCurrentPassword(e.target.value); }}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Enter current password"
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
              New Password
            </label>
            <input
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={(e) => { setNewPassword(e.target.value); }}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Enter new password"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200"
          >
            Save Changes
          </button>
        </form>

        <div className="mt-8">
          <h3 className="text-lg font-semibold text-gray-800">Delete Account</h3>
          <p className="text-sm text-gray-600 mb-4">
            Warning: Once you delete your account, there is no going back. Please be certain.
          </p>
          <button className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition duration-200">
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
};