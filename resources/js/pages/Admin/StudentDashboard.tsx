import React, { useState, useEffect } from "react";
import { Head, router } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import { Button } from "@/components/ui/button";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Table from "@/components/ui/table";
import { Toaster, toast } from "sonner";
import ConfirmDeleteModal from "@/components/ConfirmDeleteModal";
import StudentAdmissionForm from "./StudentAdmissionForm";

interface Student {
  reg_no: string;
  class_id: number;
  distance_to_school?: number;
  method_of_coming_to_school?: string;
  receiving_any_grade_5_scholarship: boolean;
  receiving_any_samurdhi_aswesuma: boolean;
  receiving_any_scholarship: boolean;
}

const breadcrumbs = [
  {
    title: "🎓 Student Dashboard",
    href: "/student/dashboard",
  },
];

const StudentDashboard: React.FC = () => {
  const [showAddForm, setShowAddForm] = useState(false); 
  const [loading, setLoading] = useState(false);
  
  const [students, setStudents] = useState<Student[]>([]);
  const [searchRegNo, setSearchRegNo] = useState("");
  const [searchedStudent, setSearchedStudent] = useState<Student | null>(null);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [editingRegNo, setEditingRegNo] = useState<string | null>(null);
  const [editData, setEditData] = useState<Student | null>(null);
  const [viewingStudent, setViewingStudent] = useState<Student | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [filteredRegNos, setFilteredRegNos] = useState<string[]>([]);
  const [errors, setErrors] = useState<string[]>([]);
  const [classIds, setClassIds] = useState<string[]>([]);
  const [filteredClassIds, setFilteredClassIds] = useState<string[]>([]);
  const [searchClassId, setSearchClassId] = useState<string>("");
  const [newStudent, setNewStudent] = useState({
  reg_no: "",
  class_id: 0,
  distance_to_school: 0,
  method_of_coming_to_school: "",
  receiving_any_grade_5_scholarship: false,
  receiving_any_samurdhi_aswesuma: false,
  receiving_any_scholarship: false,
});

// useEffect(() => {
//   const fetchClassIds = async () => {
//     try {
//       const response = await fetch("http://127.0.0.1:8000/api/class-ids");
//       if (!response.ok) throw new Error("Error fetching class IDs");

//       const data = await response.json();
//       console.log("Fetched class IDs:", data); // Log the fetched data
//       setClassIds(data); // Set the class IDs state
//     } catch (error) {
//       console.error("Error fetching class IDs:", error);
//     }
//   };

//   fetchClassIds();
// }, []); // Empty dependency array to run once on component mount

// useEffect(() => {
//   if (searchClassId.trim()) {
//     const filtered = classIds.filter((id) =>
//       id.toString().includes(searchClassId.trim())
//     );
//     console.log("Filtered class IDs:", filtered); // Log the filtered IDs
//     setFilteredClassIds(filtered);
//   } else {
//     setFilteredClassIds([]);
//   }
// }, [searchClassId, classIds]); // Re-run when searchClassId or classIds changes

// const handleSelectClassId = (class_id: number) => {
//   console.log(class_id); // Log selected class ID
//   setSearchClassId(class_id.toString()); // Update the input field with the selected class ID (as a string)
//   setFilteredClassIds([]); // Clear the suggestions list
// };

const validateFields = (newStudent: Student) => {
  const errors = [];
  const regNoPattern = /^REG-\d{5}$/;  // "REG-" followed by exactly 5 digits
  if (!newStudent.reg_no) {
    errors.push("Registration number is required.");
  } else if (!regNoPattern.test(newStudent.reg_no)) {
    errors.push("Registration number must be in the format REG-XXXXX (where X is a number).");
  }

  // if (!newStudent.class_id || isNaN(newStudent.class_id)) {
  //   errors.push("Class ID must be a valid number.");
  // } 
    
  

  const distanceToSchool = newStudent.distance_to_school;
  if (distanceToSchool && (isNaN(distanceToSchool) || distanceToSchool < 0)) {
    errors.push("Distance to school must be a valid number greater than or equal to 0.");
  }
  
  

  return errors;
};
const addStudent = async () => {
  const validationErrors = validateFields(newStudent);
  if (validationErrors.length > 0) {
    validationErrors.forEach((error) => toast.error(error));
    return;
  }

  try {
    setLoading(true);
    const response = await fetch(`http://127.0.0.1:8000/api/students`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newStudent),
    });

    const data = await response.json();

    if (response.ok) {
      toast.success("Student added successfully!");
      setStudents((prevStudents) => [...prevStudents, data.student]);
      setShowAddForm(false); // Hide form after successful submission
    } else {
      toast.error(data.message || "Failed to add student.");
    }
  } catch (error) {
    console.error(error);
    toast.error("An error occurred while adding the student.");
  } finally {
    setLoading(false);
  }
};
const handleInputChangeAdd = (e: React.ChangeEvent<HTMLInputElement>) => {
  const { name, value } = e.target;

  setNewStudent((prevState) => ({


    ...prevState,
    [name]: value,
  }));

  // Validate on input change
  setErrors(validateFields(newStudent));
};


const handleBlur = () => {
  // Validate when the field loses focus (onBlur)
  setErrors(validateFields(newStudent));
};

  useEffect(() => {
    fetchStudents(); 
  }, []);
  
  const fetchStudents = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/students");
      if (!response.ok) throw new Error("Error fetching students");

      const data = await response.json();
      setStudents(data); 
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setSearchRegNo(input);
    if (input.trim() === "") {
      setFilteredRegNos([]);
      return;
    }  
 const filtered = students
      .map((student) => student.reg_no)
      .filter((reg) => reg.toLowerCase().includes(input.toLowerCase()));
  
      setFilteredRegNos(filtered.slice(0, 5)); 
  };
  
  const handleSelectSuggestion = (reg: string) => {
    setSearchRegNo(reg);
    setFilteredRegNos([]); 
  };
  
  
  const searchStudent = async () => {
    if (!searchRegNo.trim()) {
      toast.error("Please enter a valid Registration Number.");
      return;
    }

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/students`);
      if (!response.ok) throw new Error("Error fetching students");

      const data = await response.json();

     
      const student = data.find((s: Student) => s.reg_no === searchRegNo);

      if (!student) {
        toast.error("Student not found. Please Check Registration Number");
        return;
      }

      setSearchedStudent(student); 
      setIsSearchModalOpen(true);
    } catch (error) {
      toast.error("Error searching for student.");
      setSearchedStudent(null);
    }
  };

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState<string | null>(null);

  const handleDeleteClick = (reg_no: string) => {
    setStudentToDelete(reg_no);
    setIsDeleteModalOpen(true);
  };
  const handleViewClick = (student: Student) => {
    setViewingStudent(student);
    setIsViewModalOpen(true);
  };
  const confirmDelete = async () => {
    if (!studentToDelete) return;

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/students/${studentToDelete}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
      });

      if (!response.ok) throw new Error("Failed to delete student");

      toast.success("Student Deleted Successfully");

      
      setStudents((prevStudents) => prevStudents.filter((student) => student.reg_no !== studentToDelete));
    } catch (error) {
      toast.error("Failed to delete student. Please try again.");
      console.error("Error deleting student:", error);
    } finally {
      setIsDeleteModalOpen(false);
      setStudentToDelete(null);
    }
  };
  const handleEditClick = (student: Student) => {
    setEditingRegNo(student.reg_no);
    setEditData({ ...student });
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!editData) return;
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    if (!editData) return;

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/students/${editData.reg_no}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editData),
      });
      if (!response.ok) throw new Error("Error updating student");

      toast.success("Student updated successfully!");
      setStudents((prev) =>
        prev.map((student) => (student.reg_no === editData.reg_no ? editData : student))
      );
      setEditingRegNo(null);
      setEditData(null);
    } catch (error) {
      toast.error("Error updating student.");
      console.error("Error updating student:", error);
    }
  };




  


  //   const handleSendForm = async () => {
  //     setLoading(true);


  //     router.post("/send-admission-form", { reg_no: regNo }, {
  //         onSuccess: (response) => {
  //             toast.success("Admission form sent successfully!");
  //             setRegNo("");
  //         },
  //         onError: (errors) => {
  //             toast.error( "Failed to send form.");
  //         },
  //         onFinish: () => {
  //             setLoading(false);
  //         }
  //     });
  // };


  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Student Dashboard" />
      <div className="flex h-screen bg-white">
        <div className="flex-1 flex flex-col">
          <Toaster position="top-right" richColors />
          <header className="flex justify-end  border-b bg-white shadow-sm">
           
           
 <div className="relative">

 <div className="flex space-x-4 mb-4">
  <Input
    value={searchRegNo}
    onChange={handleInputChange}
    className="border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
    placeholder="Enter Registration Number"
  />
  <Button onClick={searchStudent} className="bg-red-700 text-white px-4 py-2 rounded">
    Search
  </Button>
</div>
              {filteredRegNos.length > 0 && (
    <ul className="absolute z-10 bg-white border rounded w-full mt-1 max-h-40 overflow-y-auto">
      {filteredRegNos.map((reg, idx) => (
        <li
          key={idx}
          className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
          onClick={() => handleSelectSuggestion(reg)}
        >
          {reg}
        </li>
      ))}
    </ul>
  )}
            </div>
          </header>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3 mt-9 mr-5 ml-5 mb-9">
            <div className="border-green-900 rounded-2xl border-t-4 bg-white p-6 shadow ">
              <h3 className="text-maroon-700 text-lg font-bold">Toal Students</h3>
              <p className="mt-2 text-3xl font-bold text-green-600">{students.length}</p>
            </div>
            <div className="border-red-900 rounded-2xl border-t-4 bg-white p-6 shadow">
              <h3 className="text-maroon-700 text-lg font-bold">Class Entrolled</h3>
              <p className="mt-2 text-3xl font-bold text-red-600">95</p>

            </div>
            <div className="border-blue-900 rounded-2xl border-t-4 bg-white p-6 shadow">

              <h3 className="text-maroon-700 text-lg font-bold">Receiving Scholarship</h3>
              <p className="mt-2 text-3xl font-bold text-blue-600">{students.length}</p>
            </div>
          </div>
          <main className="p-6 bg-gray-50 flex-1 overflow-y-auto">
            {/* <div className="flex justify-left">
              <Button onClick={() => setShowForm(true)} className="bg-green-700 text-white mb-4">
                Admission Form
              </Button>

              </div> */}
<Button
  onClick={() => setShowAddForm(true)}
  className="bg-green-700 text-white mb-4"
>
  Add New Student
</Button>

{showAddForm && (
  <form onSubmit={(e) => e.preventDefault()}>
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-lg shadow-lg w-[500px] max-w-full">
      <h3 className="text-lg font-semibold mb-4">Add Student Details</h3>

      <div className="space-y-3">
      <Input
  type="text"
  placeholder="Registration No"
  value={newStudent.reg_no}
  onChange={handleInputChangeAdd}
  onBlur={handleBlur}
  name="reg_no"  // Make sure this matches the property name in the state
  className="w-full border border-gray-300 px-4 py-2 rounded"
/>
{errors.length > 0 && (
        <ul className="text-red-500">
          {errors.map((error, index) => (
            <li key={index}>{error}</li>
          ))}
        </ul>
      )}

<input
  type="number"
  placeholder="Class ID"
  name="class_id"  // This ensures that the input is tied to the correct field in the state
  value={newStudent.class_id}
  onChange={handleInputChangeAdd}
  className="w-full border border-gray-300 px-4 py-2 rounded"
/>

{/* <input
        id="class_id"
        name="class_id"
        value={searchClassId}
  onChange={(e) => setSearchClassId(e.target.value)}
        className="w-full border border-gray-300 px-4 py-2 rounded"
      /> */}
{/* {filteredClassIds.length > 0 && (
  <ul className="absolute z-10 bg-white border rounded w-full mt-1 max-h-40 overflow-y-auto">
    {filteredClassIds.map((id, idx) => (
      <li
        key={idx}
        className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
        onClick={() => handleSelectClassId(id)}
      >
        {id}
      </li>
    ))}
  </ul>
)} */}


<Input
  type="number"
  placeholder="Distance to School (km)"
  value={newStudent.distance_to_school}
  onChange={handleInputChangeAdd}
  name="distance_to_school"  // Ensure you have a name attribute here
  className="w-full border border-gray-300 px-4 py-2 rounded"
/>


        <Input
          type="text"
          placeholder="Method of Coming to School"
          value={newStudent.method_of_coming_to_school}
          onChange={(e) =>
            setNewStudent({
              ...newStudent,
              method_of_coming_to_school: e.target.value,
            })
          }
          className="w-full border border-gray-300 px-4 py-2 rounded"
        />

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={newStudent.receiving_any_grade_5_scholarship}
            onChange={(e) =>
              setNewStudent({
                ...newStudent,
                receiving_any_grade_5_scholarship: e.target.checked,
              })
            }
          />
          <label>Grade 5 Scholarship</label>
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={newStudent.receiving_any_samurdhi_aswesuma}
            onChange={(e) =>
              setNewStudent({
                ...newStudent,
                receiving_any_samurdhi_aswesuma: e.target.checked,
              })
            }
          />
          <label>Samurdhi/Aswesuma</label>
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={newStudent.receiving_any_scholarship}
            onChange={(e) =>
              setNewStudent({
                ...newStudent,
                receiving_any_scholarship: e.target.checked,
              })
            }
          />
          <label>Other Scholarship</label>
        </div>

        <div className="flex justify-end space-x-3 pt-4">
          <Button
            onClick={addStudent}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Save
          </Button>
          <Button
            onClick={() => setShowAddForm(false)}
            className="bg-red-700 text-white px-4 py-2 rounded"
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  </div>
  </form>
)}


            <Table
              columns={["Reg No", "Class ID", "Distance", "Method", "Actions"]}
              data={students.map((student) =>
                editingRegNo === student.reg_no ? {
                  "Reg No": <Input value={editData?.reg_no} disabled />,
                  "Class ID": <Input name="class_id" value={editData?.class_id} onChange={handleEditChange} />,
                  "Distance": <Input name="distance_to_school" value={editData?.distance_to_school} onChange={handleEditChange} />,
                  "Method": <Input name="method_of_coming_to_school" value={editData?.method_of_coming_to_school} onChange={handleEditChange} />,
                  Actions: (
                    <div className="flex gap-2">
                      <Button onClick={handleUpdate} className="bg-green-500 text-white">Save</Button>
                      <Button onClick={() => setEditingRegNo(null)} className="bg-red-500 text-white">Cancel</Button>
                    </div>
                  ),
                } : {
                  "Reg No": student.reg_no,
                  "Class ID": student.class_id,
                  "Distance": student.distance_to_school,
                  "Method": student.method_of_coming_to_school,
                  Actions: (
                    <div className="flex gap-2">
                      <Button onClick={() => handleEditClick(student)} className="bg-blue-500 text-white">Edit</Button>
                      <Button onClick={() => handleDeleteClick(student.reg_no)} className="bg-red-600 text-white">Delete</Button>
                      <Button
                        onClick={() => handleViewClick(student)}
                        className="bg-purple-500 text-white mr-2"
                      >
                        View
                      </Button>
                    </div>
                  ),
                }
              )}
            />
            <ConfirmDeleteModal
              isOpen={isDeleteModalOpen}
              onClose={() => setIsDeleteModalOpen(false)}
              onConfirm={confirmDelete}
            />
          </main>
          {isViewModalOpen && viewingStudent && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg p-8 relative">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6 border-b pb-3">
        👩‍🎓 Student Information
      </h2>

      <div className="overflow-hidden rounded-lg border border-gray-200">
        <table className="w-full text-sm text-left text-gray-800">
          <tbody>
            <tr className="even:bg-gray-50">
              <th className="px-4 py-3 bg-gray-100 font-semibold w-1/2">🎓 Reg No</th>
              <td className="px-4 py-3">{viewingStudent.reg_no}</td>
            </tr>
            <tr className="even:bg-gray-50">
              <th className="px-4 py-3 bg-gray-100 font-semibold">🏫 Class ID</th>
              <td className="px-4 py-3">{viewingStudent.class_id}</td>
            </tr>
            <tr className="even:bg-gray-50">
              <th className="px-4 py-3 bg-gray-100 font-semibold">📍 Distance to School</th>
              <td className="px-4 py-3">{viewingStudent.distance_to_school ?? "N/A"} km</td>
            </tr>
            <tr className="even:bg-gray-50">
              <th className="px-4 py-3 bg-gray-100 font-semibold">🚲 Method of Coming</th>
              <td className="px-4 py-3">{viewingStudent.method_of_coming_to_school ?? "N/A"}</td>
            </tr>
            <tr className="even:bg-gray-50">
              <th className="px-4 py-3 bg-gray-100 font-semibold">🏅 Grade 5 Scholarship</th>
              <td className="px-4 py-3">
                {viewingStudent.receiving_any_grade_5_scholarship ? (
                  <span className="text-green-600 font-medium">Yes</span>
                ) : (
                  <span className="text-red-500 font-medium">No</span>
                )}
              </td>
            </tr>
            <tr className="even:bg-gray-50">
              <th className="px-4 py-3 bg-gray-100 font-semibold">🟢 Samurdhi Beneficiary</th>
              <td className="px-4 py-3">
                {viewingStudent.receiving_any_samurdhi_aswesuma ? (
                  <span className="text-green-600 font-medium">Yes</span>
                ) : (
                  <span className="text-red-500 font-medium">No</span>
                )}
              </td>
            </tr>
            <tr className="even:bg-gray-50">
              <th className="px-4 py-3 bg-gray-100 font-semibold">🎁 Other Scholarship</th>
              <td className="px-4 py-3">
                {viewingStudent.receiving_any_scholarship ? (
                  <span className="text-green-600 font-medium">Yes</span>
                ) : (
                  <span className="text-red-500 font-medium">No</span>
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="mt-6 flex justify-end">
        <button
          onClick={() => setIsViewModalOpen(false)}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2 rounded-lg transition"
        >
          Close
        </button>
      </div>
    </div>
  </div>
)}


{isSearchModalOpen && searchedStudent && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg p-8 relative">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6 border-b pb-3">
        🔍 Searched Student Details
      </h2>

      <div className="overflow-hidden rounded-lg border border-gray-200">
        <table className="w-full text-sm text-left text-gray-800">
          <tbody>
            <tr className="even:bg-gray-50">
              <th className="px-4 py-3 bg-gray-100 font-semibold w-1/2">🎓 Reg No</th>
              <td className="px-4 py-3">{searchedStudent.reg_no}</td>
            </tr>
            <tr className="even:bg-gray-50">
              <th className="px-4 py-3 bg-gray-100 font-semibold">🏫 Class ID</th>
              <td className="px-4 py-3">{searchedStudent.class_id}</td>
            </tr>
            <tr className="even:bg-gray-50">
              <th className="px-4 py-3 bg-gray-100 font-semibold">📍 Distance to School</th>
              <td className="px-4 py-3">{searchedStudent.distance_to_school ?? "N/A"} km</td>
            </tr>
            <tr className="even:bg-gray-50">
              <th className="px-4 py-3 bg-gray-100 font-semibold">🚲 Method of Coming</th>
              <td className="px-4 py-3">{searchedStudent.method_of_coming_to_school ?? "N/A"}</td>
            </tr>
            <tr className="even:bg-gray-50">
              <th className="px-4 py-3 bg-gray-100 font-semibold">🏅 Grade 5 Scholarship</th>
              <td className="px-4 py-3">
                {searchedStudent.receiving_any_grade_5_scholarship ? (
                  <span className="text-green-600 font-medium">Yes</span>
                ) : (
                  <span className="text-red-500 font-medium">No</span>
                )}
              </td>
            </tr>
            <tr className="even:bg-gray-50">
              <th className="px-4 py-3 bg-gray-100 font-semibold">🟢 Samurdhi Beneficiary</th>
              <td className="px-4 py-3">
                {searchedStudent.receiving_any_samurdhi_aswesuma ? (
                  <span className="text-green-600 font-medium">Yes</span>
                ) : (
                  <span className="text-red-500 font-medium">No</span>
                )}
              </td>
            </tr>
            <tr className="even:bg-gray-50">
              <th className="px-4 py-3 bg-gray-100 font-semibold">🎁 Other Scholarship</th>
              <td className="px-4 py-3">
                {searchedStudent.receiving_any_scholarship ? (
                  <span className="text-green-600 font-medium">Yes</span>
                ) : (
                  <span className="text-red-500 font-medium">No</span>
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="mt-6 flex justify-end">
        <button
          onClick={() => setIsSearchModalOpen(false)}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2 rounded-lg transition"
        >
          Close
        </button>
      </div>
    </div>
  </div>
)}


        </div>
      </div>
    </AppLayout>
  );
};

export default StudentDashboard;
