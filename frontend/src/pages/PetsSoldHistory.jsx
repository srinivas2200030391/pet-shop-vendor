// src/pages/PetsSoldHistory.jsx
import { useState, useEffect } from "react";
import { DataTable } from "../components/DataTable";
import { getPetsSoldHistory } from "../services/petService";

export default function PetsSoldHistory() {
  const [salesHistory, setSalesHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  const columns = [
    { header: "Order ID", accessor: "orderId" },
    { header: "Pet Name", accessor: "petName" },
    { header: "Customer Name", accessor: "customerName" },
    {
      header: "Sale Date",
      accessor: "saleDate",
      render: (row) => new Date(row.saleDate).toLocaleDateString(),
    },
    {
      header: "Sale Price",
      accessor: "salePrice",
      render: (row) => `$${parseFloat(row.salePrice).toFixed(2)}`,
    },
    { header: "Payment Method", accessor: "paymentMethod" },
    { header: "Status", accessor: "status" },
  ];

  useEffect(() => {
    fetchSalesHistory();
  }, []);

  const fetchSalesHistory = async () => {
    setLoading(true);
    try {
      const data = await getPetsSoldHistory();
      setSalesHistory(data);
    } catch (error) {
      console.error("Error fetching sales history:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Pets Sold History</h1>
      </div>

      {loading ? (
        <div className="flex justify-center my-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <DataTable data={salesHistory} columns={columns} actions={false} />
      )}
    </div>
  );
}
