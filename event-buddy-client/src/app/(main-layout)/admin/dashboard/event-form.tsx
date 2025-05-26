"use client";

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
          <h2 className="text-xl font-semibold text-textPrimary">
            {mode === "edit" ? "Edit Event" : "Create New Event"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-black text-2xl"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <label
            htmlFor="title"
            className="block font-medium text-textPrimary mb-2"
          >
            Title
          </label>
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="flex gap-4">
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
            <input
              type="text"
              name="time"
              placeholder="e.g. 09:00 AM - 11:00 AM"
              value={formData.time}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>
          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border p-2 rounded h-20"
          />
          <input
            type="text"
            name="location"
            placeholder="Event Location"
            value={formData.location}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
          <div className="flex gap-4">
            <input
              type="number"
              name="capacity"
              placeholder="Capacity"
              value={formData.capacity}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
            <input
              type="text"
              name="tags"
              placeholder="Tags"
              value={formData.tags}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>

          {/* You can replace this with your image upload logic */}
          <input type="file" className="w-full" />

          <div className="flex justify-end gap-4 pt-4">
            <button type="button" onClick={onClose} className="text-gray-500">
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              {mode === "edit" ? "Update" : "Create New Event"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventForm;
