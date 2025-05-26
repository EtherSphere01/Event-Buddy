"use client";

import { Calendar, Calendar1, Clock, Timer } from "lucide-react";
import React, { useState, useEffect } from "react";

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
    time: "",
    description: "",
    location: "",
    capacity: 0,
    tags: "",
    image: null,
  });

  useEffect(() => {
    if (mode === "edit" && initialData) {
      setFormData({
        ...formData,
        ...initialData,
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
    onSubmit(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black bg-opacity-40 p-4">
      <div className="bg-white w-full max-w-2xl rounded-2xl p-6 mt-10 shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-textPrimary mb-2">
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
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-6"
          />
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div className="">
              <div>
                <label
                  htmlFor="date"
                  className="block font-medium text-textPrimary mb-2"
                >
                  Date
                </label>
                <div className="flex items-center justify-between border rounded-md">
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    required
                    onChange={handleChange}
                    className="w-full border-none p-2 rounded ml-2"
                  />
                  <div className="mr-2">
                    <Calendar color={"#8570AD"}></Calendar>
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
                  <div className="flex items-center justify-around">
                    <span className="text-gray-400 pl-4">e.g. </span>
                    <input
                      type="time"
                      name="start_time"
                      value={formData.date}
                      required
                      onChange={handleChange}
                      className="w-full border-none p-2 rounded"
                    />
                    <span className="text-gray-400">-</span>
                    <input
                      type="time"
                      name="end_time"
                      value={formData.date}
                      onChange={handleChange}
                      className="w-full border-none p-2 rounded"
                    />
                  </div>
                  <div className="mr-2">
                    <Clock color={"#8570AD"}></Clock>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mb-6">
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
              className="w-full border p-2 rounded h-32"
            />
          </div>

          <div className="mb-6">
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
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div>
              <label
                htmlFor="capacity"
                className="block font-medium text-textPrimary mb-2"
              >
                Capacity
              </label>
              <input
                type="number"
                name="capacity"
                min={0}
                value={formData.capacity}
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
              htmlFor="capacity"
              className="block font-medium text-textPrimary mb-2"
            >
              Image
            </label>
            <input type="file" className="w-full" />
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
