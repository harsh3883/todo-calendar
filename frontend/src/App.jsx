import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import Header from "./components/Header";
import DateSelector from "./components/DateSelector";
import TimeSlotGrid from "./components/TimeSlotGrid";
import TodoModal from "./components/TodoModal";
import "./App.css";
import {
  getTodosForTimeSlot as getFilteredTodos,
  formatTime,
  formatDate,
  isSameDate,
  validateTimeRange,
  getDurationInMinutes,
  formatDuration,
} from "./components/time";

const API_URL = "http://127.0.0.1:8000/api/todos/";

const CATEGORIES = {
  work: {
    name: "Work",
    color: "bg-blue-500/30",
    textColor: "text-blue-700",
    bgLight: "bg-blue-50/10",
  },
  personal: {
    name: "Personal",
    color: "bg-green-500/30",
    textColor: "text-green-700",
    bgLight: "bg-green-50/10",
  },
  health: {
    name: "Health",
    color: "bg-red-500/30",
    textColor: "text-red-700",
    bgLight: "bg-red-50/10",
  },
  education: {
    name: "Education",
    color: "bg-purple-500/30",
    textColor: "text-purple-700",
    bgLight: "bg-purple-50/10",
  },
  finance: {
    name: "Finance",
    color: "bg-yellow-500/30",
    textColor: "text-yellow-700",
    bgLight: "bg-yellow-50/10",
  },
  social: {
    name: "Social",
    color: "bg-pink-500/30",
    textColor: "text-pink-700",
    bgLight: "bg-pink-50/10",
  },
  travel: {
    name: "Travel",
    color: "bg-indigo-500/30",
    textColor: "text-indigo-700",
    bgLight: "bg-indigo-50/10",
  },
  shopping: {
    name: "Shopping",
    color: "bg-orange-500/30",
    textColor: "text-orange-700",
    bgLight: "bg-orange-50/10",
  },
  others: {
    name: "Others",
    color: "bg-gray-500/30",
    textColor: "text-gray-700",
    bgLight: "bg-gray-50/10",
  },
};

const TIME_SLOTS = [
  "00:00",
  "01:00",
  "02:00",
  "03:00",
  "04:00",
  "05:00",
  "06:00",
  "07:00",
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
  "21:00",
  "22:00",
  "23:00",
];

function App() {
  const [todos, setTodos] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [dates, setDates] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({
    id: null,
    title: "",
    category: "others",
    date: "",
    timeStart: "",
    timeEnd: "",
    description: "",
    completed: false,
  });

  useEffect(() => {
    generateDates();
    fetchTodos();
  }, []);

  useEffect(() => {
    fetchTodos();
  }, [selectedDate]);

  const generateDates = () => {
    const dateArray = [];
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth(); // 0-based month index

    const daysInMonth = new Date(year, month + 1, 0).getDate();

    for (let day = 1; day <= daysInMonth; day++) {
      dateArray.push(new Date(year, month, day));
    }

    setDates(dateArray);
  };

  const fetchTodos = async () => {
    try {
      console.log("Fetching todos from:", API_URL);
      const res = await axios.get(API_URL);
      console.log("Fetched todos:", res.data);
      setTodos(res.data);
    } catch (error) {
      console.error("Error fetching todos:", error);
      console.error("Error details:", error.response?.data);
    }
  };

  const getTodosForTimeSlot = (timeSlot) => {
    return getFilteredTodos(todos, timeSlot, selectedDate);
  };

  const handleTimeSlotClick = (timeSlot) => {
    const endTime = TIME_SLOTS[TIME_SLOTS.indexOf(timeSlot) + 1] || "23:59";
    setModalData({
      id: null,
      title: "",
      category: "work",
      date: formatDate(selectedDate),
      timeStart: timeSlot,
      timeEnd: endTime,
      description: "",
      completed: false,
    });
    setShowModal(true);
  };

  const handleEditTodo = (todo) => {
    setModalData({
      id: todo.id,
      title: todo.title,
      category: todo.category || "work",
      date: todo.date ? todo.date.split("T")[0] : formatDate(selectedDate),
      timeStart: todo.timeStart
        ? todo.timeStart.split(":").slice(0, 2).join(":")
        : "09:00",
      timeEnd: todo.timeEnd
        ? todo.timeEnd.split(":").slice(0, 2).join(":")
        : "10:00",
      description: todo.description || "",
      completed: todo.completed,
    });
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate time range before submitting
    if (!validateTimeRange(modalData.timeStart, modalData.timeEnd)) {
      alert("End time must be after start time!");
      return;
    }

    try {
      const todoData = {
        title: modalData.title,
        category: modalData.category,
        date: modalData.date,
        timeStart: formatTime(modalData.timeStart),
        timeEnd: formatTime(modalData.timeEnd),
        description: modalData.description,
        completed: modalData.completed,
      };

      console.log("Submitting todo data:", todoData);

      // Log duration for debugging
      const duration = formatDuration(modalData.timeStart, modalData.timeEnd);
      console.log(`Todo duration: ${duration}`);

      if (modalData.id !== null) {
        console.log("Updating todo with ID:", modalData.id);
        const response = await axios.put(
          `${API_URL}${modalData.id}/`,
          todoData
        );
        console.log("Update response:", response.data);
      } else {
        console.log("Creating new todo");
        const response = await axios.post(API_URL, todoData);
        console.log("Create response:", response.data);
      }

      setShowModal(false);
      fetchTodos();
    } catch (error) {
      console.error("Error submitting todo:", error);
      console.error("Error response:", error.response?.data);
    }
  };

  const handleDelete = async (id) => {
    try {
      console.log("Deleting todo with ID:", id);
      const response = await axios.delete(`${API_URL}${id}/`);
      console.log("Delete response:", response.status);
      fetchTodos();
    } catch (error) {
      console.error("Error deleting todo:", error);
      console.error("Error details:", error.response?.data);
    }
  };

  const toggleComplete = async (todo) => {
    try {
      console.log("Toggling completion for todo:", todo);
      const updatedTodo = {
        ...todo,
        completed: !todo.completed,
      };
      console.log("Updated todo data:", updatedTodo);
      const response = await axios.put(`${API_URL}${todo.id}/`, updatedTodo);
      console.log("Toggle response:", response.data);
      fetchTodos();
    } catch (error) {
      console.error("Error toggling complete:", error);
      console.error("Error details:", error.response?.data);
    }
  };

  return (
    <div
      className={`${
        darkMode ? "dark bg-gray-900 text-white" : "bg-gray-50"
      } min-h-screen transition-colors duration-300`}
    >
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />

      <DateSelector
        dates={dates}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        isSameDate={isSameDate}
      />

      <TimeSlotGrid
        timeSlots={TIME_SLOTS}
        getTodosForTimeSlot={getTodosForTimeSlot}
        handleTimeSlotClick={handleTimeSlotClick}
        handleEditTodo={handleEditTodo}
        handleDelete={handleDelete}
        toggleComplete={toggleComplete}
        categories={CATEGORIES}
        // Pass utility functions as props if needed by TimeSlotGrid
        formatDuration={formatDuration}
        getDurationInMinutes={getDurationInMinutes}
      />

      <TodoModal
        showModal={showModal}
        setShowModal={setShowModal}
        modalData={modalData}
        setModalData={setModalData}
        handleSubmit={handleSubmit}
        categories={CATEGORIES}
        // Pass validation function to modal if needed
        validateTimeRange={validateTimeRange}
        formatDuration={formatDuration}
      />
    </div>
  );
}

export default App;
