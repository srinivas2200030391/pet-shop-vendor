import { useState } from "react";
import { X } from "lucide-react";

export function CageForm({ cage = {}, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    cageNumber: cage.cageNumber || "",
    dimensions: cage.dimensions || "",
    dailyRate: cage.dailyRate || "",
    imageUrl: cage.imageUrl || "",
    status: cage.status || "Available",
    availableFrom: cage.availableFrom
      ? new Date(cage.availableFrom).toISOString().split("T")[0]
      : "",
    availableTo: cage.availableTo
      ? new Date(cage.availableTo).toISOString().split("T")[0]
      : "",
    ...cage,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-3/4 max-w-2xl overflow-hidden">
        <div className="flex justify-between items-center p-4 bg-blue-600 text-white">
          <h2 className="text-xl font-bold">
            {cage.cageNumber ? "Edit Cage" : "Add New Cage"}
          </h2>
          <button onClick={onCancel} className="text-white">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Cage Number
              </label>
              <input
                type="text"
                name="cageNumber"
                value={formData.cageNumber}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Dimensions (WxDxH in inches)
              </label>
              <input
                type="text"
                name="dimensions"
                value={formData.dimensions}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
                required
                placeholder="e.g. 24x36x48"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Daily Rate ($)
              </label>
              <input
                type="number"
                name="dailyRate"
                value={formData.dailyRate}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
                required
                step="0.01"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
                required>
                <option value="Available">Available</option>
                <option value="Occupied">Occupied</option>
                <option value="Maintenance">Maintenance</option>
                <option value="ExtensionRequired">Extension Required</option>
                <option value="Pending">Pending</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Available From
              </label>
              <input
                type="date"
                name="availableFrom"
                value={formData.availableFrom}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Available To
              </label>
              <input
                type="date"
                name="availableTo"
                value={formData.availableTo}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
              />
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Image URL
              </label>
              <input
                type="text"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
                placeholder="Image URL of the cage"
              />
            </div>
          </div>

          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              {cage.cageNumber ? "Update Cage" : "Add Cage"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
