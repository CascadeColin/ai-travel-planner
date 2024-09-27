/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React, { useState } from "react";
import { Vacation } from "../interfaces";
import OpenAI from "openai";


export default function AddTrip() {
  interface ConfigData {
    travelerType: string;
    costPref: string;
    transportationPref: string;
  }

  const API_KEY: string = import.meta.env.VITE_OPENAI_KEY as string;
  const ORG_KEY: string = import.meta.env.VITE_ORGANIZATION_KEY as string;
  const openai = new OpenAI({
    apiKey: API_KEY,
    organization: ORG_KEY,
    dangerouslyAllowBrowser: true,
  });

  const [vacation, setVacation] = useState<Vacation>({
    destination: "",
    tripDetails: "",
    startDate: "",
    endDate: "",
    plannerId: 1,
  });

  const [config, setConfig] = useState<ConfigData>({
    travelerType: "",
    costPref: "",
    transportationPref: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setVacation({
      ...vacation,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:8080/config/1");
      if (res.ok) {
        const data: ConfigData = (await res.json()) as ConfigData;
        setConfig({
          travelerType: data.travelerType,
          costPref: data.costPref,
          transportationPref: data.transportationPref,
        });
      }
    } catch (err) {
      console.log(err);
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        {
          role: "user",
          content: `plan a ${config.costPref} ${config.travelerType} trip to ${vacation.destination} by ${config.transportationPref} from ${vacation.startDate} to ${vacation.endDate}`,
        },
      ],
    });
    console.log(completion.choices[0].message);
    const aiResponse = await Promise.resolve(completion);
    console.log(aiResponse);
    const content = aiResponse.choices[0].message.content;

    const response = await fetch("http://localhost:8080/trip", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        startDate: vacation.startDate,
        endDate: vacation.endDate,
        destination: vacation.destination,
        tripDetails: content,
        plannerId: vacation.plannerId,
      }),
    });
    const data = await response.json();
    console.log(data);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-blue-100 to-green-100">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-white rounded-lg shadow-lg p-8"
      >
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
          Plan Your Trip
        </h2>

        {/* Destination Field */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="destination"
          >
            Destination
          </label>
          <input
            type="text"
            id="destination"
            name="destination"
            value={vacation.destination}
            onChange={handleChange}
            placeholder="Enter your destination"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        {/* Description Field */}
        {/* <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="description"
          >
            Trip Details
          </label>
          <input
            id="tripDetails"
            name="tripDetails"
            value={vacation.tripDetails}
            onChange={handleChange}
            placeholder="Describe your trip"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div> */}

        {/* Start Date Field */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="startDate"
          >
            Start Date
          </label>
          <input
            type="date"
            id="startDate"
            name="startDate"
            value={vacation.startDate}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        {/* End Date Field */}
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="endDate"
          >
            End Date
          </label>
          <input
            type="date"
            id="endDate"
            name="endDate"
            value={vacation.endDate}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        {/* Submit Button */}
        <div className="flex items-center justify-center">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-200"
          >
            Plan Trip
          </button>
        </div>
      </form>
    </div>
  );
}
