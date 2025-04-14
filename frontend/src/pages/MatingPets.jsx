import React, { useEffect, useState } from 'react';
import axiosinstance from '../lib/axios';

const vendorId = "66353d2e1bcf6b4f79b39d75";

const MatingPetsManager = () => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const [form, setForm] = useState({
    category: "",
    breedName: "",
    gender: "Male",
    petQuality: "",
    age: "",
    availability: "available",
    location: "",
    breederName: "",
    phoneNum: "",
    price: "",
    photosAndVideos: ""
  });

  const fetchPets = async () => {
    try {
      const res = await axiosinstance.get(`/matingpets/${vendorId}`);
      setPets(res.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...form,
        vendor: vendorId,
        photosAndVideos: form.photosAndVideos.split(',').map(url => url.trim())
      };
      await axiosinstance.post("/matingpets", payload);
      fetchPets();
      resetForm();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...form,
        photosAndVideos: form.photosAndVideos.split(',').map(url => url.trim())
      };
      await axiosinstance.patch(`/matingpets/availability/${editId}`, payload);

      fetchPets();
      resetForm();
    } catch (err) {
      console.error(err);
    }
  };

  const resetForm = () => {
    setForm({
      category: "",
      breedName: "",
      gender: "Male",
      petQuality: "",
      age: "",
      availability: "available",
      location: "",
      breederName: "",
      phoneNum: "",
      price: "",
      photosAndVideos: ""
    });
    setShowForm(false);
    setIsEdit(false);
    setEditId(null);
  };

  const handleDelete = async (petId) => {
    try {
      await axiosinstance.delete(`/matingpets/${petId}`);
      fetchPets();
    } catch (err) {
      console.error(err);
    }
  };

  const startEdit = (pet) => {
    setIsEdit(true);
    setEditId(pet._id);
    setShowForm(true);
    setForm({
      category: pet.category,
      breedName: pet.breedName,
      gender: pet.gender,
      petQuality: pet.petQuality,
      age: pet.age,
      availability: pet.availability,
      location: pet.location,
      breederName: pet.breederName,
      phoneNum: pet.phoneNum,
      price: pet.price,
      photosAndVideos: pet.photosAndVideos.join(', ')
    });
  };

  useEffect(() => {
    fetchPets();
  }, []);

  return (
    <div className="p-6 relative">
      <h2 className="text-2xl font-bold mb-4">Mating Pets</h2>

      <div className="flex justify-end mb-4">
        <button
          onClick={() => {
            setShowForm(!showForm);
            if (isEdit) resetForm();
          }}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          {showForm ? "Cancel" : "+ Add Pet"}
        </button>
      </div>

      {showForm && (
        <div className="absolute top-16 left-1/2 transform -translate-x-1/2 bg-white shadow-lg p-6 rounded z-10 w-full max-w-2xl">
          <h3 className="text-xl font-semibold mb-2">{isEdit ? "Edit Pet" : "Add New Mating Pet"}</h3>
          <form
            onSubmit={isEdit ? handleEdit : handleAdd}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {[
              { name: "category", label: "Category" },
              { name: "breedName", label: "Breed Name" },
              { name: "petQuality", label: "Pet Quality" },
              { name: "age", label: "Age (months)", type: "number" },
              { name: "price", label: "Price", type: "number" },
              { name: "location", label: "Location" },
              { name: "breederName", label: "Breeder Name" },
              { name: "phoneNum", label: "Phone Number" },
              {
                name: "photosAndVideos",
                label: "Image URLs (comma-separated)",
              }
            ].map(({ name, label, type = "text" }) => (
              <div key={name}>
                <label className="block mb-1">{label}</label>
                <input
                  type={type}
                  name={name}
                  value={form[name]}
                  onChange={handleChange}
                  className="w-full border px-3 py-1 rounded"
                  required
                />
              </div>
            ))}

            <div>
              <label className="block mb-1">Gender</label>
              <select name="gender" value={form.gender} onChange={handleChange} className="w-full border px-3 py-1 rounded">
                <option>Male</option>
                <option>Female</option>
              </select>
            </div>

            <div>
              <label className="block mb-1">Availability</label>
              <select name="availability" value={form.availability} onChange={handleChange} className="w-full border px-3 py-1 rounded">
                <option>available</option>
                <option>unavailable</option>
              </select>
            </div>

            <div className="md:col-span-2 flex justify-end">
              <button
                type="button"
                onClick={resetForm}
                className="mr-2 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Close
              </button>
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
              >
                {isEdit ? "Update Pet" : "Add Pet"}
              </button>
            </div>
          </form>
        </div>
      )}

      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="w-full table-auto border border-gray-300 mb-6">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-2 border">Breed</th>
              <th className="p-2 border">Category</th>
              <th className="p-2 border">Gender</th>
              <th className="p-2 border">Age</th>
              <th className="p-2 border">Quality</th>
              <th className="p-2 border">Location</th>
              <th className="p-2 border">Availability</th>
              <th className="p-2 border">Price</th>
              <th className="p-2 border">Breeder</th>
              <th className="p-2 border">Phone</th>
              <th className="p-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {pets.map(pet => (
              <tr key={pet._id} className="text-center">
                <td className="p-2 border">{pet.breedName}</td>
                <td className="p-2 border">{pet.category}</td>
                <td className="p-2 border">{pet.gender}</td>
                <td className="p-2 border">{pet.age}</td>
                <td className="p-2 border">{pet.petQuality}</td>
                <td className="p-2 border">{pet.location}</td>
                <td className={`p-2 border ${pet.availability === 'available' ? 'text-green-600' : 'text-red-600'}`}>{pet.availability}</td>
                <td className="p-2 border">₹{pet.price}</td>
                <td className="p-2 border">{pet.breederName}</td>
                <td className="p-2 border">{pet.phoneNum}</td>
                <td className="p-2 border space-x-2">
                  <button
                    onClick={() => startEdit(pet)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      if (window.confirm("Are you sure you want to delete this pet?")) {
                        handleDelete(pet._id);
                      }
                    }}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MatingPetsManager;
