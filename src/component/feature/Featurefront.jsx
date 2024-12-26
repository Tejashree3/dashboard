import React, { useState, useEffect } from "react";
import { FaPlus, FaEdit, FaTrashAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Featurefront = () => {
  const navigate = useNavigate();
  const [features, setFeatures] = useState([]);

  // Fetch feature data from the API
  useEffect(() => {
    const fetchFeatures = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/features/list");
        const data = await response.json();

        setFeatures(data);
      } catch (error) {
        console.error("Error fetching features:", error);
      }
    };

    fetchFeatures();
  }, []);

  const handleAddFeature = () => {
    navigate("/featureform");
  };

  const handleEditFeature = (id) => {
    navigate(`/featureform?id=${id}`);
  };

  const handleDeleteFeature = async (id) => {
    if (window.confirm("Are you sure you want to delete this feature?")) {
      try {
        const response = await fetch(`http://localhost:5000/api/features/delete/${id}`, {
          method: "DELETE",
        });
        if (response.ok) {
          // Remove the deleted feature from the state
          setFeatures(features.filter((feature) => feature._id !== id));
        } else {
          console.error("Failed to delete the feature");
        }
      } catch (error) {
        console.error("Error deleting feature:", error);
      }
    }
  };

  return (
<div className="space-y-4">
  {features.map((feature) => (
    <div
      key={feature._id}
      className="flex flex-col md:flex-row items-center justify-between bg-white dark:bg-slate-600 shadow-lg rounded-lg p-4 hover:shadow-xl transition-shadow"
    >
      {/* Image */}
      <img
        src={feature.images[0]} // Accessing the first image in the array
        alt="Feature"
        className="w-24 h-24 rounded-lg object-cover mr-0 md:mr-4 mb-4 md:mb-0"
      />

      <div className="flex flex-col md:flex-row justify-between w-full">
        {/* Title and Other Information */}
        <div className="mb-4 md:mb-0 md:flex-1">
          <h5 className="text-lg font-semibold text-gray-800 dark:text-white truncate w-full md:w-[180px]">
            {feature.title}
          </h5>
        </div>

        <div className="flex flex-wrap gap-4 md:flex-1 justify-between">
          <p className="text-gray-600 text-sm dark:text-white">${feature.price}</p>
          <p className="text-gray-600 text-sm dark:text-white">{feature.tag}</p>
          <p className="text-gray-600 text-sm dark:text-white truncate w-[100px]">
            {feature.location}
          </p>
          <p className="text-gray-600 text-sm dark:text-white">{feature.size}</p>
          <p className="text-gray-600 text-sm dark:text-white">{feature.bed}</p>
          <p className="text-gray-600 text-sm dark:text-white">{feature.bath}</p>
        </div>

        {/* Additional Lists */}
        <div className="flex-1">
          <ul className="text-gray-600 text-sm dark:text-white space-y-1">
            <li>{feature.list1}</li>
            <li>{feature.list2}</li>
            <li>{feature.list3}</li>
          </ul>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-2 mt-4 md:mt-0">
        <button
          className="bg-blue-500 text-white p-2 rounded-full dark:bg-slate-700 hover:bg-blue-600 transition-colors"
          onClick={handleAddFeature}
        >
          <FaPlus size={20} />
        </button>
        <button
          className="bg-yellow-500 text-white p-2 rounded-full dark:bg-slate-700 hover:bg-yellow-600 transition-colors"
          onClick={() => handleEditFeature(feature._id)}
        >
          <FaEdit size={20} />
        </button>
        <button
          className="bg-red-500 text-white p-2 rounded-full dark:bg-slate-700 hover:bg-red-600 transition-colors"
          onClick={() => handleDeleteFeature(feature._id)}
        >
          <FaTrashAlt size={20} />
        </button>
      </div>
    </div>
  ))}
</div>

  );
};

export default Featurefront;
