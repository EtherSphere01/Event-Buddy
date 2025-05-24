"use client";
import Link from "next/link";
import React, { use, useEffect, useState } from "react";
import {
  CircleArrowLeft,
  Dot,
  Calendar,
  Clock,
  MapPin,
  Ticket,
  Armchair,
} from "lucide-react";

import { format, isBefore, parse, parseISO } from "date-fns";
import { toast } from "react-toastify";
import { useUser } from "@/context/user-context";
import { useRouter } from "next/navigation";
import axios from "axios";

const EventDetails = () => {
  const techEvent = {
    event_id: 15,
    title: "Mastering Next.js with TypeScript",
    date: "2025-07-12",
    start_time: "10:00:00",
    end_time: "16:00:00",
    description:
      "A hands-on workshop designed for developers looking to deepen their knowledge of Nextjs and TypeScript. Learn advanced routing, server-side rendering, API integration, authentication. Deploy a production-ready project by the end of the day.",
    location: "WeWork Tech Hub, 5th Avenue, New York, NY",
    total_seats: 120,
    available_seats: 43,
    total_booked: 77,
    image_path: "/uploads/event_nextjs_workshop_2025.png",
    tags: [
      "Next.js",
      "TypeScript",
      "Web Development",
      "Full Stack",
      "React",
      "Workshop",
    ],
  };

  const [selectSeat, setSelectSeat] = useState(0);
  const [spotLeft, setSpotLeft] = useState(techEvent.available_seats);
  const [totalBooked, setTotalBooked] = useState(techEvent.total_booked);
  const [clicked, setClicked] = useState(false);
  const { user } = useUser();
  const router = useRouter();

  const dateValue = techEvent.date;
  const dateObj = parseISO(dateValue);
  const monthName = format(dateObj, "LLLL");
  const dayName = format(dateObj, "EEEE");
  const year = format(dateObj, "yyyy");
  const date = format(dateObj, "d");

  const today = new Date();
  const isExpired = isBefore(dateObj, today);

  const startTime = format(
    parse(techEvent.start_time, "HH:mm:ss", new Date()),
    "hh:mm a"
  );
  const endTime = format(
    parse(techEvent.end_time, "HH:mm:ss", new Date()),
    "hh:mm a"
  );

  const descList = techEvent.description
    .split(".")
    .map((s) => s.trim())
    .filter((s) => s.length > 0);

  const handleBooking = async () => {
    if (user === null) {
      router.push("/signin");
      return;
    }
    if (selectSeat === 0) {
      toast.error("Please select seats to book");
      return;
    }
    if (selectSeat > spotLeft) {
      toast.error("Not enough seats available");
      return;
    }

    const bookingData = {
      user_id: user.id,
      event_id: techEvent.event_id,
      seat_booked: selectSeat,
    };

    const token = localStorage.getItem("accessToken");

    if (!token) {
      toast.error("Authorization token not found.");
      return;
    }
    // console.log(token);

    try {
      await toast.promise(
        axios.post(`http://localhost:3000/booking/create`, bookingData, {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo4LCJpYXQiOjE3NDgxMTU5MjQsImV4cCI6MTc0ODIwMjMyNCwiYXVkIjoibG9jYWxob3N0OjMwMDAiLCJpc3MiOiJsb2NhbGhvc3Q6MzAwMCJ9.2fc7rj_a68bI0qy8Q0hrJK7ESMtt0OB2K4r9aDSf_RE`,
          },
        }),
        {
          pending: "Booking in progress...",
          success: "Booking successful!",
          error: "Booking failed. Please try again.",
        }
      );
      setSpotLeft((prev) => prev - selectSeat);
      setTotalBooked((prev) => prev + selectSeat);
      setSelectSeat(0);
    } catch (error: any) {}
  };

  const [isHydrated, setIsHydrated] = useState(false);
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (!isHydrated) {
    return null;
  }

  return (
    <div className="bg-primary" suppressHydrationWarning>
      <div className="container mx-auto p-5">
        <Link
          href="/"
          className="flex items-center justify-start gap-2 text-lg text-textPrimary mb-5"
        >
          <CircleArrowLeft />
          Back to event
        </Link>
        <img src="/pic.png" alt="" className="w-full rounded-lg mb-5" />

        <div className="mb-5">
          {techEvent.tags.map((tag, index) => (
            <span
              key={index}
              className="inline-block bg-[#DADEFF] text-[#1D4ED8] px-2 py-1 rounded-md text-sm mr-2 mb-2"
            >
              <div className="flex items-center justify-start">
                <Dot />
                {tag}
              </div>
            </span>
          ))}
        </div>

        <div className="mb-9 pt-4">
          <h1 className="text-textPrimary text-4xl ">{techEvent.title}</h1>
        </div>

        <div className="bg-white p-6 rounded-lg border-2 border-[#bdbbfb3d] flex flex-col lg:flex-row items-start lg:items-center lg:justify-between gap-7 mb-5">
          <div className="flex items-center justify-start gap-5">
            <div className="text-[#1D4ED8] ">
              <Calendar size={40} />
            </div>
            <div>
              <h4 className="text-[#6A6A6A]">Date</h4>
              <p className="text-textSecondary">
                {dayName}, {date} {monthName} , {year}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-start gap-5">
            <div className="text-[#1D4ED8] ">
              <Clock size={40} />
            </div>
            <div>
              <h4 className="text-[#6A6A6A]">Time</h4>
              <p className="text-textSecondary">
                {startTime} - {endTime}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-start gap-5">
            <div className="text-[#1D4ED8] ">
              <MapPin size={40} />
            </div>
            <div>
              <h4 className="text-[#6A6A6A]">Location</h4>
              <p className="text-textSecondary">{techEvent.location}</p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center mb-5 ">
          <div className="bg-white p-6 rounded-lg border-2 border-[#bdbbfb3d] lg:w-[58rem]  ">
            <h2 className="text-lg md:text-xl text-textPrimary">
              Select Number of Seats
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6 ">
              <div
                onClick={() => {
                  setSelectSeat(1);
                }}
                className={` w-[13rem] h-[9rem] border-2 rounded-md hover:bg-[#8570ad21] border-[#E6E6E6] ${
                  selectSeat === 1 ? "border-[#8570AD] bg-[#8570ad21]" : ""
                }`}
              >
                <div className="flex flex-col items-center justify-center gap-2 hover:cursor-pointer h-full">
                  <Ticket color={"#242565"} />
                  <h4 className="text-textPrimary">1</h4>
                  <p className="text-textSecondary">Seat</p>
                </div>
              </div>

              <div
                onClick={() => {
                  setSelectSeat(2);
                }}
                className={` w-[13rem] h-[9rem] border-2 rounded-md hover:bg-[#8570ad21] border-[#E6E6E6] ${
                  selectSeat === 2 ? "border-[#8570AD] bg-[#8570ad21]" : ""
                }`}
              >
                <div className="flex flex-col items-center justify-center gap-2 hover:cursor-pointer h-full">
                  <Ticket color={"#242565"} />
                  <h4 className="text-textPrimary">2</h4>
                  <p className="text-textSecondary">Seat</p>
                </div>
              </div>

              <div
                onClick={() => {
                  setSelectSeat(3);
                }}
                className={` w-[13rem] h-[9rem] border-2 rounded-md hover:bg-[#8570ad21] border-[#E6E6E6] ${
                  selectSeat === 3 ? "border-[#8570AD] bg-[#8570ad21]" : ""
                }`}
              >
                <div className="flex flex-col items-center justify-center gap-2 hover:cursor-pointer h-full">
                  <Ticket color={"#242565"} />
                  <h4 className="text-textPrimary">3</h4>
                  <p className="text-textSecondary">Seat</p>
                </div>
              </div>

              <div
                onClick={() => {
                  setSelectSeat(4);
                }}
                className={` w-[13rem] h-[9rem] border-2 rounded-md hover:bg-[#8570ad21] border-[#E6E6E6] ${
                  selectSeat === 4 ? "border-[#8570AD] bg-[#8570ad21]" : ""
                }`}
              >
                <div className="flex flex-col items-center justify-center gap-2 hover:cursor-pointer h-full">
                  <Ticket color={"#242565"} />
                  <h4 className="text-textPrimary">4</h4>
                  <p className="text-textSecondary">Seat</p>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center mt-6">
              <button
                onClick={() => !isExpired && handleBooking()}
                disabled={isExpired}
                className={`text-white px-4 py-2 rounded-md transition ${
                  isExpired
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-t from-btnPrimaryStart to-btnPrimaryEnd hover:bg-gradient-to-b hover:from-btnPrimaryStart hover:to-btnPrimaryEnd"
                }`}
              >
                {isExpired
                  ? "Not Available"
                  : `Book ${selectSeat === 0 ? "" : selectSeat} Seat`}
              </button>
            </div>
          </div>
        </div>

        <div className="pt-5 text-textSecondary">
          <h1 className="text-xl text-textPrimary mb-5">About this event</h1>
          <p className="mb-5 text-justify ">
            Join us for Tech Future Expo 2025, an immersive one-day technology
            event bringing together developers, startups, and industry leaders
            to explore the future of software, AI, blockchain, and cloud
            computing.{" "}
          </p>
          <div className="mb-5">
            <h5 className="">This event will feature :</h5>
            <ul className="list-disc list-inside space-y-2 text-textSecondary text-justify">
              {descList.map((item, index) => (
                <li key={index}>{item}.</li>
              ))}
            </ul>
          </div>

          <p className="mb-5 text-justify">
            Reserve your seat today and be part of tomorrow's innovation.
            Limited seats available. Advance booking required.
          </p>
        </div>

        <div className="mt-12 border-t-2 border-[#bdbbfb3d] pt-5">
          <div className="flex items-center gap-2">
            <Armchair color={"#8570AD"} size={30} />
            <p className="text-textSecondary text-xl">
              {spotLeft} Spot Left{" "}
              <span className="text-gray-400">
                ( {totalBooked} registered )
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
