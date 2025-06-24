import React, { useState, useEffect } from "react";
import { Student } from "@/types";
import { Edit } from "lucide-react";

interface StudentPersonal {
  full_name: string;
  full_name_with_initial: string;
  birthday: string;
  age: string;
  ethnicity: string;
  religion: string;
  gender: string;
  birth_certificate_number: string;
  nic_number: string;
  postal_ic_number: string;
  address: string;
  special_needs: boolean;
  height: string;
  weight: string;
  photo: string | null;
}

interface ViewStudentProps {
  student: Student | null;
  isOpen: boolean;
  onClose: () => void;
}

const StudentPersonalView: React.FC<ViewStudentProps> = ({ student, isOpen, onClose }) => {
  const [personalInfo, setPersonalInfo] = useState<StudentPersonal | null>(null);
  const [editData, setEditData] = useState<StudentPersonal | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen && student) {
      setLoading(true);
      setError(null);

      fetch(`/api/student-personal/${student.reg_no}`)
        .then((res) => {
          if (!res.ok) throw new Error("Failed to fetch personal info");
          return res.json();
        })
        .then((data) => {
          setPersonalInfo(data);
          setEditData(data);
          setLoading(false);
        })
        .catch((err) => {
          setError(err.message);
          setLoading(false);
        });
    } else {
      setPersonalInfo(null);
      setEditData(null);
      setError(null);
      setIsEditing(false);
    }
  }, [isOpen, student]);

  const handleChange = (field: keyof StudentPersonal, value: any) => {
    if (!editData) return;
    setEditData({ ...editData, [field]: value });
  };

const handleSave = async () => {
  if (!student || !editData) return;

  console.log("Submitting update for", student.reg_no, editData);

  try {
    const res = await fetch(`/api/student-personal/${student.reg_no}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editData),
    });

    const result = await res.json();
    console.log("Server response:", result);

    if (!res.ok) {
      throw new Error(result.message || "Failed to update personal info");
    }

    alert("Personal info updated successfully!");
    setIsEditing(false);
    setPersonalInfo(result);
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
          👩‍🎓 Student Personal Information
        </h2>

        {loading && <p>Loading personal info...</p>}
        {error && <p className="text-red-600">{error}</p>}

        {!loading && personalInfo && (
          <div className="overflow-hidden rounded-lg border border-gray-200">
            <h3 className="text-xl font-semibold mb-3">📝 Personal Details</h3>
            <table className="w-full text-sm text-left text-gray-800">
              <tbody>
                {Object.entries(personalInfo).map(([key, val]) => {
                  if (key === "photo" && editData?.photo) {
                    return (
                      <tr key={key} className="even:bg-gray-50">
                        <th className="px-4 py-3 bg-gray-100 font-semibold capitalize">{`📷 Photo`}</th>
                        <td className="px-4 py-3">
                          <img
                            src={editData.photo}
                            alt="Student photo"
                            className="h-20 w-20 object-cover rounded"
                          />
                        </td>
                      </tr>
                    );
                  }

                  const isCheckbox = typeof val === "boolean";
                  const label = key.replace(/_/g, " ");

                  return (
                    <tr key={key} className="even:bg-gray-50">
                      <th className="px-4 py-3 bg-gray-100 font-semibold capitalize">
                        {label}
                      </th>
                      <td className="px-4 py-3">
                        {isEditing ? (
                          isCheckbox ? (
                            <input
                              type="checkbox"
                              checked={(editData as any)[key]}
                              onChange={(e) =>
                                handleChange(key as keyof StudentPersonal, e.target.checked)
                              }
                            />
                          ) : (
                            <input
                              className="border px-2 py-1 rounded w-full"
                              value={(editData as any)[key]}
                              onChange={(e) =>
                                handleChange(key as keyof StudentPersonal, e.target.value)
                              }
                            />
                          )
                        ) : isCheckbox ? (
                          (personalInfo as any)[key] ? (
                            <span className="text-green-600 font-medium">Yes</span>
                          ) : (
                            <span className="text-red-500 font-medium">No</span>
                          )
                        ) : (
                          (personalInfo as any)[key]
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

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
                  setIsEditing(false);
                  setEditData(personalInfo);
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

export default StudentPersonalView;
