import React, { useEffect, useState } from "react";
import { Student } from "@/types";
import { Edit, X, User, Users } from "lucide-react";

interface StudentFamily {
  mother_name: string;
  mother_occupation: string;
  mother_income: string;
  mother_working_place: string;
  mother_contact: string;
  mother_email: string;
  mother_whatsapp: string;
  father_name: string;
  father_occupation: string;
  father_income: string;
  father_working_place: string;
  father_contact: string;
  father_email: string;
  father_whatsapp: string;
}

interface ViewStudentProps {
  student: Student | null;
  isOpen: boolean;
  onClose: () => void;
}

const StudentFamilyView: React.FC<ViewStudentProps> = ({ student, isOpen, onClose }) => {
  const [familyInfo, setFamilyInfo] = useState<StudentFamily | null>(null);
  const [editData, setEditData] = useState<StudentFamily | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen && student) {
      setLoading(true);
      setError(null);

      fetch(`/api/student-family/${student.reg_no}`)
        .then((res) => {
          if (!res.ok) throw new Error("Failed to fetch family info");
          return res.json();
        })
        .then((data) => {
          setFamilyInfo(data);
          setEditData(data);
          setLoading(false);
        })
        .catch((err) => {
          setError(err.message || "Unknown error occurred");
          setLoading(false);
        });
    } else {
      setFamilyInfo(null);
      setEditData(null);
      setError(null);
      setIsEditing(false);
    }
  }, [isOpen, student]);

  const handleChange = (field: keyof StudentFamily, value: any) => {
    if (!editData) return;
    setEditData({ ...editData, [field]: value });
  };

  const handleSave = async () => {
    if (!student || !editData) return;

    try {
      const res = await fetch(`/api/student-family/${student.reg_no}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editData),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Failed to update family info");
      }

      alert("Family info updated successfully!");
      setIsEditing(false);
      setFamilyInfo(result);
    } catch (err: any) {
      alert(err.message || "An unknown error occurred");
    }
  };

  if (!isOpen || !student) return null;

  // Filter and organize mother and father fields
  const motherFields = Object.entries(editData || {})
    .filter(([key]) => key.startsWith("mother"))
    .map(([key, value]) => ({
      key: key as keyof StudentFamily,
      label: key.replace("mother_", "").replace(/_/g, " "),
      value
    }));

  const fatherFields = Object.entries(editData || {})
    .filter(([key]) => key.startsWith("father"))
    .map(([key, value]) => ({
      key: key as keyof StudentFamily,
      label: key.replace("father_", "").replace(/_/g, " "),
      value
    }));

  return (
   <div className="fixed inset-0 bg-gray-300 bg-opacity-50 flex items-center justify-center z-50 p-4">

      <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-6">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold">Family Information</h2>
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
        <div className="overflow-y-auto flex-grow p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {loading && (
            <div className="col-span-2 text-center py-10">
              <p>Loading family information...</p>
            </div>
          )}
          
          {error && (
            <div className="col-span-2 bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-600">{error}</p>
            </div>
          )}

          {/* Mother Information Card */}
          <div className="bg-gray-50 rounded-xl border border-gray-200 p-5">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2 mb-4 pb-2 border-b">
              <span className="bg-pink-100 text-pink-800 p-1 rounded-lg">
                <User size={18} />
              </span>
              Mother's Information
            </h3>
            
            <div className="space-y-4">
              {motherFields.map(({ key, label, value }) => (
                <div key={key}>
                  <p className="text-sm text-gray-500 capitalize">{label}</p>
                  {isEditing ? (
                    <input
                      className="w-full px-3 py-2 border rounded-lg mt-1"
                      value={value || ""}
                      onChange={(e) => handleChange(key, e.target.value)}
                    />
                  ) : (
                    <p className="font-medium">{value || "N/A"}</p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Father Information Card */}
          <div className="bg-gray-50 rounded-xl border border-gray-200 p-5">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2 mb-4 pb-2 border-b">
              <span className="bg-blue-100 text-blue-800 p-1 rounded-lg">
                <User size={18} />
              </span>
              Father's Information
            </h3>
            
            <div className="space-y-4">
              {fatherFields.map(({ key, label, value }) => (
                <div key={key}>
                  <p className="text-sm text-gray-500 capitalize">{label}</p>
                  {isEditing ? (
                    <input
                      className="w-full px-3 py-2 border rounded-lg mt-1"
                      value={value || ""}
                      onChange={(e) => handleChange(key, e.target.value)}
                    />
                  ) : (
                    <p className="font-medium">{value || "N/A"}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="bg-gray-50 border-t p-6 flex flex-wrap justify-between gap-3">
          <div>
            {isEditing ? (
              <>
                <button
                  onClick={handleSave}
                  className="bg-green-600 hover:bg-green-700 text-white font-medium px-5 py-2 rounded-lg flex items-center gap-2 transition-colors mr-3"
                >
                  Save Changes
                </button>
                <button
                  onClick={() => {
                    setEditData(familyInfo);
                    setIsEditing(false);
                  }}
                  className="bg-gray-500 hover:bg-gray-600 text-white font-medium px-5 py-2 rounded-lg transition-colors"
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="bg-yellow-500 hover:bg-yellow-600 text-white font-medium px-5 py-2 rounded-lg flex items-center gap-2 transition-colors"
              >
                <Edit size={16} /> Edit Information
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

export default StudentFamilyView;