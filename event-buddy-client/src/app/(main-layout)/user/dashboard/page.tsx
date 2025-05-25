"use client";

import { useUser } from "@/context/user-context";
import React, { useEffect, useState } from "react";
import RegisteredCard from "./registered-card";
import Link from "next/link";
import { getToken, singOut } from "@/utilities/jwt-operation";
import { useRouter } from "next/navigation";
import axios from "axios";

const UserDashboard = () => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const { user, setUser, setLoading } = useUser();
  const router = useRouter();
  type Booking = {
    booking_id: number;
    booking_status: string;
    event: {
      title: string;
      date: string;
      start_time: string;
      end_time: string;
      location: string;
      [key: string]: any;
    };
    [key: string]: any;
  };

  useEffect(() => {
    if (isHydrated && !user) {
      router.push("/signin");
    }
  }, [isHydrated, user]);

  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated || !user?.id) return;

    const getData = async () => {
      const token = await getToken();

      if (!token || !user || user.role !== "User" || user === undefined) {
        setLoading(false);
        setUser(null);
        await singOut();
        router.push("/signin");
        return;
      }

      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_LOCALHOST}/booking/user/${user.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setBookings(response.data);
        //   console.log(response.data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      } finally {
        setLoading(false);
        setCheckingAuth(false);
      }
    };

    getData();
  }, [isHydrated, user?.id]);

  if (!isHydrated || checkingAuth) {
    return null; // or <LoadingSpinner /> if you want
  }

  return (
    <div className="bg-primary  min-h-screen">
      <div className="container mx-auto p-4 ">
        <div>
          <h1 className="text-textPrimary text-2xl md:3xl ">Dashboard</h1>
          <p className="text-textSecondary pb-12">
            Welcome back, {user?.full_name}!! Here you can manage your event
            registrations.
          </p>
        </div>
        <div>
          <p className="text-textPrimary text-lg pb-2">My Registered Events</p>
        </div>

        <div className="space-y-6">
          {bookings && bookings.length > 0 ? (
            bookings
              .sort((a, b) => {
                if (
                  a.booking_status === "Active" &&
                  b.booking_status !== "Active"
                )
                  return -1;
                if (
                  a.booking_status !== "Active" &&
                  b.booking_status === "Active"
                )
                  return 1;
                const dateA = new Date(a.event.date);
                const dateB = new Date(b.event.date);
                return dateA.getTime() - dateB.getTime();
              })
              .map((booking) => (
                <RegisteredCard key={booking.booking_id} booking={booking} />
              ))
          ) : (
            <p className="text-textSecondary">
              You have not registered for any events yet.
            </p>
          )}
        </div>

        <div className="flex items-center justify-center w-full">
          <Link
            href={"/"}
            className="mt-6 w-[12rem] px-4 py-2 bg-gradient-to-t from-btnPrimaryStart to-btnPrimaryEnd rounded-lg text-white hover:cursor-pointer hover:bg-gradient-to-t hover:from-btnPrimaryEnd hover:to-btnPrimaryStart "
          >
            Browse more events
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
