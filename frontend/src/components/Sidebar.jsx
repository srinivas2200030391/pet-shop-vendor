import { Home, ShoppingBag, Heart, History, Hotel } from "lucide-react";

export function Sidebar({ activeTab, setActiveTab }) {
  const menuItems = [
    { id: "available-pets", label: "Available Pets", icon: <Home size={20} /> },
    {
      id: "soldout-pets",
      label: "Soldout Pets",
      icon: <ShoppingBag size={20} />,
    },
    { id: "pet-mating", label: "Pet Mating", icon: <Heart size={20} /> },
    {
      id: "pets-sold-history",
      label: "Pets Sold History",
      icon: <History size={20} />,
    },
    { id: "boarding-shop", label: "Boarding Shop", icon: <Hotel size={20} /> },
  ];

  return (
    <div className="w-64 bg-white shadow-md">
      <div className="p-4 bg-blue-600 text-white">
        <h2 className="text-xl font-bold">Pet Shop Vendor</h2>
      </div>
      <nav className="mt-6">
        <ul>
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center w-full px-4 py-3 text-left ${
                  activeTab === item.id
                    ? "bg-blue-100 text-blue-600 border-l-4 border-blue-600"
                    : "text-gray-600 hover:bg-gray-100"
                }`}>
                <span className="mr-3">{item.icon}</span>
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
