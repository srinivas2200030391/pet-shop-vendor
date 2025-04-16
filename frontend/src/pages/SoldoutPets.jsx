// src/pages/SoldoutPets.jsx
import { useState, useEffect } from "react";
import { DataTable } from "../components/DataTable";
import { PetForm } from "../components/PetForm";
import { ConfirmationModal } from "../components/ConfirmationModel";
import { Plus } from "lucide-react";
import axios from "axios";
import config from "../config";
export default function SoldoutPets() {
  const [pets, setPets] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingPet, setEditingPet] = useState(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [petToDelete, setPetToDelete] = useState(null);
  const [loading, setLoading] = useState(true);

  const columns = [
    {
      header: "Image",
      accessor: "imageUrl",
      render: (row) => (
        <div className="h-12 w-12 rounded-full overflow-hidden">
          {row.imageUrl ? (
            <img
              src={row.imageUrl}
              alt={row.name}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="h-full w-full bg-gray-200 flex items-center justify-center text-gray-500">
              No image
            </div>
          )}
        </div>
      ),
    },
    { header: "Name", accessor: "name" },
    { header: "Category", accessor: "category" },
    { header: "Breed", accessor: "breed" },
    { header: "Age", accessor: "age" },
    { header: "Gender", accessor: "gender" },
    {
      header: "Price",
      accessor: "price",
      render: (row) => `$${parseFloat(row.price).toFixed(2)}`,
    },
    { header: "Status", accessor: "status" },
  ];

  useEffect(() => {
    fetchPets();
  }, []);

  const getUnAvailablePets = async () => {
    try {
      const response = await axios.get(
        `${config.baseURL}/api/aboutpet/getallaboutpet`
      );
      // set pets only if status is "Available"
      const UnavailablePets = response.data.filter(
        (pet) => pet.status === "UnAvailable"
      );
      return UnavailablePets;
    } catch (error) {
      console.error("Error fetching pets:", error);
      return [];
    }
  };
  const fetchPets = async () => {
    setLoading(true);
    try {
      const data = await getUnAvailablePets();
      setPets(data);
    } catch (error) {
      console.error("Error fetching pets:", error);
    } finally {
      setLoading(false);
    }
  };

 

  const handleEditPet = (pet) => {
    setEditingPet(pet);
  };

  const updatePet = async (pet) => {
    try {
      const response = await axios.put(
        `${config.baseURL}/api/aboutpet/updateaboutpet/${pet._id}`,
        pet
      );
      console.log("Pet updated:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error updating pet:", error);
      throw error;
    }
  };
  const handleUpdatePet = async (updatedPet) => {
    try {
      console.log("Updating pet:", updatedPet);
      await updatePet(updatedPet);
      fetchPets();
      setEditingPet(null);
    } catch (error) {
      console.error("Error updating pet:", error);
    }
  };

  const confirmDelete = (pet) => {
    setPetToDelete(pet);
    setShowDeleteConfirmation(true);
  };

  const deletePet = async (petId) => {
    try {
      const response = await axios.delete(
        `${config.baseURL}/api/aboutpet/deleteaboutpet/${petId}`
      );
      console.log("Pet deleted:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error deleting pet:", error);
    }
  };
  const handleDeletePet = async () => {
    try {
      await deletePet(petToDelete._id);
      fetchPets();
      setShowDeleteConfirmation(false);
      setPetToDelete(null);
    } catch (error) {
      console.error("Error deleting pet:", error);
    }
  };

  const handleStatusChange = async (pet, newStatus) => {
    try {
      await updatePet({ ...pet, status: newStatus });
      fetchPets();
    } catch (error) {
      console.error("Error updating pet status:", error);
    }
  };

  return (
    <div>
     

      {loading ? (
        <div className="flex justify-center my-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <DataTable
          data={pets}
          columns={columns}
          actions={true}
          onEdit={handleEditPet}
          onDelete={confirmDelete}
          onStatusChange={handleStatusChange}
        />
      )}

      {editingPet && (
        <PetForm
          pet={editingPet}
          onSave={handleUpdatePet}
          onCancel={() => setEditingPet(null)}
        />
      )}

      {showDeleteConfirmation && (
        <ConfirmationModal
          message={`Are you sure you want to delete ${petToDelete.name}?`}
          onConfirm={handleDeletePet}
          onCancel={() => setShowDeleteConfirmation(false)}
        />
      )}
    </div>
  );
}
