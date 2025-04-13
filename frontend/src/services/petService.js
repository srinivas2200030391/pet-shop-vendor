// src/services/petService.js
// For demo purposes, we'll use mock data
// In a real application, these functions would make API calls

// Mock data
const mockPets = [
  {
    id: "1",
    name: "Buddy",
    type: "Dog",
    breed: "Golden Retriever",
    age: "2 years",
    gender: "Male",
    color: "Golden",
    weight: "30",
    price: "800",
    description: "Friendly and active Golden Retriever",
    imageUrl: "/api/placeholder/100/100",
    status: "available",
    addedDate: "2025-03-10T00:00:00.000Z",
  },
  {
    id: "2",
    name: "Luna",
    type: "Cat",
    breed: "Siamese",
    age: "1 year",
    gender: "Female",
    color: "Cream & Brown",
    weight: "4.5",
    price: "600",
    description: "Playful Siamese kitten with blue eyes",
    imageUrl: "/api/placeholder/100/100",
    status: "available",
    addedDate: "2025-02-20T00:00:00.000Z",
  },
  {
    id: "3",
    name: "Rocky",
    type: "Dog",
    breed: "German Shepherd",
    age: "3 years",
    gender: "Male",
    color: "Black & Tan",
    weight: "35",
    price: "950",
    description: "Well-trained German Shepherd with great temperament",
    imageUrl: "/api/placeholder/100/100",
    status: "soldout",
    addedDate: "2025-01-15T00:00:00.000Z",
    soldDate: "2025-03-01T00:00:00.000Z",
  },
  {
    id: "4",
    name: "Bella",
    type: "Dog",
    breed: "Poodle",
    age: "1.5 years",
    gender: "Female",
    color: "White",
    weight: "12",
    price: "750",
    description: "Cute and well-behaved miniature poodle",
    imageUrl: "/api/placeholder/100/100",
    status: "soldout",
    addedDate: "2025-01-30T00:00:00.000Z",
    soldDate: "2025-02-25T00:00:00.000Z",
  },
];

const mockMatingRecords = [
  {
    id: "1",
    malePetId: "1",
    malePetName: "Max",
    femalePetId: "2",
    femalePetName: "Daisy",
    matingDate: "2025-02-10T00:00:00.000Z",
    expectedBirthDate: "2025-04-10T00:00:00.000Z",
    status: "In Progress",
    notes: "Both pets are healthy, expecting a successful mating",
  },
  {
    id: "2",
    malePetId: "5",
    malePetName: "Charlie",
    femalePetId: "6",
    femalePetName: "Molly",
    matingDate: "2025-01-15T00:00:00.000Z",
    expectedBirthDate: "2025-03-15T00:00:00.000Z",
    status: "Completed",
    notes: "6 healthy puppies born on March 14th",
  },
];

const mockSalesHistory = [
  {
    orderId: "ORD-001",
    petId: "3",
    petName: "Rocky",
    customerName: "John Smith",
    customerEmail: "john.smith@example.com",
    customerPhone: "555-123-4567",
    saleDate: "2025-03-01T00:00:00.000Z",
    salePrice: "950",
    paymentMethod: "Credit Card",
    status: "Completed",
  },
  {
    orderId: "ORD-002",
    petId: "4",
    petName: "Bella",
    customerName: "Emma Johnson",
    customerEmail: "emma.j@example.com",
    customerPhone: "555-987-6543",
    saleDate: "2025-02-25T00:00:00.000Z",
    salePrice: "750",
    paymentMethod: "Cash",
    status: "Completed",
  },
];

// Service functions
export const getAvailablePets = async () => {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 500));
  return mockPets.filter((pet) => pet.status === "available");
};

export const getSoldoutPets = async () => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return mockPets.filter((pet) => pet.status === "soldout");
};

export const getPetMatingRecords = async () => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return mockMatingRecords;
};

export const getPetsSoldHistory = async () => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return mockSalesHistory;
};

export const addPet = async (pet) => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const newPet = {
    ...pet,
    id: (Math.max(...mockPets.map((p) => parseInt(p.id))) + 1).toString(),
    addedDate: new Date().toISOString(),
  };
  mockPets.push(newPet);
  return newPet;
};

export const updatePet = async (updatedPet) => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const index = mockPets.findIndex((pet) => pet.id === updatedPet.id);
  if (index !== -1) {
    // If status changed to soldout, add soldDate
    if (
      updatedPet.status === "soldout" &&
      mockPets[index].status !== "soldout"
    ) {
      updatedPet.soldDate = new Date().toISOString();
    }
    mockPets[index] = { ...mockPets[index], ...updatedPet };
    return mockPets[index];
  }
  throw new Error("Pet not found");
};

export const deletePet = async (id) => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const index = mockPets.findIndex((pet) => pet.id === id);
  if (index !== -1) {
    mockPets.splice(index, 1);
    return true;
  }
  throw new Error("Pet not found");
};

// src/services/boardingService.js
// Mock data for boarding services

const mockCages = [
  {
    cageId: "C001",
    dimensions: "24x36x48",
    dailyRate: "35",
    status: "available",
    imageUrl: "/api/placeholder/100/100",
    availableFrom: null,
    availableTo: null,
  },
  {
    cageId: "C002",
    dimensions: "36x48x60",
    dailyRate: "50",
    status: "booked",
    imageUrl: "/api/placeholder/100/100",
    availableFrom: "2025-04-20T00:00:00.000Z",
    availableTo: null,
  },
  {
    cageId: "C003",
    dimensions: "18x24x36",
    dailyRate: "25",
    status: "available",
    imageUrl: "/api/placeholder/100/100",
    availableFrom: null,
    availableTo: null,
  },
  {
    cageId: "C004",
    dimensions: "48x72x60",
    dailyRate: "65",
    status: "maintenance",
    imageUrl: "/api/placeholder/100/100",
    availableFrom: "2025-04-25T00:00:00.000Z",
    availableTo: null,
  },
];

const mockBoardingRequests = [
  {
    requestId: "REQ001",
    customerId: "CUST001",
    customerName: "Robert Anderson",
    petName: "Max",
    petType: "Dog",
    startDate: "2025-04-15T00:00:00.000Z",
    endDate: "2025-04-22T00:00:00.000Z",
    preferredCageSize: "Medium",
    totalCost: "245",
    status: "pending",
    requestDate: "2025-04-01T00:00:00.000Z",
  },
  {
    requestId: "REQ002",
    customerId: "CUST002",
    customerName: "Lisa Wong",
    petName: "Mittens",
    petType: "Cat",
    startDate: "2025-04-10T00:00:00.000Z",
    endDate: "2025-04-15T00:00:00.000Z",
    preferredCageSize: "Small",
    totalCost: "125",
    status: "approved",
    requestDate: "2025-03-25T00:00:00.000Z",
  },
  {
    requestId: "REQ003",
    customerId: "CUST003",
    customerName: "Kevin Martinez",
    petName: "Buddy",
    petType: "Dog",
    startDate: "2025-04-05T00:00:00.000Z",
    endDate: "2025-04-12T00:00:00.000Z",
    newEndDate: "2025-04-19T00:00:00.000Z",
    preferredCageSize: "Large",
    totalCost: "455",
    additionalCost: "455",
    status: "extension_requested",
    requestDate: "2025-03-20T00:00:00.000Z",
    extensionRequestDate: "2025-04-10T00:00:00.000Z",
  },
];

const mockBoardingHistory = [
  {
    boardingId: "BRD001",
    customerId: "CUST004",
    customerName: "Sarah Johnson",
    petName: "Coco",
    petType: "Dog",
    cageId: "C002",
    checkInDate: "2025-03-01T00:00:00.000Z",
    checkOutDate: "2025-03-10T00:00:00.000Z",
    durationDays: 9,
    dailyRate: "50",
    totalCost: "450",
    paymentStatus: "Paid",
  },
  {
    boardingId: "BRD002",
    customerId: "CUST005",
    customerName: "Michael Brown",
    petName: "Whiskers",
    petType: "Cat",
    cageId: "C003",
    checkInDate: "2025-03-05T00:00:00.000Z",
    checkOutDate: "2025-03-15T00:00:00.000Z",
    durationDays: 10,
    dailyRate: "25",
    totalCost: "250",
    paymentStatus: "Paid",
  },
  {
    boardingId: "BRD003",
    customerId: "CUST002",
    customerName: "Lisa Wong",
    petName: "Mittens",
    petType: "Cat",
    cageId: "C001",
    checkInDate: "2025-03-20T00:00:00.000Z",
    checkOutDate: "2025-03-27T00:00:00.000Z",
    durationDays: 7,
    dailyRate: "35",
    totalCost: "245",
    paymentStatus: "Paid",
  },
];

// Service functions for boarding
export const getAvailableCages = async () => {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 500));
  return mockCages.filter((cage) => cage.status === "available");
};

export const getAllCages = async () => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return mockCages;
};

export const getCage = async (cageId) => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const cage = mockCages.find((cage) => cage.cageId === cageId);
  if (!cage) {
    throw new Error("Cage not found");
  }
  return cage;
};

export const updateCageStatus = async (
  cageId,
  status,
  availableFrom = null,
  availableTo = null
) => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const index = mockCages.findIndex((cage) => cage.cageId === cageId);
  if (index !== -1) {
    mockCages[index] = {
      ...mockCages[index],
      status,
      availableFrom,
      availableTo,
    };
    return mockCages[index];
  }
  throw new Error("Cage not found");
};

export const getBoardingRequests = async (status = null) => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  if (status) {
    return mockBoardingRequests.filter((req) => req.status === status);
  }
  return mockBoardingRequests;
};

export const getBoardingHistory = async () => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return mockBoardingHistory;
};

export const createBoardingRequest = async (request) => {
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Calculate total cost based on duration and cage size preference
  const dailyRate =
    request.preferredCageSize === "Small"
      ? 25
      : request.preferredCageSize === "Medium"
      ? 35
      : 50;

  const startDate = new Date(request.startDate);
  const endDate = new Date(request.endDate);
  const durationDays = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));

  const newRequest = {
    ...request,
    requestId: "REQ" + String(mockBoardingRequests.length + 1).padStart(3, "0"),
    totalCost: String(durationDays * dailyRate),
    status: "pending",
    requestDate: new Date().toISOString(),
  };

  mockBoardingRequests.push(newRequest);
  return newRequest;
};

export const updateBoardingRequest = async (requestId, updateData) => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const index = mockBoardingRequests.findIndex(
    (req) => req.requestId === requestId
  );

  if (index !== -1) {
    mockBoardingRequests[index] = {
      ...mockBoardingRequests[index],
      ...updateData,
    };
    return mockBoardingRequests[index];
  }
  throw new Error("Boarding request not found");
};

export const requestBoardingExtension = async (requestId, newEndDate) => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const index = mockBoardingRequests.findIndex(
    (req) => req.requestId === requestId
  );

  if (index !== -1) {
    const request = mockBoardingRequests[index];

    // Calculate additional cost
    const originalEndDate = new Date(request.endDate);
    const extendedEndDate = new Date(newEndDate);
    const additionalDays = Math.ceil(
      (extendedEndDate - originalEndDate) / (1000 * 60 * 60 * 24)
    );

    const dailyRate =
      request.preferredCageSize === "Small"
        ? 25
        : request.preferredCageSize === "Medium"
        ? 35
        : 50;

    const additionalCost = String(additionalDays * dailyRate);

    mockBoardingRequests[index] = {
      ...request,
      newEndDate,
      additionalCost,
      status: "extension_requested",
      extensionRequestDate: new Date().toISOString(),
    };

    return mockBoardingRequests[index];
  }
  throw new Error("Boarding request not found");
};

export const approveBoardingRequest = async (requestId, assignedCageId) => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const requestIndex = mockBoardingRequests.findIndex(
    (req) => req.requestId === requestId
  );

  if (requestIndex !== -1) {
    // Update request status
    mockBoardingRequests[requestIndex].status = "approved";
    mockBoardingRequests[requestIndex].cageId = assignedCageId;

    // Update cage status
    const cageIndex = mockCages.findIndex(
      (cage) => cage.cageId === assignedCageId
    );
    if (cageIndex !== -1) {
      mockCages[cageIndex].status = "booked";
      mockCages[cageIndex].availableFrom =
        mockBoardingRequests[requestIndex].endDate;
    }

    return mockBoardingRequests[requestIndex];
  }
  throw new Error("Boarding request not found");
};

export const completeBoardingStay = async (requestId) => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const requestIndex = mockBoardingRequests.findIndex(
    (req) => req.requestId === requestId
  );

  if (requestIndex !== -1) {
    const request = mockBoardingRequests[requestIndex];

    // Create history record
    const newHistoryEntry = {
      boardingId:
        "BRD" + String(mockBoardingHistory.length + 1).padStart(3, "0"),
      customerId: request.customerId,
      customerName: request.customerName,
      petName: request.petName,
      petType: request.petType,
      cageId: request.cageId,
      checkInDate: request.startDate,
      checkOutDate: request.newEndDate || request.endDate,
      durationDays: Math.ceil(
        (new Date(request.newEndDate || request.endDate) -
          new Date(request.startDate)) /
          (1000 * 60 * 60 * 24)
      ),
      dailyRate:
        request.preferredCageSize === "Small"
          ? "25"
          : request.preferredCageSize === "Medium"
          ? "35"
          : "50",
      totalCost: request.additionalCost
        ? String(Number(request.totalCost) + Number(request.additionalCost))
        : request.totalCost,
      paymentStatus: "Paid",
    };

    mockBoardingHistory.push(newHistoryEntry);

    // Free up the cage
    const cageIndex = mockCages.findIndex(
      (cage) => cage.cageId === request.cageId
    );
    if (cageIndex !== -1) {
      mockCages[cageIndex].status = "available";
      mockCages[cageIndex].availableFrom = null;
      mockCages[cageIndex].availableTo = null;
    }

    // Remove the request from active requests
    mockBoardingRequests.splice(requestIndex, 1);

    return newHistoryEntry;
  }
  throw new Error("Boarding request not found");
};
