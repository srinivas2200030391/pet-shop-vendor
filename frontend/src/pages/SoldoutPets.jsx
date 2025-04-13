import { useState, useEffect } from "react";
import { DataTable } from "../components/DataTable";
import { getSoldoutPets } from "../services/petService";

export default function SoldoutPets() {
  const [pets, setPets] = useState([]);
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
    { header: "Type", accessor: "type" },
    { header: "Breed", accessor: "breed" },
    {
      header: "Sale Price",
      accessor: "price",
      render: (row) => `$${parseFloat(row.price).toFixed(2)}`,
    },
    {
      header: "Sold Date",
      accessor: "soldDate",
      render: (row) => new Date(row.soldDate).toLocaleDateString(),
    },
  ];

  useEffect(() => {
    fetchSoldoutPets();
  }, []);

  const fetchSoldoutPets = async () => {
    setLoading(true);
    try {
      const data = await getSoldoutPets();
      setPets(data);
    } catch (error) {
      console.error("Error fetching soldout pets:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Soldout Pets</h1>
      </div>

      {loading ? (
        <div className="flex justify-center my-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <DataTable data={pets} columns={columns} actions={false} />
      )}
    </div>
  );
}
