import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom"; // To read query parameters
import axios from 'axios'; // Make sure axios is imported
import { toast, ToastContainer } from 'react-toastify'; // Import toast and ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Make sure to import styles for toast notifications

const Featureform = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    tag: "",
    price: "",
    location: "",
    size: "",
    bed: "",
    bath: "",
    list1: "",
    list2: "",
    list3: "",
  });
  const [images, setImages] = useState([]); // Handle multiple images
  const [imagePreviews, setImagePreviews] = useState([]); // Handle image previews
  const [status, setStatus] = useState("");
  const featureId = new URLSearchParams(location.search).get("id");

  useEffect(() => {
    if (featureId) {
      const fetchFeatureData = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/api/features/list/${featureId}`);
          console.log("API Response:", response);  // Log the full response
          const feature = response.data;  // Directly use response.data as the feature object
          if (feature) {
            setFormData({
              title: feature.title || "",
              tag: feature.tag || "",
              price: feature.price || "",
              location: feature.location || "",
              size: feature.size || "",
              bed: feature.bed || "",
              bath: feature.bath || "",
              list1: feature.list1 || "",
              list2: feature.list2 || "",
              list3: feature.list3 || "",
            });
      
            // If image URLs are present, set previews for them
            const imagePreviews = feature.images.map((image) => `http://localhost:5000${image}`);
            setImagePreviews(imagePreviews);
          } else {
            console.error("No feature data found");
          }
        } catch (error) {
          console.error("Error fetching feature data:", error);
        }
      };
      
      fetchFeatureData();
    }
  }, [featureId]);

  // Handle image file change for multiple images
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      setImages(files);
      setImagePreviews(files.map((file) => URL.createObjectURL(file))); // Preview the images
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("title", formData.title);
    data.append("tag", formData.tag);
    data.append("price", formData.price);
    data.append("location", formData.location);
    data.append("size", formData.size);
    data.append("bed", formData.bed);
    data.append("bath", formData.bath);
    data.append("list1", formData.list1);
    data.append("list2", formData.list2);
    data.append("list3", formData.list3);

    // Append images
    images.forEach((image) => {
      data.append("images", image);
    });

    try {
      let response;
      if (featureId) {
        // Update the existing feature
        response = await axios.put(`http://localhost:5000/api/features/update/${featureId}`, data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        console.log(response)
        setStatus("Feature updated successfully!");
        toast.success("Feature updated successfully!"); // Show success toast
      } else {
        // Create a new feature
        response = await axios.post("http://localhost:5000/api/features/add", data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        setStatus("Feature added successfully!");
        toast.success("Feature added successfully!");
      }

      // Clear the form data and image state after successful submission
      setFormData({
        title: "",
        tag: "",
        price: "",
        location: "",
        size: "",
        bed: "",
        bath: "",
        list1: "",
        list2: "",
        list3: "",
      });
      setImages([]);
      setImagePreviews([]);

      console.log(response.data);
    } catch (error) {
      setStatus("Error creating or updating feature");
      toast.error("Error creating or updating feature");
      console.error(error.response?.data || error.message);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="flex flex-col gap-y-4">
      <h1 className="text-2xl text-black dark:text-white font-bold mb-4">
        {featureId ? "Update Feature" : "Create New Feature"}
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
        <input
          type="text"
          name="title"
          placeholder="Feature Title"
          value={formData.title}
          onChange={handleInputChange}
          className="p-2 border rounded"
          required
        />
        <input
          type="text"
          name="tag"
          placeholder="Tag"
          value={formData.tag}
          onChange={handleInputChange}
          className="p-2 border rounded"
          required
        />
        <input
          type="text"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleInputChange}
          className="p-2 border rounded"
          required
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleInputChange}
          className="p-2 border rounded"
          required
        />
        <input
          type="text"
          name="size"
          placeholder="Size"
          value={formData.size}
          onChange={handleInputChange}
          className="p-2 border rounded"
          required
        />
        <input
          type="text"
          name="bed"
          placeholder="Bedrooms"
          value={formData.bed}
          onChange={handleInputChange}
          className="p-2 border rounded"
          required
        />
        <input
          type="text"
          name="bath"
          placeholder="Bathrooms"
          value={formData.bath}
          onChange={handleInputChange}
          className="p-2 border rounded"
          required
        />
        <input
          type="text"
          name="list1"
          placeholder="List 1"
          value={formData.list1}
          onChange={handleInputChange}
          className="p-2 border rounded"
          required
        />
        <input
          type="text"
          name="list2"
          placeholder="List 2"
          value={formData.list2}
          onChange={handleInputChange}
          className="p-2 border rounded"
          required
        />
        <input
          type="text"
          name="list3"
          placeholder="List 3"
          value={formData.list3}
          onChange={handleInputChange}
          className="p-2 border rounded"
          required
        />
        <input
          type="file"
          name="image"
          accept="image/*"
          multiple
          onChange={handleFileChange}
          className="p-2 border rounded"
        />

        {imagePreviews.length > 0 && (
          <div className="mt-4">
            <p className="text-gray-700 dark:text-gray-300">Image Previews:</p>
            {imagePreviews.map((preview, index) => (
              <img key={index} src={preview} alt="Preview" className="w-40 h-40 object-cover border rounded" />
            ))}
          </div>
        )}

        <button type="submit" className="bg-blue-500 w-[100px] text-white p-2 rounded">
          {featureId ? "Update Feature" : "Add Feature"}
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

export default Featureform;
