import { useState } from "react";
import { Search, Filter } from "lucide-react";

export function DataTable({
  data,
  columns,
  actions,
  onEdit,
  onDelete,
  onStatusChange,
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({});
  const [showFilters, setShowFilters] = useState(false);

  // Apply filters and search
  const filteredData = data.filter((item) => {
    // Apply search
    if (searchTerm) {
      const searchCheck = columns.some((column) =>
        String(item[column.accessor])
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      );
      if (!searchCheck) return false;
    }

    // Apply filters
    for (const key in filters) {
      if (filters[key] && item[key] !== filters[key]) {
        return false;
      }
    }

    return true;
  });

  const handleFilterChange = (key, value) => {
    setFilters({
      ...filters,
      [key]: value,
    });
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-4 border-b flex justify-between items-center">
        <div className="flex space-x-2">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search
              className="absolute left-3 top-2.5 text-gray-400"
              size={18}
            />
          </div>
          <button
            className="flex items-center px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-md"
            onClick={() => setShowFilters(!showFilters)}>
            <Filter size={18} className="mr-1" />
            Filters
          </button>
        </div>
      </div>

      {showFilters && (
        <div className="p-4 bg-gray-50 border-b grid grid-cols-3 gap-4">
          {columns.map((column) => (
            <div key={column.accessor} className="flex flex-col">
              <label className="text-sm text-gray-600">{column.header}</label>
              <select
                className="mt-1 p-2 border rounded-md"
                value={filters[column.accessor] || ""}
                onChange={(e) =>
                  handleFilterChange(column.accessor, e.target.value)
                }>
                <option value="">All</option>
                {Array.from(
                  new Set(data.map((item) => item[column.accessor]))
                ).map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </select>
            </div>
          ))}
          <button
            className="col-span-3 mt-2 p-2 bg-gray-200 hover:bg-gray-300 rounded-md"
            onClick={() => setFilters({})}>
            Clear Filters
          </button>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50">
              {columns.map((column) => (
                <th
                  key={column.accessor}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {column.header}
                </th>
              ))}
              {actions && (
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredData.length > 0 ? (
              filteredData.map((row, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  {columns.map((column) => (
                    <td
                      key={column.accessor}
                      className="px-6 py-4 whitespace-nowrap">
                      {column.render
                        ? column.render(row)
                        : row[column.accessor]}
                    </td>
                  ))}
                  {actions && (
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => onEdit(row)}
                        className="text-indigo-600 hover:text-indigo-900 mr-3">
                        Edit
                      </button>
                      <button
                        onClick={() => onDelete(row)}
                        className="text-red-600 hover:text-red-900 mr-3">
                        Delete
                      </button>
                      {row.status === "available" && (
                        <button
                          onClick={() => onStatusChange(row, "soldout")}
                          className="text-green-600 hover:text-green-900">
                          Mark Sold
                        </button>
                      )}
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length + (actions ? 1 : 0)}
                  className="px-6 py-4 text-center text-gray-500">
                  No data found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
