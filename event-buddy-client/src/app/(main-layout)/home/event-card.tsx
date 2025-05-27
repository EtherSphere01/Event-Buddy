"use client";

import Link from "next/link";
import React from "react";
import Image from "next/image";
import { Armchair, Calendar, CalendarDays, Clock, MapPin } from "lucide-react";
import { format, isBefore, parse, parseISO } from "date-fns";

interface EventProps {
  event_id: number;
  title: string;
  date: string;
  location: string;
  total_seats: number;
  available_seats: number;
  start_time: string;
  end_time: string;
  description?: string;
  tags?: string;
  image_path: string;
}

const EventCard = ({ event }: { event: EventProps }) => {
  const dateObj = parseISO(event.date);
  const monthName = format(dateObj, "LLL");
  const dayName = format(dateObj, "EEEE");
  const year = format(dateObj, "yyyy");
  const date = format(dateObj, "d");
  const today = new Date();
  const isExpired = isBefore(dateObj, today);
  const startTime = format(
    parse(event.start_time, "HH:mm:ss", new Date()),
    "hh:mm a"
  );
  const endTime = format(
    parse(event.end_time, "HH:mm:ss", new Date()),
    "hh:mm a"
  );

  return (
    <div className="flex md:items-center justify-center pt-5">
      <div className="[filter:drop-shadow(0_6px_8px_rgba(0,0,0,0.2))] w-[29rem] ">
        <div className="md:min-w-96 min-w-80 md:min-h-96 bg-white [clip-path:polygon(20px_0%,100%_0%,100%_calc(100%-20px),calc(100%-20px)_100%,0%_100%,0%_20px)] ">
          <div className="">
            {/* img */}
            <div>
              <img src="Pic.png" alt="" />
            </div>
            <div className="p-2">
              <div className="flex items-center gap-4">
                <div className="text-xl">
                  <p className="text-[#3D37F1] font-bold">
                    {monthName.toUpperCase()}
                  </p>
                  <p className="text-3xl font-bold">{date}</p>
                </div>
                <h3 className="text-textPrimary text-lg font-semibold">
                  {event.title}
                </h3>
              </div>
              <div>
                <p className="font-light text-gray-800">
                  We'll get you direct seated and inside for you to enjoy the
                  conference
                </p>
                <div className="flex items-center justify-center text-sm gap-2 ">
                  <div className="flex items-center justify-start gap-2">
                    <div className="text-[#1D4ED8]">
                      <Calendar size={13} />
                    </div>
                    <div>
                      <p className="text-textSecondary">{dayName}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-start gap-2">
                    <div className="text-[#1D4ED8] ">
                      <Clock size={13} />
                    </div>
                    <div>
                      <p className="text-textSecondary wrap">
                        {startTime} - {endTime}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-start gap-2">
                    <div className="text-[#1D4ED8] ">
                      <MapPin size={13} />
                    </div>
                    <div>
                      <p className="text-textSecondary wrap">
                        {event.location}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
