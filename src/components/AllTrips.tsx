/* eslint-disable react/jsx-key */
import { useEffect, useState } from "react";
import MarkdownView from "react-showdown";

interface Trip {
  tripId: number;
  destination: string;
  tripDetails: string;
  startDate: string;
  endDate: string;
}

export default function AllTrips() {
  // views all trips for user in card format
  // TODO: use the login's username to request all trips by username, then load them here
  const [tripData, setTripData] = useState<Trip[]>([]);

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const res = await fetch("http://localhost:8080/trip/planner/1");
        if (res.ok) {
          const data = await res.json();
          setTripData(data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    void fetchTrips();
  }, []);

  const trips: Trip[] = tripData;

  return (
    <>
      {tripData ? (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
          {tripData.map((trip) => (
            <div
              key={trip.tripId}
              className="max-w-sm rounded overflow-hidden shadow-lg bg-white m-4"
            >
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2 text-gray-800">
                  {trip.destination}
                </div>
                {/* <p className="text-gray-700 text-base"> */}
                    <MarkdownView markdown={trip.tripDetails} options={{tables: true}} />
                    {/* {trip.tripDetails} */}
                {/* </p> */}
                <div className="mt-4">
                  <span className="block text-sm text-gray-600">
                    <strong>From:</strong>
                    {trip.startDate}
                  </span>
                  <span className="block text-sm text-gray-600">
                    <strong>To:</strong>
                    {trip.endDate}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
}
