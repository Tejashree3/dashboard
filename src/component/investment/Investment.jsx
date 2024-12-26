import React, { useEffect, useState } from "react";
import { FaPlus, FaEdit, FaTrashAlt } from "react-icons/fa";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const Investment = () => {
  const [investments, setInvestments] = useState([]);
  const navigate = useNavigate(); // Initialize useNavigate hook

  useEffect(() => {
    // Fetch data from the API
    const fetchInvestments = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/investments/list");
        setInvestments(response.data.data);
      } catch (error) {
        toast.error("Error fetching investments!");
        console.error("Error fetching investments:", error);
      }
    };

    fetchInvestments();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this investment?")) {
      try {
        const response = await fetch(`http://localhost:5000/api/investments/delete/${id}`, {
          method: "DELETE",
        });
        if (response.ok) {
          // Remove the deleted investment from the state
          setInvestments(investments.filter((investment) => investment._id !== id));
        } else {
          console.error("Failed to delete the investment");
        }
      } catch (error) {
        console.error("Error deleting investment:", error);
      }
    }
  };

  const handleAdd = () => {
    navigate("/investmentform"); // Navigate to the investment form for adding
  };

  const handleEdit = (id) => {
    navigate(`/investmentform?id=${id}`); // Navigate to the investment form with ID for updating
  };

  return (
    <div className="max-w-full mx-auto p-4">
      <ToastContainer /> {/* Toast notification container */}

      {investments.map((investment) => (
        <div
          key={investment._id}
          className="flex flex-col  md:flex-row items-center justify-between bg-white dark:bg-slate-600 shadow-lg rounded-lg p-4 mb-4 hover:shadow-xl transition-shadow"
        >
          {/* Image */}
          <img
            src={`http://localhost:5000${investment.image}`}
            alt={investment.title}
            className="w-24 h-24 rounded-lg object-cover mr-4"
          />

          <div className="flex justify-evenly pl-4 pr-4 w-full">
            {/* Title and Other Information */}
            <div>
              <h5 className="text-lg text-sm w-[200px] font-semibold text-gray-800 dark:text-white">
                {investment.title}
              </h5>
            </div>

            <div>
              <p className="text-gray-600 text-sm dark:text-white">{investment.price}</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm dark:text-white">{investment.tag}</p>
            </div>

            <div>
              <p className="text-gray-600 text-sm dark:text-white">{investment.rating}</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4">
            <button
              className="bg-blue-500 text-white p-2 rounded-full dark:bg-slate-700 hover:bg-blue-600 transition-colors"
              onClick={handleAdd} // Navigate to the form for adding
            >
              <FaPlus size={20} />
            </button>
            <button
              className="bg-yellow-500 text-white p-2 rounded-full dark:bg-slate-700 hover:bg-yellow-600 transition-colors"
              onClick={() => handleEdit(investment._id)} // Navigate to the form for editing
            >
              <FaEdit size={20} />
            </button>
            <button
              className="bg-red-500 text-white p-2 rounded-full dark:bg-slate-700 hover:bg-red-600 transition-colors"
              onClick={() => handleDelete(investment._id)}
            >
              <FaTrashAlt size={20} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Investment;
