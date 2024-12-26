import React, { useEffect, useState } from "react";
import { FaPlus, FaEdit, FaTrashAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Servicefront = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch services from the API
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/services/");
        const data = await response.json();
        setServices(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching services:", error);
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const handleAddService = () => {
    navigate("/serviceform");
  };

  const handleEditService = (id) => {
    navigate(`/serviceform?id=${id}`);
  };

  const handleDeleteService = async (id) => {
    if (window.confirm("Are you sure you want to delete this service?")) {
      try {
        const response = await fetch(`http://localhost:5000/api/services/${id}`, {
          method: "DELETE",
        });
        if (response.ok) {
          setServices(services.filter((service) => service._id !== id));
          toast.success("Service deleted successfully!");
        } else {
          console.error("Error deleting service");
          toast.error("Failed to delete service."); // Display error toast
        }
      } catch (error) {
        console.error("Error deleting service:", error);
        toast.error("Failed to delete service."); // Display error toast
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
    <div className="max-w-full mx-auto p-4">
      {services.map((service) => (
        <div
          key={service._id}
          className="flex flex-col md:flex-row items-center justify-between bg-white dark:bg-slate-600 shadow-lg rounded-lg p-4 mb-4 hover:shadow-xl transition-shadow"
          >
          {/* Image */}
          <img
            src={`http://localhost:5000/${service.image}`}
            alt={service.title}
            className="w-24 h-24 rounded-lg object-cover mr-4"
          />

          <div className="flex justify-around pl-4 pr-4 w-full">
            {/* Title and Description */}
            <div>
              <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                {service.title}
              </h2>
            </div>

            <div>
              <p className="text-gray-600 text-sm dark:text-white">
                {service.description}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4">
            <button
              className="bg-blue-500 text-white p-2 rounded-full dark:bg-slate-700 hover:bg-blue-600 transition-colors"
              onClick={handleAddService}
            >
              <FaPlus size={20} />
            </button>
            <button
              className="bg-yellow-500 text-white p-2 rounded-full dark:bg-slate-700 hover:bg-yellow-600 transition-colors"
              onClick={() => handleEditService(service._id)}
            >
              <FaEdit size={20} />
            </button>
            <button
              className="bg-red-500 text-white p-2 rounded-full dark:bg-slate-700 hover:bg-red-600 transition-colors"
              onClick={() => handleDeleteService(service._id)}
            >
              <FaTrashAlt size={20} />
            </button>
          </div>
        </div>
      ))}
    </div>

</>
  );
};

export default Servicefront;
