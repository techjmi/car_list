import React, { useState } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { storage } from "../firebase";
import { postCar } from "../service/api";
import { useNavigate } from "react-router-dom";

const Carform = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    tags: {
      car_type: "",
      company: "",
      dealer: "",
    },
    images: [],
  });

  const [uploadProgress, setUploadProgress] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    if (formData.images.length + selectedFiles.length > 10) {
      setError("You can only upload a maximum of 10 images");
      return;
    }
    setError("");
    setFormData((prevData) => ({
      ...prevData,
      images: [...prevData.images, ...selectedFiles],
    }));
  };

  const handleUploadImages = async () => {
    const storage = getStorage();
    const imageUrls = [];
    setUploadProgress(new Array(formData.images.length).fill(0));

    for (let i = 0; i < formData.images.length; i++) {
      const file = formData.images[i];
      const storageRef = ref(
        storage,
        `cars/${new Date().getTime()}_${file.name}`
      );

      const uploadTask = uploadBytesResumable(storageRef, file);

      await new Promise((resolve, reject) => {
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setUploadProgress((prevProgress) => {
              const updatedProgress = [...prevProgress];
              updatedProgress[i] = progress.toFixed(0);
              return updatedProgress;
            });
          },
          (error) => {
            console.error("Image upload failed:", error);
            setError("Image upload failed");
            reject(error);
          },
          async () => {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            imageUrls.push(downloadURL);
            resolve();
          }
        );
      });
    }

    return imageUrls;
  };

  const handleRemoveImage = (index) => {
    setFormData((prevData) => ({
      ...prevData,
      images: prevData.images.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const imageUrls = await handleUploadImages();
      const updatedFormData = { ...formData, images: imageUrls };

      const response = await postCar(updatedFormData);
      // console.log('the form res', response)

      if (response&&response.status === 201) {
        navigate("/");
      } else {
        setError("Failed to submit form data");
      }
    } catch (error) {
      console.error("Error submitting form data:", error);
      setError("Error occurred while submitting the form");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Add New Car</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
              rows="4"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700">Car Type</label>
            <input
              type="text"
              name="car_type"
              value={formData.tags.car_type}
              onChange={(e) =>
                setFormData((prevData) => ({
                  ...prevData,
                  tags: { ...prevData.tags, car_type: e.target.value },
                }))
              }
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700">Company</label>
            <input
              type="text"
              name="company"
              value={formData.tags.company}
              onChange={(e) =>
                setFormData((prevData) => ({
                  ...prevData,
                  tags: { ...prevData.tags, company: e.target.value },
                }))
              }
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700">Dealer</label>
            <input
              type="text"
              name="dealer"
              value={formData.tags.dealer}
              onChange={(e) =>
                setFormData((prevData) => ({
                  ...prevData,
                  tags: { ...prevData.tags, dealer: e.target.value },
                }))
              }
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">
              Images (Max: 10)
            </label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageChange}
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <div className="flex flex-wrap mt-2 gap-2">
              {formData.images.map((image, index) => (
                <div key={index} className="relative">
                  <img
                    src={URL.createObjectURL(image)}
                    alt="Selected"
                    className="h-20 w-20 object-cover rounded-md border"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full text-xs"
                  >
                    x
                  </button>
                  <progress
                    value={uploadProgress[index] || 0}
                    max="100"
                    className="w-full"
                  />
                </div>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-200"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Carform;
