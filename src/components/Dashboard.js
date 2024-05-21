import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllResources } from "./fhirApi";
import moment from "moment";

// const people = [
//   {
//     name: "Aditi Gupta",
//     age: 34,
//     gender: "Female",
//     createdMinutesAgo: 30,
//     imageUrl: "https://randomuser.me/api/portraits/women/84.jpg",
//   },
//   {
//     name: "Aarav Patel",
//     age: 28,
//     gender: "Male",
//     createdMinutesAgo: 15,
//     imageUrl: "https://randomuser.me/api/portraits/men/86.jpg",
//   },
//   {
//     name: "Rahul Sharma",
//     age: 42,
//     gender: "Male",
//     createdMinutesAgo: 60,
//     imageUrl: "https://randomuser.me/api/portraits/men/7.jpg",
//   },
//   {
//     name: "Ananya Singh",
//     age: 25,
//     gender: "Female",
//     createdMinutesAgo: 20,
//     imageUrl: "https://randomuser.me/api/portraits/women/8.jpg",
//   },
//   {
//     name: "Neha Sharma",
//     age: 29,
//     gender: "Female",
//     createdMinutesAgo: 10,
//     imageUrl: "https://randomuser.me/api/portraits/women/26.jpg",
//   },
//   {
//     name: "Kabir Singh",
//     age: 38,
//     gender: "Male",
//     createdMinutesAgo: 75,
//     imageUrl: "https://randomuser.me/api/portraits/men/20.jpg",
//   },
// ];

const calcTimeAgo = (lastUpdated, person) => {
  const timeDiff = moment().diff(
    moment(person.resource.meta.lastUpdated),
    "minutes"
  );
  const timeAgo =
    timeDiff < 60
      ? timeDiff + " minutes"
      : Math.floor(timeDiff / 60) +
        " " +
        (Math.floor(timeDiff / 60) === 1 ? "hour" : "hours");
  return timeAgo;
};

export default function Dashboard() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllResources("Patient")
      .then((response) => {
        setData(response.data);
        setLoading(false);
        console.log("Fetched patients:", response.data);
      })
      .catch((error) => {
        console.error("Error fetching patients:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {data.total > 0 ? (
        <ul className="divide-y divide-gray-100 mx-28 my-4">
          {data.entry.map((person, index) => (
            <li key={index} className="flex justify-between gap-x-6 py-4">
              <Link
                to="/form"
                className="bg-sky-50 rounded-lg shadow-md flex justify-between w-full p-4"
              >
                <div className="flex min-w-0 gap-x-4">
                  <div className="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                    <svg
                      className="absolute w-12 h-12 text-gray-400 -left-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </div>

                  <div className="min-w-0 flex-auto">
                    <p className="text-base font-semibold leading-6 text-gray-900">
                      {person.resource.name[0].text}
                    </p>
                    <p className="mt-1 text-sm leading-5 text-gray-500">
                      {moment().diff(person.resource.birthDate, "years")} years,{" "}
                      {person.resource.gender}
                    </p>
                  </div>
                </div>

                <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                  <p className="mt-1 text-sm leading-5 text-gray-500">
                    {calcTimeAgo(person.resource.meta.lastUpdated, person)}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <div className="text-center text-gray-500">
          <p className="text-lg">No patients yet</p>
        </div>
      )}
    </div>
  );
}
