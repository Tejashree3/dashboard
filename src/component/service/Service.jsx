import React, { useState, useEffect } from "react";
import { Footer } from "@/layouts/footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";  // React Router v6

const Service = () => {
  const [sections, setSections] = useState([
    { id: Date.now(), title: "", description: "", image: null, imagePreview: null },
  ]);

  const navigate = useNavigate();  // Hook for redirection

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");

    if (id) {
      const fetchService = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/api/services/${id}`);
          const { title, description, image } = response.data;
          setSections([
            {
              id: Date.now(),
              title,
              description,
              imagePreview: `http://localhost:5000/${image}`,
            },
          ]);
        } catch (error) {
          console.error("Error fetching service:", error);
        }
      };

      fetchService();
    }
  }, []);

  const handleChange = (index, field, value) => {
    const updatedSections = [...sections];
    updatedSections[index][field] = value;
    setSections(updatedSections);
  };

  const handleImageChange = (index, file) => {
    const updatedSections = [...sections];
    updatedSections[index].image = file;
    updatedSections[index].imagePreview = URL.createObjectURL(file);
    setSections(updatedSections);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData();
      formData.append("title", sections[0].title);
      formData.append("description", sections[0].description);
      formData.append("image", sections[0].image);

      const urlParams = new URLSearchParams(window.location.search);
      const id = urlParams.get("id");
      const url = id
        ? `http://localhost:5000/api/services/${id}`
        : "http://localhost:5000/api/services/add";

      const method = id ? "PUT" : "POST";

      const response = await axios({
        url,
        method,
        data: formData,
      });

      if (response.status === 200 || response.status === 201) {
        
        // Reset the form fields
        setSections([
          { id: Date.now(), title: "", description: "", image: null, imagePreview: null },
        ]);
        toast.success("Service saved successfully!");
  
        // Delay redirection to ensure toast shows up
        setTimeout(() => {
          navigate("/servicesfront"); // Adjust the path based on your app's routing
        }, 1000);  // 2 seconds delay to allow toast to show
      } else {
        toast.error("Error saving service.");
      }
    } catch (error) {
      toast.error("An error occurred: " + error.message);
    }
  };

  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex justify-between items-center pl-3 pr-3">
        <h1 className="text-2xl text-black dark:text-white font-bold mb-4">
          {new URLSearchParams(window.location.search).get("id") ? "Edit Service" : "Create New Service"}
        </h1>
      </div>
      <form className="flex flex-col gap-4 w-full" onSubmit={handleSubmit}>
        {sections.map((section, index) => (
          <div key={section.id} className="border p-4 rounded mb-4">
            <input
              type="text"
              name="title"
              placeholder="Service Title"
              value={section.title}
              onChange={(e) => handleChange(index, "title", e.target.value)}
              className="p-2 border rounded w-full mb-2"
              required
            />
            <textarea
              name="description"
              placeholder="Service Description"
              value={section.description}
              onChange={(e) => handleChange(index, "description", e.target.value)}
              className="p-2 border rounded w-full mb-2"
              rows="4"
              required
            ></textarea>

            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={(e) => handleImageChange(index, e.target.files[0])}
              className="p-2 border rounded"
            />

            {section.imagePreview && (
              <div className="mt-4">
                <p className="text-gray-700 dark:text-gray-300">Image Preview:</p>
                <img
                  src={section.imagePreview}
                  alt="Preview"
                  className="w-40 h-40 object-cover border rounded"
                />
              </div>
            )}
          </div>
        ))}
        <button type="submit" className="bg-blue-500 w-[100px] text-white p-2 rounded">
          Submit
        </button>
      </form>
      <Footer />
      <ToastContainer />
    </div>
  );
};

export default Service;
