"use client";

import { Calendar, Calendar1, Clock, CloudUpload, Timer } from "lucide-react";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

type Event = {
  onClose: () => void;
  onSubmit: (eventData: any) => void;
  mode: "create" | "edit";
  initialData?: any;
};

const EventForm = ({ onClose, onSubmit, mode, initialData }: Event) => {
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    start_time: "",
    end_time: "",
    description: "",
    location: "",
    total_seats: 0,
    tags: "",
    image_path: null,
  });

  useEffect(() => {
    if (mode === "edit" && initialData) {
      setFormData({
        title: initialData.title || "",
        date: initialData.date || "",
        start_time: initialData.start_time?.slice(0, 5) || "", // strip seconds if any
        end_time: initialData.end_time?.slice(0, 5) || "",
        description: initialData.description || "",
        location: initialData.location || "",
        total_seats: initialData.total_seats || 0,
        tags: (initialData.tags || []).join(", "),
        image_path: initialData.image || null,
      });
    }
  }, [initialData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const finalPayload = {
      title: formData.title,
      date: formData.date,
      start_time: formData.start_time + ":00", // ensure HH:mm:ss
      end_time: formData.end_time + ":00",
      description: formData.description,
      location: formData.location,
      total_seats: Number(formData.total_seats),
      available_seats:
        mode === "edit" && initialData
          ? initialData.available_seats
          : Number(formData.total_seats), // default all seats available
      total_booked:
        mode === "edit" && initialData ? initialData.total_booked : 0, // none booked on create
      image: formData.image_path,
      tags: formData.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
    };

    onSubmit(finalPayload);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black bg-opacity-40 p-4  ">
      <div className="bg-white w-full max-w-2xl rounded-2xl p-6 mt-10 shadow-lg overflow-y-auto">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-2xl font-semibold text-textPrimary">
            {mode === "edit" ? "Edit Event" : "Create New Event"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-black text-2xl"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="">
          <label
            htmlFor="title"
            className="block font-medium text-textPrimary mb-2"
          >
            Title
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            required
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3"
          />
          <div className="grid grid-cols-2 md:gap-6 gap-3 mb-3">
            <div className="">
              <div>
                <label
                  htmlFor="date"
                  className="block font-medium text-textPrimary mb-2"
                >
                  Date
                </label>
                <div className="flex items-center justify-between border rounded-md text-sm">
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    required
                    onChange={handleChange}
                    className="w-full border-none p-2 rounded md:ml-2 "
                  />
                  <div className="mr-2">
                    <Calendar color={"#8570AD"} size={"20"}></Calendar>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div>
                <label
                  htmlFor="time"
                  className="block font-medium text-textPrimary mb-2"
                >
                  Time
                </label>
                <div className="flex items-center justify-between border rounded-md">
                  <div className="flex items-center justify-around text-sm">
                    <span className="text-gray-400 md:pl-4 pl-1">e.g. </span>
                    <input
                      type="time"
                      name="start_time"
                      value={formData.start_time}
                      required
                      onChange={handleChange}
                      className="w-full border-none p-2 rounded"
                    />
                    <span className="text-gray-400">-</span>
                    <input
                      type="time"
                      name="end_time"
                      value={formData.end_time}
                      onChange={handleChange}
                      className="w-full border-none p-2 rounded"
                    />
                  </div>
                  <div className="mr-2">
                    <Clock color={"#8570AD"} size={"20"}></Clock>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mb-2">
            <label
              htmlFor="description"
              className="block font-medium text-textPrimary mb-2"
            >
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full border p-2 rounded h-30"
            />
          </div>

          <div className="mb-3">
            <label
              htmlFor="location"
              className="block font-medium text-textPrimary mb-2"
            >
              Event Location
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>
          <div className="grid grid-cols-2 gap-6 mb-3">
            <div>
              <label
                htmlFor="capacity"
                className="block font-medium text-textPrimary mb-2"
              >
                Capacity
              </label>
              <input
                type="number"
                name="total_seats"
                min={0}
                required
                value={formData.total_seats}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
            </div>

            <div>
              <label
                htmlFor="Tags"
                className="block font-medium text-textPrimary mb-2"
              >
                Tags (comma separated)
              </label>
              <input
                type="text"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="image"
              className="block font-medium text-gray-900 mb-2"
            >
              Image
            </label>
            <div className=" relative w-full border-2 border-dashed border-gray-300 rounded-lg bg-white py-8 px-6 text-center transition-all duration-200 cursor-pointer hover:border-gray-400 hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <input
                    type="file"
                    name="image"
                    accept=".jpg,.jpeg,.png"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <div className="rounded-full bg-gray-100 p-2">
                    <CloudUpload
                      className="w-12 h-12 mx-auto text-gray-400"
                      strokeWidth={1}
                    />
                  </div>
                  <div className="text-start">
                    <p className="text-gray-600 text-base mb-2">
                      Drag or{" "}
                      <span className="text-blue-500 underline">upload</span>{" "}
                      the picture here
                    </p>
                    <p className="text-gray-400 text-sm">Max. 5MB | JPG, PNG</p>
                  </div>
                </div>

                <label
                  htmlFor="event-image"
                  className="bg-blue-50 text-blue-600 border border-blue-200 rounded px-3 py-1.5 text-sm font-medium cursor-pointer ml-2 transition-all duration-200 hover:bg-blue-100"
                >
                  Browse
                </label>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-4 pt-4">
            <button type="button" onClick={onClose} className="text-gray-500">
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              {mode === "edit" ? "Update" : "Create Event"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventForm;
