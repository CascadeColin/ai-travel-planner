import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Config() {
  const [traveler, setTraveler] = useState("");
  const [cost, setCost] = useState("");
  const [transportation, setTransportation] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async function () {
      try {
        const res = await fetch("http://localhost:8080/config/1");
        if (res.ok) {
          interface ConfigData {
            travelerType: string;
            costPref: string;
            transportationPref: string;
          }

          const data: ConfigData = await res.json() as ConfigData;
          setTraveler(data.travelerType);
          setCost(data.costPref);
          setTransportation(data.transportationPref);
        }
      } catch (err) {
        console.log(err);
      }
    };
    void fetchUser();
  }, []);

  const handleSaveChanges = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Handle the logic to save changes here
    console.log(traveler, cost, transportation);
    const response = await fetch("http://localhost:8080/config/1", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        configId: 1,
        travelerType: traveler,
        costPref: cost,
        transportationPref: transportation
      }),
    });

    if (response.status === 204) {
      navigate('/home/1')
    } else {
      console.log(response.statusText)
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-3xl font-bold mb-8 text-gray-800 text-center">
          User Settings
        </h2>
        <form onSubmit={handleSaveChanges}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Type of travel
            </label>
            <input
              type="text"
              id="traveler"
              value={traveler}
              onChange={(e) => {
                setTraveler(e.target.value);
              }}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Update your traveler type"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Cost preference
            </label>
            <input
              type="text"
              id="cost"
              value={cost}
              onChange={(e) => {
                setCost(e.target.value);
              }}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Update cost preference"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="currentPassword"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Transportation preference
            </label>
            <input
              type="text"
              id="transportation"
              value={transportation}
              onChange={(e) => {
                setTransportation(e.target.value);
              }}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Enter transportation preference"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}
