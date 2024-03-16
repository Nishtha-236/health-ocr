import React from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

const people = [
  {
    name: "Aditi Gupta",
    age: 34,
    gender: "Female",
    createdMinutesAgo: 30,
    imageUrl: "https://randomuser.me/api/portraits/women/84.jpg",
  },
  {
    name: "Aarav Patel",
    age: 28,
    gender: "Male",
    createdMinutesAgo: 15,
    imageUrl: "https://randomuser.me/api/portraits/men/86.jpg",
  },
  {
    name: "Rahul Sharma",
    age: 42,
    gender: "Male",
    createdMinutesAgo: 60,
    imageUrl: "https://randomuser.me/api/portraits/men/7.jpg",
  },
  {
    name: "Ananya Singh",
    age: 25,
    gender: "Female",
    createdMinutesAgo: 20,
    imageUrl: "https://randomuser.me/api/portraits/women/8.jpg",
  },
  {
    name: "Neha Sharma",
    age: 29,
    gender: "Female",
    createdMinutesAgo: 10,
    imageUrl: "https://randomuser.me/api/portraits/women/26.jpg",
  },
  {
    name: "Kabir Singh",
    age: 38,
    gender: "Male",
    createdMinutesAgo: 75,
    imageUrl: "https://randomuser.me/api/portraits/men/20.jpg",
  },
];

export default function Dashboard({ handleSignout }) {
  return (
    <div>
      <ul role="list" className="divide-y divide-gray-100 mx-28 my-4">
        {people.map((person, index) => (
          <li key={index} className="flex justify-between gap-x-6 py-4">
            <Link to="/form" className="bg-sky-50 rounded-lg shadow-md flex justify-between w-full p-4">
              <div className="flex min-w-0 gap-x-4">
                <img
                  className="h-12 w-12 flex-none rounded-full bg-gray-50"
                  src={person.imageUrl}
                  alt=""
                />
                <div className="min-w-0 flex-auto">
                  <p className="text-base font-semibold leading-6 text-gray-900">
                    {person.name}
                  </p>
                  <p className="mt-1 text-sm leading-5 text-gray-500">
                    {person.age} years, {person.gender}
                  </p>
                </div>
              </div>
              <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                <p className="mt-1 text-sm leading-5 text-gray-500">
                  Created{" "}
                  {person.createdMinutesAgo < 60
                    ? person.createdMinutesAgo + " minutes"
                    : Math.floor(person.createdMinutesAgo / 60) +
                      " " +
                      (Math.floor(person.createdMinutesAgo / 60) === 1
                        ? "hour"
                        : "hours")}{" "}
                  ago
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
