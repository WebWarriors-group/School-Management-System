import React, { useEffect, useState } from "react";
import { Student } from "@/types";
import { Edit, X, Users, Save } from "lucide-react";

interface Sibling {
  id: number;
  reg_no: string;
  sibling_name: string;
  relationship: string;
  sibling_age: number;
  occupation: string;
  contact: string;
}

interface ViewStudentProps {
  student: Student | null;
  isOpen: boolean;
  onClose: () => void;
}

const StudentSiblingView: React.FC<ViewStudentProps> = ({ student, isOpen, onClose }) => {
  const [siblingInfo, setSiblingInfo] = useState<Sibling[]>([]);
  const [editStates, setEditStates] = useState<{ [id: number]: boolean }>({});
  const [editData, setEditData] = useState<{ [id: number]: Sibling }>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen && student) {
      setLoading(true);
      setError(null);

      fetch(`/api/student-sibling/${student.reg_no}`)
        .then((res) => {
          if (!res.ok) throw new Error("Failed to fetch sibling info");
          return res.json();
        })
        .then((data: any[]) => {
          const parsed = data.map((s) => ({
            ...s,
            sibling_age: Number(s.sibling_age),
          })) as Sibling[];

          const initialEditData: { [id: number]: Sibling } = {};
          const initialEditStates: { [id: number]: boolean } = {};

          parsed.forEach((sibling) => {
            initialEditData[sibling.id] = { ...sibling };
            initialEditStates[sibling.id] = false;
          });

          setSiblingInfo(parsed);
          setEditData(initialEditData);
          setEditStates(initialEditStates);
          setLoading(false);
        })
        .catch((err) => {
          setError(err instanceof Error ? err.message : "Unknown error");
          setLoading(false);
        });
    } else {
      setSiblingInfo([]);
      setEditStates({});
      setEditData({});
      setError(null);
    }
  }, [isOpen, student]);

  const handleChange = (id: number, field: keyof Sibling, value: string | number) => {
    setEditData((prev) => ({
      ...prev,
      [id]: { ...prev[id], [field]: value },
    }));
  };

  const toggleEdit = (id: number) => {
    setEditStates((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSaveAll = async () => {
    if (!student) return;

    try {
      const updatedSiblings = Object.values(editData).map((s) => ({
        ...s,
        sibling_age: Number(s.sibling_age),
        reg_no: student.reg_no,
      }));

      const res = await fetch(`/api/student-sibling/${student.reg_no}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedSiblings),
      });

      const text = await res.text();
      console.log("Raw response text:", text);

      let result;
      try {
        result = JSON.parse(text);
      } catch (err) {
        throw new Error("Server returned non-JSON response");
      }

      if (!res.ok) {
        console.error("Backend error response:", result);
        throw new Error(result.message || "Failed to update siblings");
      }

      alert("Siblings updated successfully!");
      setSiblingInfo(result);
      setEditStates({});
    } catch (err) {
      alert(err instanceof Error ? err.message : "An error occurred.");
    }
  };

  const anyEditing = Object.values(editStates).some((val) => val);

  if (!isOpen || !student) return null;

  return (
   <div className="fixed inset-0 bg-gray-300 bg-opacity-50 flex items-center justify-center z-50 p-4">

      <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-6">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold">Sibling Information</h2>
              <p className="opacity-80 mt-1">
                Registration No: {student.reg_no}
              </p>
            </div>
            <button 
              onClick={onClose}
              className="text-white hover:bg-white/20 p-2 rounded-full"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="overflow-y-auto flex-grow p-6">
          {loading && (
            <div className="text-center py-10">
              <p className="text-gray-700">Loading sibling info...</p>
            </div>
          )}
          
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <p className="text-red-600">{error}</p>
            </div>
          )}

          {siblingInfo.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {siblingInfo.map((sibling, index) => {
                const isEditing = editStates[sibling.id];
                const data = editData[sibling.id];

                return (
                  <div key={sibling.id} className="bg-gray-50 rounded-xl border border-gray-200 p-5">
                    <div className="flex justify-between items-center mb-4 pb-3 border-b">
                      <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                        <span className="bg-purple-100 text-purple-800 p-1 rounded-lg">
                          <Users size={18} />
                        </span>
                        Sibling {index + 1}
                      </h3>
                      <button
                        onClick={() => toggleEdit(sibling.id)}
                        className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                        title={isEditing ? "Cancel editing" : "Edit sibling"}
                      >
                        <Edit size={16} />
                      </button>
                    </div>

                    <div className="space-y-4">
                      {[
                        { label: "Name", key: "sibling_name" },
                        { label: "Relationship", key: "relationship"},
                        { label: "Age", key: "sibling_age" },
                        { label: "Occupation", key: "occupation"},
                        { label: "Contact", key: "contact"},
                      ].map(({ label, key}) => (
                        <div key={key}>
                          <p className="text-sm text-gray-500 flex items-center gap-2">
                            {label}
                          </p>
                          {isEditing ? (
                            <input
                              type={key === "sibling_age" ? "number" : "text"}
                              className="w-full px-3 py-2 border rounded-lg mt-1"
                              value={
                                key === "sibling_age"
                                  ? data.sibling_age?.toString() || ""
                                  : (data[key as keyof Sibling] as string | number)
                              }
                              onChange={(e) =>
                                handleChange(
                                  sibling.id,
                                  key as keyof Sibling,
                                  key === "sibling_age" ? Number(e.target.value) : e.target.value
                                )
                              }
                            />
                          ) : (
                            <p className="font-medium mt-1">
                              {key === "sibling_age" 
                                ? sibling.sibling_age 
                                : sibling[key as keyof Sibling] || "N/A"}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            !loading && (
              <div className="text-center py-10">
                <p className="text-gray-500">No sibling records found.</p>
              </div>
            )
          )}
        </div>

        {/* Action Buttons */}
        <div className="bg-gray-50 border-t p-6 flex flex-wrap justify-between gap-3">
          <div>
            {anyEditing && (
              <button
                onClick={handleSaveAll}
                className="bg-green-600 hover:bg-green-700 text-white font-medium px-5 py-2 rounded-lg flex items-center gap-2 transition-colors"
              >
                <Save size={16} /> Save All Changes
              </button>
            )}
          </div>

          <button
            onClick={onClose}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2 rounded-lg transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentSiblingView;