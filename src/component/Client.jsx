import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom"; // To access query params
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify'; // Import toast and ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Import styles for toast notifications

const Client = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const clientId = queryParams.get("id"); // Retrieve client id from URL

  const [clientData, setClientData] = useState({
    c: "",
    review: "",
    rating: "", // Default rating to 5
  });
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (clientId) {
      // If clientId exists, fetch client data to populate the form for editing
      axios
        .put(`http://localhost:5000/api/client/update/${clientId}`)
        .then((response) => {
          setClientData(response.data);
        })
        .catch((error) => {
          console.error("Error fetching client data:", error);
          toast.error("Error fetching client data.");
        });
    }
  }, [clientId]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (clientId) {
      // Update client
      axios
      .put(`http://localhost:5000/api/client/update/${clientId}`)
      .then(() => {
          setStatus("Client updated successfully!");
          toast.success("Client updated successfully!");
          // Optionally, navigate back after success
          navigate("/clientfront"); // Adjust as per your routing
        })
        .catch((error) => {
          setStatus("Error updating client.");
          toast.error("Error updating client.");
          console.error("Error updating client:", error);
        });
    } else {
      // Add new client
      axios
        .post("http://localhost:5000/api/client/add", clientData)
        .then(() => {
          setStatus("Client added successfully!");
          toast.success("Client added successfully!");
          // Optionally, navigate back after success
          navigate("/clientfront"); // Adjust as per your routing
        })
        .catch((error) => {
          setStatus("Error adding client.");
          toast.error("Error adding client.");
          console.error("Error adding client:", error);
        });
    }
  };

  return (
    <div className="flex flex-col gap-y-4">
      <h1 className="text-2xl text-black dark:text-white font-bold mb-4">
        {clientId ? "Update Client" : "Create New Client"}
      </h1>
      <form className="flex flex-col gap-4 w-full" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={clientData.name}
          onChange={(e) => setClientData({ ...clientData, name: e.target.value })}
          placeholder="Client Name"
          className="p-2 border rounded"
          required
        />
        <textarea
          name="review"
          value={clientData.review}
          onChange={(e) =>
            setClientData({ ...clientData, review: e.target.value })
          }
          placeholder="Client Review"
          className="p-2 border rounded"
          rows="4"
          required
        ></textarea>
        
        <div>
          <label className="block text-gray-700 dark:text-gray-300">Rating</label>
          <input
            type="number"
            name="rating"
            value={clientData.rating}
            onChange={(e) => setClientData({ ...clientData, rating: e.target.value })}
            min="1"
            max="5"
            className="p-2 border rounded"
            required
          />
        </div>

        <button type="submit" className="bg-blue-500 w-[100px] text-white p-2 rounded">
          {clientId ? "Update" : "Add"} Client
        </button>
      </form>

      {status && (
        <div className={`mt-4 ${status.startsWith("Error") ? "text-red-500" : "text-green-500"}`}>
          {status}
        </div>
      )}

      <ToastContainer />
    </div>
  );
};

export default Client;
