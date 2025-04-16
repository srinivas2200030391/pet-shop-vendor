import { useState, useEffect } from "react";
import { DataTable } from "../components/DataTable";
import { getBoardingHistory } from "../services/petService.js";
import { Plus } from "lucide-react";
import { CageForm } from "../components/CageForm";
import { ConfirmationModal } from "./../components/ConfirmationModel";
import axios from "axios";
import config from "./../config";

export default function BoardingShop() {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [cages, setCages] = useState([]);
  const [requests, setRequests] = useState([]);
  const [history, setHistory] = useState([]);
  const [extension, setExtension] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddCageForm, setShowAddCageForm] = useState(false);
  const [editingCage, setEditingCage] = useState(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [cageToDelete, setCageToDelete] = useState(null);

  const cageColumns = [
    { header: "Cage ID", accessor: "cageId" },
    {
      header: "Image",
      accessor: "imageUrl",
      render: (row) => (
        <div className="h-12 w-12 rounded overflow-hidden">
          {row.imageUrl ? (
            <img
              src={row.imageUrl}
              alt={`Cage ${row.cageId}`}
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
    { header: "Dimensions", accessor: "dimensions" },
    {
      header: "Daily Rate",
      accessor: "dailyRate",
      render: (row) => `$${parseFloat(row.dailyRate).toFixed(2)}`,
    },
    { header: "Status", accessor: "status" },
    {
      header: "Available From",
      accessor: "availableFrom",
      render: (row) =>
        row.availableFrom
          ? new Date(row.availableFrom).toLocaleDateString()
          : "Now",
    },
    {
      header: "Available To",
      accessor: "availableTo",
      render: (row) =>
        row.availableTo
          ? new Date(row.availableTo).toLocaleDateString()
          : "Indefinite",
    },
  ];

  const requestColumns = [
    { header: "Request ID", accessor: "requestId" },
    { header: "Customer", accessor: "customerName" },
    { header: "Pet Name", accessor: "petName" },
    { header: "Pet Type", accessor: "petType" },
    {
      header: "Start Date",
      accessor: "startDate",
      render: (row) => new Date(row.startDate).toLocaleDateString(),
    },
    {
      header: "End Date",
      accessor: "endDate",
      render: (row) => new Date(row.endDate).toLocaleDateString(),
    },
    {
      header: "Total Cost",
      accessor: "totalCost",
      render: (row) => `$${parseFloat(row.totalCost).toFixed(2)}`,
    },
    { header: "Status", accessor: "status" },
  ];
  const extendColumns = [
    { header: "Boarding Request ID", accessor: "boardingRequest" },
    {
      header: "Requested End Date",
      accessor: "requestedEndDate",
      render: (row) => new Date(row.requestedEndDate).toLocaleDateString(),
    },
    { header: "Reason", accessor: "reason" },
    { header: "Status", accessor: "status" },
    {
      header: "Requested At",
      accessor: "requestedAt",
      render: (row) => new Date(row.requestedAt).toLocaleString(),
    },
  ];

  const historyColumns = [
    { header: "Boarding ID", accessor: "boardingId" },
    { header: "Customer", accessor: "customerName" },
    { header: "Pet Name", accessor: "petName" },
    { header: "Cage ID", accessor: "cageId" },
    {
      header: "Check-in Date",
      accessor: "checkInDate",
      render: (row) => new Date(row.checkInDate).toLocaleDateString(),
    },
    {
      header: "Check-out Date",
      accessor: "checkOutDate",
      render: (row) => new Date(row.checkOutDate).toLocaleDateString(),
    },
    { header: "Duration (days)", accessor: "durationDays" },
    {
      header: "Total Cost",
      accessor: "totalCost",
      render: (row) => `$${parseFloat(row.totalCost).toFixed(2)}`,
    },
  ];

  useEffect(() => {
    fetchData();
  }, []);

  const getBoardingCages = async () => {
    const response = await axios.get(`${config.baseURL}/api/cages`);

    return response.data;
  };
  const getBoardingRequests = async () => {
    const response = await axios.get(`${config.baseURL}/api/boardingrequests`);
    return response.data;
  };
  const getBoardingExtensionRequests = async () => {
    const response = await axios.get(`${config.baseURL}/api/extensions`);
    return response.data;
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const [cagesData, requestsData, historyData, extension] =
        await Promise.all([
          getBoardingCages(),
          getBoardingRequests(),
          getBoardingHistory(),
          getBoardingExtensionRequests(),
        ]);
      setCages(cagesData);
      console.log("cagesData", cagesData);
      setRequests(requestsData);
      setHistory(historyData);
      setExtension(extension);
    } catch (error) {
      console.error("Error fetching boarding data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddCage = async (cage) => {
    try {
      const response = await axios.post(`${config.baseURL}/api/cages`, cage);
      if (response.status !== 201) {
        throw new Error("Failed to add cage");
      }
      console.log("Adding cage:", cage);
      // Refresh data
      fetchData();
      setShowAddCageForm(false);
    } catch (error) {
      console.error("Error adding cage:", error);
    }
  };

  const handleEditCage = (cage) => {
    setEditingCage(cage);
  };

  const handleUpdateCage = async (updatedCage) => {
    try {
      // In a real app, this would call an API to update the cage
      const response = await axios.put(
        `${config.baseURL}/api/cages/${updatedCage._id}`,
        updatedCage
      );
      if (response.status !== 200) {
        throw new Error("Failed to update cage");
      }
      console.log("Updating cage:", updatedCage);
      // Refresh data
      fetchData();
      setEditingCage(null);
    } catch (error) {
      console.error("Error updating cage:", error);
    }
  };

  const confirmDeleteCage = (cage) => {
    setCageToDelete(cage);
    setShowDeleteConfirmation(true);
  };

  const handleDeleteCage = async () => {
    try {
      // In a real app, this would call an API to delete the cage
      const response = await axios.delete(
        `${config.baseURL}/api/cages/${cageToDelete._id}`
      );
      if (response.status !== 200) {
        throw new Error("Failed to delete cage");
      }
      console.log("Deleting cage:", cageToDelete);
      // Refresh data
      fetchData();
      setShowDeleteConfirmation(false);
      setCageToDelete(null);
    } catch (error) {
      console.error("Error deleting cage:", error);
    }
  };

  const handleApproveRequest = async (request) => {
    try {
      console.log(request._id);

      const response = await axios.put(
        `${config.baseURL}/api/boardingrequests/${request._id}`,
        { status: "Approved" }
      );
      if (response.status !== 200) {
        throw new Error("Failed to approve request");
      }
      console.log("Approving request:", request);
      // Refresh data
      fetchData();
    } catch (error) {
      console.error("Error approving request:", error);
    }
  };

  const handleDenyRequest = async (request) => {
    try {
      console.log(request._id);

      const response = await axios.put(
        `${config.baseURL}/api/boardingrequests/${request._id}`,
        { status: "Rejected" }
      );
      if (response.status !== 200) {
        throw new Error("Failed to approve request");
      }
      console.log("Denying request:", request);
      // Refresh data
      fetchData();
    } catch (error) {
      console.error("Error denying request:", error);
    }
  };
  const handleDenyExtensionRequest = async (request) => {
    try {
      console.log(request._id);

      const response = await axios.delete(
        `${config.baseURL}/api/extensions/${request._id}`
      );
      if (response.status !== 200) {
        throw new Error("Failed to approve request");
      }
      console.log("Denying request:", request);
      // Refresh data
      fetchData();
    } catch (error) {
      console.error("Error denying request:", error);
    }
  };

  const handleExtendBoardingRequest = async (request) => {
    try {
      // In a real app, this would call an API to handle the extension request
      const response = await axios.put(
        `${config.baseURL}/api/extensions/${request._id}`,
        { status: "Approved" }
      );
      if (response.status !== 200) {
        throw new Error("Failed to handle extension request");
      }

      console.log("Handling extension request:", request);
      // Refresh data
      fetchData();
    } catch (error) {
      console.error("Error handling extension request:", error);
    }
  };

  const tabs = [
    {
      name: "Available Cages",
      count: cages.filter((c) => c.status === "Available").length,
    },
    {
      name: "Booked Cages",
      count: cages.filter((c) => c.status === "Occupied").length,
    },
    {
      name: "Approved Boarding Requests",
      count: requests.filter((r) => r.status === "Approved").length,
    },
    {
      name: "Boarding Requests",
      count: requests.filter((r) => r.status === "Pending").length,
    },
    {
      name: "Extension Requests",
      count: extension.length,
    },
    { name: "Boarding History", count: history.length },
  ];

  const renderTabContent = () => {
    if (loading) {
      return (
        <div className="flex justify-center my-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      );
    }

    switch (activeTabIndex) {
      case 0: // Available Cages
        return (
          <>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Available Cages</h2>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
                onClick={() => setShowAddCageForm(true)}>
                <Plus size={18} className="mr-2" />
                Add Cage
              </button>
            </div>
            <DataTable
              data={cages.filter((cage) => cage.status === "Available")}
              columns={cageColumns}
              actions={true}
              onEdit={handleEditCage}
              onDelete={confirmDeleteCage}
            />
          </>
        );
      case 1: // Booked Cages
        return (
          <>
            <div className="mb-6">
              <h2 className="text-xl font-semibold">Booked Cages</h2>
            </div>
            <DataTable
              data={cages.filter((cage) => cage.status === "Occupied")}
              columns={cageColumns}
              actions={true}
              onEdit={handleEditCage}
              onDelete={confirmDeleteCage}
            />
          </>
        );
      case 2: // Approved Boarding Requests
        return (
          <>
            <div className="mb-6">
              <h2 className="text-xl font-semibold">
                Approved Boarding Requests
              </h2>
            </div>
            <DataTable
              data={requests.filter((req) => req.status === "Approved")}
              columns={requestColumns}
              //actions={true}
              // actionButtons={[
              //   {
              //     label: "Approve",
              //     onClick: handleApproveRequest,
              //     className: "text-green-600 hover:text-green-900",
              //   },
              //   {
              //     label: "Deny",
              //     onClick: handleDenyRequest,
              //     className: "text-red-600 hover:text-red-900",
              //   },
              // ]}
            />
          </>
        );

      case 3: // Boarding Requests
        return (
          <>
            <div className="mb-6">
              <h2 className="text-xl font-semibold">
                Pending Boarding Requests
              </h2>
            </div>
            <DataTable
              data={requests.filter((req) => req.status === "Pending")}
              columns={requestColumns}
              actions={true}
              actionButtons={[
                {
                  label: "Approve",
                  onClick: handleApproveRequest,
                  className: "text-green-600 hover:text-green-900",
                },
                {
                  label: "Deny",
                  onClick: handleDenyRequest,
                  className: "text-red-600 hover:text-red-900",
                },
              ]}
            />
          </>
        );

      case 4: // Extension Requests
        return (
          <>
            <div className="mb-6">
              <h2 className="text-xl font-semibold">Extension Requests</h2>
            </div>
            <DataTable
              data={extension}
              columns={extendColumns}
              actions={true}
              actionButtons={[
                {
                  label: "Approve",
                  onClick: handleExtendBoardingRequest,
                  className: "text-green-600 hover:text-green-900",
                },
                {
                  label: "Deny",
                  onClick: handleDenyExtensionRequest,
                  className: "text-red-600 hover:text-red-900",
                },
              ]}
            />
          </>
        );
      case 5: // Boarding History
        return (
          <>
            <div className="mb-6">
              <h2 className="text-xl font-semibold">Boarding History</h2>
            </div>
            <DataTable
              data={history}
              columns={historyColumns}
              actions={false}
            />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Boarding Shop</h1>
      </div>

      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            {tabs.map((tab, index) => (
              <button
                key={tab.name}
                className={`py-4 px-6 font-medium text-sm border-b-2 ${
                  activeTabIndex === index
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
                onClick={() => setActiveTabIndex(index)}>
                {tab.name}
                {tab.count > 0 && (
                  <span
                    className={`ml-2 py-0.5 px-2 rounded-full text-xs ${
                      activeTabIndex === index
                        ? "bg-blue-100 text-blue-600"
                        : "bg-gray-100 text-gray-600"
                    }`}>
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {renderTabContent()}

      {showAddCageForm && (
        <CageForm
          onSave={handleAddCage}
          onCancel={() => setShowAddCageForm(false)}
        />
      )}

      {editingCage && (
        <CageForm
          cage={editingCage}
          onSave={handleUpdateCage}
          onCancel={() => setEditingCage(null)}
        />
      )}

      {showDeleteConfirmation && (
        <ConfirmationModal
          message={`Are you sure you want to delete cage ${cageToDelete.cageId}?`}
          onConfirm={handleDeleteCage}
          onCancel={() => setShowDeleteConfirmation(false)}
        />
      )}
    </div>
  );
}
