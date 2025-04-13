import { useState, useEffect } from 'react';
import { DataTable } from '../components/DataTable';
import { getPetMatingRecords } from '../services/petService';

export default function PetMating() {
  const [matingRecords, setMatingRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  const columns = [
    { header: 'Male Pet', accessor: 'malePetName' },
    { header: 'Female Pet', accessor: 'femalePetName' },
    { header: 'Mating Date', accessor: 'matingDate', 
      render: (row) => new Date(row.matingDate).toLocaleDateString() },
    { header: 'Expected Birth Date', accessor: 'expectedBirthDate',
      render: (row) => row.expectedBirthDate ? new Date(row.expectedBirthDate).toLocaleDateString() : 'N/A' },
    { header: 'Status', accessor: 'status' },
    { header: 'Notes', accessor: 'notes' },
  ];

  useEffect(() => {
    fetchMatingRecords();
  }, []);

  const fetchMatingRecords = async () => {
    setLoading(true);
    try {
      const data = await getPetMatingRecords();
      setMatingRecords(data);
    } catch (error) {
      console.error('Error fetching mating records:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Pet Mating Records</h1>
      </div>

      {loading ? (
        <div className="flex justify-center my-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <DataTable 
          data={matingRecords}
          columns={columns}
          actions={false}
        />
      )}
    </div>
  );
}
