import React, { useEffect, useState } from "react";
import { Student } from "@/types";
import { Edit, X, User, Clipboard, Ruler, FileText, Calendar, MapPin, Heart } from "lucide-react";

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

    try {
      const res = await fetch(`/api/student-personal/${student.reg_no}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editData),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Failed to update personal info");
      }

      alert("Personal info updated successfully!");
      setIsEditing(false);
      setPersonalInfo(result);
    } catch (err: any) {
      alert(err.message || "An unknown error occurred");
    }
  };

  if (!isOpen || !student) return null;

  // Group fields by category
  const basicInfoFields = [
    { key: "full_name", label: "Full Name", icon: <User size={16} /> },
    { key: "full_name_with_initial", label: "Name with Initial", icon: <User size={16} /> },
    { key: "birthday", label: "Birthday", icon: <Calendar size={16} /> },
    { key: "age", label: "Age", icon: <Calendar size={16} /> },
    { key: "gender", label: "Gender", icon: <User size={16} /> },
  ];

  const identityFields = [
    { key: "birth_certificate_number", label: "Birth Certificate", icon: <FileText size={16} /> },
    { key: "nic_number", label: "NIC Number", icon: <FileText size={16} /> },
    { key: "postal_ic_number", label: "Postal IC", icon: <FileText size={16} /> },
  ];

  const culturalFields = [
    { key: "ethnicity", label: "Ethnicity", icon: <Heart size={16} /> },
    { key: "religion", label: "Religion", icon: <Heart size={16} /> },
  ];

  const physicalFields = [
    { key: "height", label: "Height", icon: <Ruler size={16} /> },
    { key: "weight", label: "Weight", icon: <Ruler size={16} /> },
    { key: "special_needs", label: "Special Needs", icon: <Heart size={16} /> },
  ];

  const addressField = [
    { key: "address", label: "Address", icon: <MapPin size={16} /> },
  ];

  return (
    <div className="fixed inset-0 bg-gray-300 bg-opacity-50 flex items-center justify-center z-50 p-4">

      <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-6">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold">Personal Information</h2>
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
              <p>Loading personal information...</p>
            </div>
          )}
          
          {error && (
            <div className="col-span-2 bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-600">{error}</p>
            </div>
          )}

          {!loading && personalInfo && editData && (
            <>
                          {/* Photo Card */}
              <div className="bg-gray-50 rounded-xl border border-gray-200 p-5">
                <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2 mb-4 pb-2 border-b">
                  <span className="bg-purple-100 text-purple-800 p-1 rounded-lg">
                    <User size={18} />
                  </span>
                  Student Photo
                </h3>
                
                <div className="flex flex-col items-center">
                  {editData.photo ? (
                    <img
                      src={editData.photo}
                      alt="Student photo"
                      className="h-40 w-40 object-cover rounded-lg border-2 border-gray-200"
                    />
                  ) : (
                    <div className="bg-gray-200 border-2 border-dashed rounded-xl w-40 h-40 flex items-center justify-center">
                      <span className="text-gray-500">No photo</span>
                    </div>
                  )}
                  
                  {isEditing && (
                    <input
                      type="text"
                      className="mt-3 w-full px-3 py-2 border rounded-lg"
                      placeholder="Photo URL"
                      value={editData.photo || ""}
                      onChange={(e) => handleChange("photo", e.target.value)}
                    />
                  )}
                </div>
              </div>
              {/* Basic Information Card */}
              <div className="bg-gray-50 rounded-xl border border-gray-200 p-5">
                <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2 mb-4 pb-2 border-b">
                  <span className="bg-blue-100 text-blue-800 p-1 rounded-lg">
                    <User size={18} />
                  </span>
                  Basic Information
                </h3>
                
                <div className="space-y-4">
                  {basicInfoFields.map(({ key, label }) => (
                    <div key={key}>
                      <p className="text-sm text-gray-500 flex items-center gap-2">
                        {label}
                      </p>
                      {isEditing ? (
                        <input
                          className="w-full px-3 py-2 border rounded-lg mt-1"
                          value={(editData as any)[key] || ""}
                          onChange={(e) => handleChange(key as keyof StudentPersonal, e.target.value)}
                        />
                      ) : (
                        <p className="font-medium">{(personalInfo as any)[key] || "N/A"}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>



              {/* Identity Information Card */}
              <div className="bg-gray-50 rounded-xl border border-gray-200 p-5">
                <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2 mb-4 pb-2 border-b">
                  <span className="bg-green-100 text-green-800 p-1 rounded-lg">
                    <FileText size={18} />
                  </span>
                  Identity Information
                </h3>
                
                <div className="space-y-4">
                  {identityFields.map(({ key, label }) => (
                    <div key={key}>
                      <p className="text-sm text-gray-500 flex items-center gap-2">
                        {label}
                      </p>
                      {isEditing ? (
                        <input
                          className="w-full px-3 py-2 border rounded-lg mt-1"
                          value={(editData as any)[key] || ""}
                          onChange={(e) => handleChange(key as keyof StudentPersonal, e.target.value)}
                        />
                      ) : (
                        <p className="font-medium">{(personalInfo as any)[key] || "N/A"}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Cultural Information Card */}
              <div className="bg-gray-50 rounded-xl border border-gray-200 p-5">
                <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2 mb-4 pb-2 border-b">
                  <span className="bg-pink-100 text-pink-800 p-1 rounded-lg">
                    <Heart size={18} />
                  </span>
                  Cultural Information
                </h3>
                
                <div className="space-y-4">
                  {culturalFields.map(({ key, label }) => (
                    <div key={key}>
                      <p className="text-sm text-gray-500 flex items-center gap-2">
                        {label}
                      </p>
                      {isEditing ? (
                        <input
                          className="w-full px-3 py-2 border rounded-lg mt-1"
                          value={(editData as any)[key] || ""}
                          onChange={(e) => handleChange(key as keyof StudentPersonal, e.target.value)}
                        />
                      ) : (
                        <p className="font-medium">{(personalInfo as any)[key] || "N/A"}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Physical Information Card */}
              <div className="bg-gray-50 rounded-xl border border-gray-200 p-5">
                <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2 mb-4 pb-2 border-b">
                  <span className="bg-yellow-100 text-yellow-800 p-1 rounded-lg">
                    <Ruler size={18} />
                  </span>
                  Physical Information
                </h3>
                
                <div className="space-y-4">
                  {physicalFields.map(({ key, label }) => (
                    <div key={key}>
                      <p className="text-sm text-gray-500 flex items-center gap-2">
                        {label}
                      </p>
                      {isEditing ? (
                        key === "special_needs" ? (
                          <label className="relative inline-flex items-center cursor-pointer mt-1">
                            <input
                              type="checkbox"
                              checked={(editData as any)[key] || false}
                              onChange={(e) => handleChange(key as keyof StudentPersonal, e.target.checked)}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                          </label>
                        ) : (
                          <input
                            className="w-full px-3 py-2 border rounded-lg mt-1"
                            value={(editData as any)[key] || ""}
                            onChange={(e) => handleChange(key as keyof StudentPersonal, e.target.value)}
                          />
                        )
                      ) : key === "special_needs" ? (
                        (personalInfo as any)[key] ? (
                          <span className="text-green-600 font-medium">Yes</span>
                        ) : (
                          <span className="text-red-500 font-medium">No</span>
                        )
                      ) : (
                        <p className="font-medium">{(personalInfo as any)[key] || "N/A"}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Address Card */}
              <div className="bg-gray-50 rounded-xl border border-gray-200 p-5 md:col-span-2">
                <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2 mb-4 pb-2 border-b">
                  <span className="bg-indigo-100 text-indigo-800 p-1 rounded-lg">
                    <MapPin size={18} />
                  </span>
                  Address
                </h3>
                
                <div className="space-y-4">
                  {addressField.map(({ key, label }) => (
                    <div key={key}>
                      <p className="text-sm text-gray-500 flex items-center gap-2">
                        {label}
                      </p>
                      {isEditing ? (
                        <textarea
                          className="w-full px-3 py-2 border rounded-lg mt-1 min-h-[100px]"
                          value={(editData as any)[key] || ""}
                          onChange={(e) => handleChange(key as keyof StudentPersonal, e.target.value)}
                        />
                      ) : (
                        <p className="font-medium whitespace-pre-line">{(personalInfo as any)[key] || "N/A"}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
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
                    setIsEditing(false);
                    setEditData(personalInfo);
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

export default StudentPersonalView;