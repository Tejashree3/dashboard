import React, { useEffect, useState } from "react";
import { FaPlus, FaEdit, FaTrashAlt } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const Clientfront = () => {
  const [clients, setClients] = useState([]);
  const navigate = useNavigate(); // Initialize the useNavigate hook

  // Fetch clients from the API
  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/client/all");
        setClients(response.data);
      } catch (error) {
        console.error("Error fetching clients:", error);
      }
    };

    fetchClients();
  }, []);

  const handleAdd = () => {
    // Navigate to the client add page
    navigate("/clientform"); // This will go to the client add form
  };

  const handleEdit = (clientId) => {
    // Navigate to the client edit page
    navigate(`/clientform?id=${clientId}`); // Correct usage of clientId
  };
  const handleDelete = (clientId) => {
    // Make an API call to delete the client
    axios
      .delete(`http://localhost:5000/api/client/delete/${clientId}`)
      .then(() => {
        setClients((prevClients) =>
          prevClients.filter((client) => client._id !== clientId)
        );
        // Show success toast after deletion
        toast.success("Client deleted successfully!");
      })
      .catch((error) => {
        console.error("Error deleting client:", error);
        toast.error("Error deleting client.");
      });
  };
  

  return (
    <div className="max-w-full mx-auto p-4">
      {clients.map((client) => (
        <div
          key={client._id}
          className="flex flex-col md:flex-row items-center justify-between bg-white dark:bg-slate-600 shadow-lg rounded-lg p-4 mb-4 hover:shadow-xl transition-shadow"
          >
       
            {/* Title and Description */}
  {/* Rating */}
  <div className="w-full md:w-[100px] text-center md:text-left">
    <h2 className="text-lg font-semibold text-gray-800 dark:text-white break-words">{client.rating}</h2>
  </div>

  {/* Name */}
  <div className="w-full md:w-[300px] text-center md:text-left">
    <h2 className="text-lg font-semibold text-gray-800 dark:text-white break-words">{client.name}</h2>
  </div>

  {/* Review */}
  <div className="w-full md:w-[500px] text-center md:text-left">
    <p className="text-gray-600 text-sm dark:text-white break-words">{client.review}</p>
  </div>


          {/* Action Buttons */}
          <div className="flex space-x-4">
            <button
              onClick={handleAdd} // On Add button click, navigate to client add page
              className="bg-blue-500 text-white p-2 rounded-full dark:bg-slate-700 hover:bg-blue-600 transition-colors"
            >
              <FaPlus size={20} />
            </button>
            <button
              onClick={() => handleEdit(client._id)} // On Edit button click, navigate to client edit page
              className="bg-yellow-500 text-white p-2 rounded-full dark:bg-slate-700 hover:bg-yellow-600 transition-colors"
            >
              <FaEdit size={20} />
            </button>
            <button
              onClick={() => handleDelete(client._id)} // On Delete button click, delete the client
              className="bg-red-500 text-white p-2 rounded-full dark:bg-slate-700 hover:bg-red-600 transition-colors"
            >
              <FaTrashAlt size={20} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Clientfront;
