import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom"; // To read query parameters
import axios from 'axios'; // Make sure axios is imported
import { toast, ToastContainer } from 'react-toastify'; // Import toast and ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Make sure to import styles for toast notifications
import sanitizeHtml from 'sanitize-html';
import ReactQuill from 'react-quill'; // Import ReactQuill
import 'react-quill/dist/quill.snow.css'; // Import the Quill styles

const DashboardPage = () => {
  const location = useLocation();

 

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    tag:"",
    author:"",
    date: "",
  });
  const sanitizedDescription = sanitizeHtml(formData.description);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [status, setStatus] = useState("");
  const blogId = new URLSearchParams(location.search).get("id");
  useEffect(() => {
    if (blogId) {
      const fetchBlogData = async () => {
        try {
          const response = await axios.put(`http://localhost:5000/api/blog/update/${blogId}`);
          const blog = response.data.blog;
          if (blog) {
            setFormData({
              name: blog.name || "",
              description: blog.description || "",
              tag: blog.tag || "",
              author: blog.author || "",
              date: blog.date ? new Date(blog.date).toISOString().split('T')[0] : "", // Format the date properly for input
            });
            // If the image URL is relative, prepend the base URL
            const imageUrl = blog.image ? `http://localhost:5000${blog.image}` : null;
            setImagePreview(imageUrl); // Set the image preview URL
          } else {
            console.error("No blog data found");
          }
        } catch (error) {
          console.error("Error fetching blog data:", error);
        }
      };
      fetchBlogData();
    }
  }, [blogId]);
  


  
  // Handle image file change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file)); // Preview the image
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", formData.name);
    data.append("description", sanitizedDescription);
    data.append("date", formData.date);
    data.append("tag", formData.tag);
    data.append("author", formData.author);
    if (image) data.append("image", image);

    try {
      let response;
      if (blogId) {
        // Update the existing blog
        response = await axios.put(`http://localhost:5000/api/blog/update/${blogId}`, data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        setStatus("Blog updated successfully!");
        toast.success("Blog updated successfully!"); // Show success toast
      } else {
        // Create a new blog
        response = await axios.post("http://localhost:5000/api/blog/create", data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        setStatus("Blog added successfully!");
        toast.success("Blog added successfully!");
      }

      // Clear the form data and image state after successful submission
      setFormData({
        name: "",
        description: "",
        date: "",
        tag:"",
        author:"",
      });
      setImage(null);
      setImagePreview(null);

      console.log(response.data);
    } catch (error) {
      setStatus("Error creating or updating blog");
      toast.error("Error creating or updating blog");
      console.error(error.response?.data || error.message);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleDescriptionChange = (value) => {
    setFormData({
      ...formData,
      description: value,
    });
  };

  return (
    <div className="flex flex-col gap-y-4">
      <h1 className="text-2xl text-black dark:text-white font-bold mb-4">
        {blogId ? "Update Blog" : "Create New Blog"}
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
        <input
          type="text"
          name="name"
          placeholder="Blog Title"
          value={formData.name}
          onChange={handleInputChange}
          className="p-2 border rounded"
          required
        />
        <label>Description</label>
        <ReactQuill
          value={formData.description}
          onChange={handleDescriptionChange}
          className="border rounded"
        />
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleInputChange}
          className="p-2 border rounded"
          required
        />
               <input
          type="text"
          name="tag"
          placeholder="Blog tag"

          value={formData.tag}
          onChange={handleInputChange}
          className="p-2 border rounded"
          required
        />

<input
          type="text"
          name="author"
          placeholder="Blog author"

          value={formData.author}
          onChange={handleInputChange}
          className="p-2 border rounded"
          required
        />
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleFileChange}
          className="p-2 border rounded"
        />

        {imagePreview && (
          <div className="mt-4">
            <p className="text-gray-700 dark:text-gray-300">Image Preview:</p>
            <img src={imagePreview} alt="Preview" className="w-40 h-40 object-cover border rounded" />
          </div>
        )}

        <button type="submit" className="bg-blue-500 w-[100px] text-white p-2 rounded">
          {blogId ? "Update Blog" : "Add Blog"}
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

export default DashboardPage;
