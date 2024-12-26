import React, { useState, useEffect } from "react";
import { Footer } from "@/layouts/footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";  // React Router v6

const Investmentform = () => {
  const [sections, setSections] = useState([
    { id: Date.now(), title: "", tag: "", price: "", rating: "", image: null, imagePreview: null },
  ]);

  const navigate = useNavigate();  // Hook for redirection

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");

    if (id) {
      const fetchInvestment = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/api/investments/list/${id}`);
          const { title, tag, price, rating, image } = response.data;
          setSections([
            {
              id: Date.now(),
              title,
              tag,
              price,
              rating,
              image,
              imagePreview: image ? `http://localhost:5000${image}` : null, // Assuming the image is stored in the uploads folder
            },
          ]);
        } catch (error) {
          console.error("Error fetching investment:", error);
        }
      };

      fetchInvestment();
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
    updatedSections[index].imagePreview = URL.createObjectURL(file); // Create an object URL for preview
    setSections(updatedSections);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData();
      formData.append("title", sections[0].title);
      formData.append("tag", sections[0].tag);
      formData.append("price", sections[0].price);
      formData.append("rating", sections[0].rating);
      formData.append("image", sections[0].image);

      const urlParams = new URLSearchParams(window.location.search);
      const id = urlParams.get("id");
      const url = id
        ? `http://localhost:5000/api/investments/update/${id}`
        : "http://localhost:5000/api/investments/add";

      const method = id ? "PUT" : "POST";

      const response = await axios({
        url,
        method,
        data: formData,
      });

      if (response.status === 200 || response.status === 201) {
        // Reset the form fields
        setSections([ 
          { id: Date.now(), title: "", tag: "", price: "", rating: "", image: null, imagePreview: null },
        ]);
        toast.success("Investment saved successfully!");

        // Delay redirection to ensure toast shows up
        setTimeout(() => {
          navigate("/investmentfront"); // Adjust the path based on your app's routing
        }, 1000);  // 1 second delay to allow toast to show
      } else {
        toast.error("Error saving investment.");
      }
    } catch (error) {
      toast.error("An error occurred: " + error.message);
    }
  };

  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex justify-between items-center pl-3 pr-3">
        <h1 className="text-2xl text-black dark:text-white font-bold mb-4">
          {new URLSearchParams(window.location.search).get("id") ? "Edit Investment" : "Create New Investment"}
        </h1>
      </div>
      <form className="flex flex-col gap-4 w-full" onSubmit={handleSubmit}>
        {sections.map((section, index) => (
          <div key={section.id} className="border p-4 rounded mb-4">
            <input
              type="text"
              name="title"
              placeholder="Investment Title"
              value={section.title}
              onChange={(e) => handleChange(index, "title", e.target.value)}
              className="p-2 border rounded w-full mb-2"
              required
            />
            <input
              type="text"
              name="tag"
              placeholder="Investment Tag"
              value={section.tag}
              onChange={(e) => handleChange(index, "tag", e.target.value)}
              className="p-2 border rounded w-full mb-2"
              required
            />
            <input
              type="text"
              name="price"
              placeholder="Investment Price"
              value={section.price}
              onChange={(e) => handleChange(index, "price", e.target.value)}
              className="p-2 border rounded w-full mb-2"
              required
            />
            <input
              type="text"
              name="rating"
              placeholder="Investment Rating"
              value={section.rating}
              onChange={(e) => handleChange(index, "rating", e.target.value)}
              className="p-2 border rounded w-full mb-2"
              required
            />
            <div className="mb-2">
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={(e) => handleImageChange(index, e.target.files[0])}
                className="p-2 border rounded"
              />
              {section.imagePreview && (
                <img
                  src={section.imagePreview}
                  alt="Image Preview"
                  className="mt-2 w-32 h-32 object-cover rounded"
                />
              )}
            </div>
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

export default Investmentform;
