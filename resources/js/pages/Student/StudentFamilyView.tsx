import React, { useEffect, useState } from "react";
import { Student } from "@/types";
import { Edit } from "lucide-react";

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
          if (err instanceof Error) {
            setError(err.message);
          } else {
            setError("Unknown error occurred");
          }
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

  console.log("Sending family update for:", student.reg_no);
  console.log("Payload:", editData);

  try {
    const res = await fetch(`/api/student-family/${student.reg_no}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editData),
    });

    const result = await res.json();
    console.log("Server response:", result);

    if (!res.ok) {
      throw new Error(result.message || "Failed to update family info");
    }

    alert("Family info updated successfully!");
    setIsEditing(false);
    setFamilyInfo(result); // optionally use updated response
  } catch (err) {
    if (err instanceof Error) {
      alert(err.message);
    } else {
      alert("An unknown error occurred");
    }
  }
};


  if (!isOpen || !student) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl h-[90vh] p-8 relative overflow-y-auto">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6 border-b pb-3">
          👨‍👩‍👧 Student Family Information
        </h2>

        <div className="overflow-hidden rounded-lg border border-gray-200">
          <h3 className="text-xl font-semibold mb-3">📝 Family Details</h3>

          {loading && <p>Loading family info...</p>}
          {error && <p className="text-red-600">{error}</p>}

          {editData && (
            <table className="w-full text-sm text-left text-gray-800">
              <tbody>
                {Object.entries(editData).map(([key, value]) => {
                  const label = key
                    .replace(/_/g, " ")
                    .replace(/mother/i, "Mother")
                    .replace(/father/i, "Father");

                  return (
                    <tr key={key} className="even:bg-gray-50">
                      <th className="px-4 py-3 bg-gray-100 font-semibold capitalize w-1/3">
                        {label}
                      </th>
                      <td className="px-4 py-3">
                        {isEditing ? (
                          <input
                            className="border px-2 py-1 rounded w-full"
                            value={value}
                            onChange={(e) =>
                              handleChange(key as keyof StudentFamily, e.target.value)
                            }
                          />
                        ) : (
                          value
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>

        <div className="mt-6 flex justify-between items-center">
          {isEditing ? (
            <>
              <button
                onClick={handleSave}
                className="bg-green-600 hover:bg-green-700 text-white font-medium px-5 py-2 rounded-lg"
              >
                Save
              </button>
              <button
                onClick={() => {
                  setEditData(familyInfo);
                  setIsEditing(false);
                }}
                className="bg-gray-500 hover:bg-gray-600 text-white font-medium px-5 py-2 rounded-lg"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-yellow-500 hover:bg-yellow-600 text-white font-medium px-5 py-2 rounded-lg flex items-center gap-2"
            >
              <Edit size={16} />
              Edit
            </button>
          )}

          <button
            onClick={onClose}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2 rounded-lg"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentFamilyView;
