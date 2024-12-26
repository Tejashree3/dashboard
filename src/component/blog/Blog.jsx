import React, { useState, useEffect } from "react";
import { FaPlus, FaEdit, FaTrashAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Blog = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);

  // Fetch blog data from the API
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/blog/");
        const data = await response.json();
        setBlogs(data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, []);

  const handleAddService = () => {
    navigate("/blogform");
  };

  const handleEditService = (id) => {
    navigate(`/blogform?id=${id}`);
  };

  const handleDeleteService = async (id) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      try {
        const response = await fetch(`http://localhost:5000/api/blog/delete/${id}`, {
          method: "DELETE",
        });
        if (response.ok) {
          // Remove the deleted blog from the state
          setBlogs(blogs.filter((blog) => blog._id !== id));
        } else {
          console.error("Failed to delete the blog");
        }
      } catch (error) {
        console.error("Error deleting blog:", error);
      }
    }
  };

  // Function to format the date (e.g., "Dec 10, 2024")
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (


    <>
   <div className="max-w-full mx-auto p-4">
  {blogs.map((blog) => (
    <div
      key={blog._id}
      className="flex flex-col sm:flex-row items-center justify-between bg-white dark:bg-slate-600 shadow-lg rounded-lg p-4 mb-4 hover:shadow-xl transition-shadow"
    >
      {/* Image */}
      <img
        src={`http://localhost:5000${blog.image}`}
        alt={blog.title}
        className="w-24 h-24 rounded-lg object-cover mb-4 sm:mb-0 sm:mr-4"
      />

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center w-full">
        {/* Title and Description */}
        <div className="flex-1 mb-2 sm:mb-0 sm:pr-4">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
            {blog.name}
          </h2>
          <p className="text-gray-600 text-sm dark:text-white mt-1">
            {blog.description.length > 60
              ? blog.description.substring(0, 60) + "..."
              : blog.description}
          </p>
        </div>

        {/* Author and Date */}
        <div className="flex flex-col items-start sm:items-center sm:flex-row text-gray-500 dark:text-white text-sm sm:pl-4">
          <p className="mb-1 sm:mb-0 sm:mr-4">{formatDate(blog.date)}</p>
          <p>{blog.author}</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-4 mt-4 sm:mt-0">
        <button
          className="bg-blue-500 text-white p-2 rounded-full dark:bg-slate-700 hover:bg-blue-600 transition-colors"
          onClick={handleAddService}
        >
          <FaPlus size={20} />
        </button>
        <button
          className="bg-yellow-500 text-white p-2 rounded-full dark:bg-slate-700 hover:bg-yellow-600 transition-colors"
          onClick={() => handleEditService(blog._id)}
        >
          <FaEdit size={20} />
        </button>
        <button
          className="bg-red-500 text-white p-2 rounded-full dark:bg-slate-700 hover:bg-red-600 transition-colors"
          onClick={() => handleDeleteService(blog._id)}
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

export default Blog;
