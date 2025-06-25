import React, { useEffect, useState } from "react";
import { Student } from "@/types";
import { Edit } from "lucide-react";

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

  setSiblingInfo(parsed); // ✅ use parsed
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

    const text = await res.text(); // safer than res.json() for debugging
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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl h-[90vh] p-8 relative overflow-y-auto">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6 border-b pb-3">
          👨‍👩‍👧 Sibling Information
        </h2>

        {loading && <p className="text-gray-700 text-center">Loading sibling info...</p>}
        {error && <p className="text-red-600 text-center">{error}</p>}

        {siblingInfo.length > 0 ? (
          <div className="space-y-6">
            {siblingInfo.map((sibling, index) => {
              const isEditing = editStates[sibling.id];
              const data = editData[sibling.id];

              return (
                <div key={sibling.id} className="border rounded-lg p-4 shadow">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="font-bold text-lg text-blue-600">👤 Sibling {index + 1}</h4>
                    <button
                      onClick={() => toggleEdit(sibling.id)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white font-medium px-4 py-1 rounded flex items-center gap-1"
                    >
                      <Edit size={14} /> {isEditing ? "Cancel" : "Edit"}
                    </button>
                  </div>

                  <table className="w-full text-sm text-left text-gray-800">
                    <tbody>
                      {[
                        { label: " ID", key: "id" },
                        { label: " Reg No", key: "reg_no" },
                        { label: "👧 Name", key: "sibling_name" },
                        { label: "🔗 Relationship", key: "relationship" },
                        { label: "🎂 Age", key: "sibling_age" },
                        { label: "💼 Occupation", key: "occupation" },
                        { label: "📞 Contact", key: "contact" },
                      ].map(({ label, key }) => (
                        <tr key={key} className="even:bg-gray-50">
                          <th className="px-4 py-2 bg-gray-100 w-1/3">{label}</th>
                          <td className="px-4 py-2">
  {isEditing ? (
    <input
      type={key === "sibling_age" ? "number" : "text"}
      className="border px-2 py-1 rounded w-full"
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
    String(sibling[key as keyof Sibling] ?? "")
  )}
</td>

                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              );
            })}

            {anyEditing && (
              <div className="flex justify-end mt-6">
                <button
                  onClick={handleSaveAll}
                  className="bg-green-600 hover:bg-green-700 text-white font-medium px-5 py-2 rounded-lg"
                >
                  Save
                </button>
              </div>
            )}
          </div>
        ) : (
          !loading && <p className="text-center text-gray-500">No sibling records found.</p>
        )}

        <div className="mt-6 flex justify-center">
          <button
            onClick={onClose}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2 rounded-lg transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentSiblingView;
