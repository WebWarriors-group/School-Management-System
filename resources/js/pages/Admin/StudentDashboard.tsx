import React, { useState, useEffect, useRef } from "react";
import { Head, router } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import { Button } from "@/components/ui/button";


import { Input } from "@/components/ui/input";
import Table from "@/components/ui/table";
import { Toaster, toast } from "sonner";
import ConfirmDeleteModal from "@/components/ConfirmDeleteModal";
import StudentAdmissionForm from "./StudentAdmissionForm";
import { Filter,Edit, Trash2, Eye, Search } from "lucide-react";
import * as XLSX from 'xlsx';
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
  const [showImportForm, setImportForm] = useState(false);
  const [students, setStudents] = useState<Student[]>([]);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [viewingStudent, setViewingStudent] = useState<Student | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  // const [classIds, setClassIds] = useState<string[]>([]);
  // const [filteredClassIds, setFilteredClassIds] = useState<string[]>([]);
  // const [searchClassId, setSearchClassId] = useState<string>("");

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
  const [classCount, setClassCount] = useState(0);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/classes/count")
      .then(res => res.json())
      .then(data => {
        setClassCount(data.count);
      })
      .catch(err => {
        console.error("Error fetching class count:", err);
      });
  }, []);
  
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
  const [searchAttribute, setSearchAttribute] = useState<string>("");
  const [searchValue, setSearchValue] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [filtered, setFiltered] = useState<string[]>([]);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [searchedStudents, setSearchedStudents] = useState<Student[]>([]);
  const [currentPage, setCurrentPage] = useState(1);


  const searchLabels: Record<string, string> = {
    reg_no: "Reg. No",
    class_id: "Class",
    distance_to_school: "Distance",
    method_of_coming_to_school: "Method",
  };

  const keys = Object.keys(searchLabels);



  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setSearchValue(input);
  
    if (!input) {
      setFilteredSuggestions([]);
      return;
    }
  
    let suggestions: string[] = [];
  
    if (searchAttribute) {
      // Search only by selected attribute
      suggestions = students
        .map((student) => String(student[searchAttribute as keyof Student] ?? ""))
        .filter((val) =>
          val.toLowerCase().includes(input.toLowerCase())
        );
    } else {
      // Search across all attributes in searchLabels
      suggestions = students.flatMap((student) =>
        keys.map((key) =>
          String(student[key as keyof Student] ?? "")
        )
      ).filter((val) =>
        val.toLowerCase().includes(input.toLowerCase())
      );
    }
  
    setFilteredSuggestions([...new Set(suggestions)].slice(0, 5));
  };
  

  const handleSelectSuggestion = (val: string) => {
    setSearchValue(val);
    setFilteredSuggestions([]);
  };

  const handleSearch = () => {
    if (!searchValue.trim()) {
      toast.error("Please enter a search value.");
      return;
    }
  
    let matches: Student[] = [];
  
    if (searchAttribute) {
      // Filter by selected field
      matches = students.filter((student) =>
        String(student[searchAttribute as keyof Student])
          .toLowerCase()
          .includes(searchValue.toLowerCase())
      );
    } else {
      // Global search across all fields in `searchLabels`
      matches = students.filter((student) =>
        Object.keys(searchLabels).some((key) =>
          String(student[key as keyof Student] ?? "")
            .toLowerCase()
            .includes(searchValue.toLowerCase())
        )
      );
    }
  
    if (matches.length === 0) {
      toast.error("No matching students found.");
      setSearchedStudents([]);
      setIsSearchModalOpen(false);
      return;
    }
  
    setSearchedStudents(matches);
    setCurrentPage(1);
    setIsSearchModalOpen(true);
  };
  

  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
const [showForm, setShowForm] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      const selectedFile = e.target.files[0];
      const fileExtension = selectedFile.name.split('.').pop()?.toLowerCase();

      // Check if the file is a valid Excel file
      if (fileExtension && ['xlsx', 'xls'].includes(fileExtension)) {
        const reader = new FileReader();

        // Event handler for when the file is loaded successfully
        reader.onload = (event) => {
          // Ensure the result is accessed only after the file has been fully loaded
          if (event.target && event.target.result) {
            try {
              const arrayBuffer = event.target.result;

              // Use XLSX to parse the Excel file
              const workbook = XLSX.read(arrayBuffer, { type: 'array' });

              // Get the first sheet and convert it to JSON
              const sheetName = workbook.SheetNames[0];
              const sheet = workbook.Sheets[sheetName];

              // Convert the sheet to JSON format
              const json = XLSX.utils.sheet_to_json(sheet, { header: 1 });

              const headers = json[0];

              if (!Array.isArray(headers)) {
                toast.error("❌ The uploaded file does not have a header row.");
                setFile(null);
                return;
              }

              const requiredColumns = [
                'reg_no',
                'class_id',
                'distance_to_school',
                'method_of_coming_to_school',
                'receiving_any_grade_5_scholarship',
                'receiving_any_samurdhi_aswesuma',
                'receiving_any_scholarship'
              ];

              const missingColumns = requiredColumns.filter(column => !headers.includes(column));

              if (missingColumns.length > 0) {
                toast.error(`❌ Missing columns: ${missingColumns.join(', ')}`);
                setFile(null);
                if (fileInputRef.current) {
                  fileInputRef.current.value = "";
                }

                return;
              }
              setFile(selectedFile);
            } catch (error) {
              console.error("Error reading file:", error);
              toast.error("❌ Error reading file. Please make sure it's a valid Excel file.");
              setFile(null);
            }
          }
        };

        // Event handler for errors in file reading
        reader.onerror = (error) => {
          console.error("FileReader error:", error);
          toast.error("❌ Failed to read the file.");
          setFile(null);
        };

        // Read the file as an ArrayBuffer (modern method)
        reader.readAsArrayBuffer(selectedFile);
      } else {
        toast.error("❌ Invalid file type! Please select a valid Excel file.");
        setFile(null); // Clear the file input if invalid
      }
    }
  };

  const handleImport = async () => {
    if (!file) return toast.error("Please select a file first!");
  
    const formData = new FormData();
    formData.append("file", file);
  
    try {
      const response = await fetch("http://127.0.0.1:8000/api/students/import", {
        method: "POST",
        body: formData,
      });
  
      const text = await response.text();
      console.log("Raw response:", text); // Debug line
  
      let data;
      try {
        data = JSON.parse(text);
      } catch (err) {
        throw new Error("Server did not return valid JSON.");
      }
  
      if (response.ok) {
        toast.success("🎉 Import Successful! All students have been imported successfully.");
        fetchStudents();
  
        setFile(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
        setImportForm(false);
      } else {
        const message = data?.message || "Import Failed!";
        const dbError = data?.error;
  
        // ✅ Show exact error message from Laravel
        if (dbError) {
          toast.error(`❌ ${message}: ${dbError}`);
        } else {
          toast.error(`❌ ${message}`);
        }
  
        setFile(null);
      }
    }catch (err) {
      console.error("Upload failed:", err);
    
      // Safely get error message
      const errorMessage =
        (err && typeof err === "object" && "message" in err)
          ? err.message
          : String(err);
    
      toast.error(`❌ Upload error: ${errorMessage}`);
      setFile(null);
    }
    
    
  };
  
  useEffect(() => {
    fetchStudents();
    setFiltered(keys);
  }, []);
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
    setEditingStudent(student);
  };



  const handleUpdate = async () => {
    if (!editingStudent) return;

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/students/${editingStudent.reg_no}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingStudent),
      });

      if (!response.ok) throw new Error("Error updating student");

      toast.success("Student updated successfully!");
      setStudents((prev) =>
        prev.map((student) => (student.reg_no === editingStudent.reg_no ? editingStudent : student))
      );
      setEditingStudent(null);
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
            <div className="flex items-center justify-center gap-0 mt-5 mb-5 relative">
              <div className="relative">
                <input
                  type="text"
                  placeholder={searchAttribute ? `Search by ${searchLabels[searchAttribute]}` : "Search..."}
                  value={searchValue}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 pr-10 border border-gray-300 rounded outline-none"
                />
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="absolute right-2 top-2.5 text-gray-500 hover:text-black"
                >
                  <Filter className="w-5 h-5" />
                </button>

                {filteredSuggestions.length > 0 && (
                  <ul className="absolute z-50 top-full mt-1 left-0 right-0 bg-white border border-gray-300 rounded shadow max-h-40 overflow-y-auto">
                    {filteredSuggestions.map((sug, idx) => (
                      <li
                        key={idx}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => handleSelectSuggestion(sug)}
                      >
                        {sug}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <Button
                onClick={handleSearch}
                className="bg-red-600 text-white px-4 py-2 ml-2 mr-2 rounded hover:bg-blue-700 transition"
              ><Search size={16} />
              
              </Button>
              {isDropdownOpen && (
                <div className="absolute top-14 left-0 w-[300px] mt-2 bg-white border border-gray-300 rounded shadow-md z-50">
                  <div className="p-2">
                    <select
                      className="w-full px-3 py-2 border rounded outline-none mb-2"
                      value={searchValue} 
                      onChange={(e) => {
                        setSearchAttribute(e.target.value);
                        setSearchValue(""); // clear previous input
                        setFilteredSuggestions([]);
                        setIsDropdownOpen(false); // optional: auto-close dropdown on select
                      }}
                    >
                      <option value="">Searh By</option>
                      {Object.entries(searchLabels).map(([key, label]) => (
                        <option key={key} value={key}>
                          {label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
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
              <p className="mt-2 text-3xl font-bold text-red-600">{classCount}</p>

            </div>
            <div className="border-blue-900 rounded-2xl border-t-4 bg-white p-6 shadow">

              <h3 className="text-maroon-700 text-lg font-bold">Receiving Scholarship</h3>
              <p className="mt-2 text-3xl font-bold text-blue-600">{students.length}</p>
            </div>
          </div>
          <main className="p-6 bg-gray-50 flex-1 overflow-y-auto">
            <div className="flex justify-left">
              <Button onClick={() => setShowForm(true)} className="bg-green-700 text-white mb-4">
                Admission Form
              </Button>

              </div>


              {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl relative">
            
      <StudentAdmissionForm setShowForm={setShowForm} />
          </div>
        </div>
      )}
            <Button
              onClick={() => setShowAddForm(true)}
              className="bg-green-600 text-white px-4 py-2 ml-2 mb-4 rounded"
            >
              Add New Student
            </Button>
            <Button
              onClick={() => setImportForm(true)}
              className="bg-green-600 text-white px-4 py-2 ml-2 mb-4 rounded"
            >
              Import Students
            </Button>
            {showImportForm && (
              <div className="flex justify-left mb-4 space-x-3 pt-4">
                <input type="file" accept=".xlsx,.xls,.csv" onChange={handleFileChange} ref={fileInputRef} />

                <Button
                  onClick={handleImport}
                  className="bg-green-600 text-white px-4 py-2 ml-2 rounded"
                >
                  Import
                </Button>
                <Button
                  onClick={() => setImportForm(false)}
                  className="bg-red-700 text-white px-4 py-2 rounded"
                >
                  Cancel
                </Button></div>
            )}




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


            <>
              <Table
                columns={["Reg No", "Class ID", "Distance", "Method", "Actions"]}
                data={students.map((student) => ({
                  "Reg No": student.reg_no,
                  "Class ID": student.class_id,
                  "Distance": student.distance_to_school,
                  "Method": student.method_of_coming_to_school,
                  Actions: (
                    <div className="flex gap-2">
                      <Button onClick={() => handleEditClick(student)} className="bg-blue-500 text-white"><Edit size={16} /></Button>
                      <Button onClick={() => handleDeleteClick(student.reg_no)} className="bg-red-600 text-white"><Trash2 size={16} /></Button>
                      <Button onClick={() => handleViewClick(student)} className="bg-purple-500 text-white"><Eye size={16} /></Button>
                    </div>
                  ),
                }))}
              />

              {/* Modal */}
              {editingStudent && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                  <div className="bg-white w-[400px] p-6 rounded-lg shadow-lg">

                    <h2 className="text-xl font-semibold mb-4">Edit Student</h2>
                    <div className="grid gap-4">
                      <Input value={editingStudent.reg_no} disabled />

                      <Input
                        type="number"
                        name="class_id"
                        value={editingStudent.class_id}
                        onChange={(e) =>
                          setEditingStudent({
                            ...editingStudent,
                            class_id: Number(e.target.value),
                          })
                        }
                      />

                      <Input
                        type="number"
                        name="distance_to_school"
                        value={editingStudent.distance_to_school ?? ""}
                        onChange={(e) =>
                          setEditingStudent({
                            ...editingStudent,
                            distance_to_school: Number(e.target.value),
                          })
                        }
                      />

                      <Input
                        name="method_of_coming_to_school"
                        value={editingStudent.method_of_coming_to_school}
                        onChange={(e) =>
                          setEditingStudent({
                            ...editingStudent,
                            method_of_coming_to_school: e.target.value,
                          })
                        }
                      />
                      <label>Receiving Grade 5 Scholarship</label>
                      <select
                        name="receiving_any_grade_5_scholarship"
                        value={editingStudent.receiving_any_grade_5_scholarship ? "true" : "false"}
                        onChange={(e) =>
                          setEditingStudent({
                            ...editingStudent,
                            receiving_any_grade_5_scholarship: e.target.value === "true",
                          })
                        }
                      >
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                      </select>


                      <label>Receiving Samurdhi/Aswesuma</label>
                      <select
                        name="receiving_any_samurdhi_aswesuma"
                        value={editingStudent.receiving_any_samurdhi_aswesuma ? "true" : "false"}
                        onChange={(e) =>
                          setEditingStudent({
                            ...editingStudent,
                            receiving_any_samurdhi_aswesuma: e.target.value === "true",
                          })
                        }
                      >
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                      </select>

                      <label>Receiving Other Scholarship</label>
                      <select
                        name="receiving_any_scholarship"
                        value={editingStudent.receiving_any_scholarship ? "true" : "false"}
                        onChange={(e) =>
                          setEditingStudent({
                            ...editingStudent,
                            receiving_any_scholarship: e.target.value === "true",
                          })
                        }
                      >
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                      </select>
                    </div>
                    <div className="mt-6 flex justify-end gap-3">
                      <Button onClick={handleUpdate} className="bg-green-600 text-white">
                        Save
                      </Button>
                      <Button onClick={() => setEditingStudent(null)} className="bg-red-500 text-white">
                        Cancel
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </>


            <ConfirmDeleteModal
              isOpen={isDeleteModalOpen}
              onClose={() => setIsDeleteModalOpen(false)}
              onConfirm={confirmDelete}
            />
          </main>
          {isViewModalOpen && viewingStudent && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl h-[90vh] p-8 relative overflow-y-auto">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6 border-b pb-3">
                  👩‍🎓 Student Information
                </h2>

                <div className="overflow-hidden rounded-lg border border-gray-200">
                  <table className="w-full text-sm text-center text-gray-800">
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
          {isSearchModalOpen && searchedStudents.length > 0 && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
             <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl h-[90vh] p-8 relative overflow-y-auto">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6 border-b pb-3">
                  🔍 Searched Student Details
                </h2>

                {/* Get the current student based on currentPage */}
                {(() => {
                  const student = searchedStudents[currentPage - 1];

                  return (
                    <div className="overflow-hidden rounded-lg border border-gray-200">
                      <table className="w-full text-sm text-left text-gray-800">
                        <tbody>
                          <tr className="even:bg-gray-50">
                            <th className="px-4 py-3 bg-gray-100 font-semibold w-1/2">🎓 Reg No</th>
                            <td className="px-4 py-3">{student.reg_no}</td>
                          </tr>
                          <tr className="even:bg-gray-50">
                            <th className="px-4 py-3 bg-gray-100 font-semibold">🏫 Class ID</th>
                            <td className="px-4 py-3">{student.class_id}</td>
                          </tr>
                          <tr className="even:bg-gray-50">
                            <th className="px-4 py-3 bg-gray-100 font-semibold">📍 Distance to School</th>
                            <td className="px-4 py-3">{student.distance_to_school ?? "N/A"} km</td>
                          </tr>
                          <tr className="even:bg-gray-50">
                            <th className="px-4 py-3 bg-gray-100 font-semibold">🚲 Method of Coming</th>
                            <td className="px-4 py-3">{student.method_of_coming_to_school ?? "N/A"}</td>
                          </tr>
                          <tr className="even:bg-gray-50">
                            <th className="px-4 py-3 bg-gray-100 font-semibold">🏅 Grade 5 Scholarship</th>
                            <td className="px-4 py-3">
                              {student.receiving_any_grade_5_scholarship ? (
                                <span className="text-green-600 font-medium">Yes</span>
                              ) : (
                                <span className="text-red-500 font-medium">No</span>
                              )}
                            </td>
                          </tr>
                          <tr className="even:bg-gray-50">
                            <th className="px-4 py-3 bg-gray-100 font-semibold">🟢 Samurdhi Beneficiary</th>
                            <td className="px-4 py-3">
                              {student.receiving_any_samurdhi_aswesuma ? (
                                <span className="text-green-600 font-medium">Yes</span>
                              ) : (
                                <span className="text-red-500 font-medium">No</span>
                              )}
                            </td>
                          </tr>
                          <tr className="even:bg-gray-50">
                            <th className="px-4 py-3 bg-gray-100 font-semibold">🎁 Other Scholarship</th>
                            <td className="px-4 py-3">
                              {student.receiving_any_scholarship ? (
                                <span className="text-green-600 font-medium">Yes</span>
                              ) : (
                                <span className="text-red-500 font-medium">No</span>
                              )}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  );
                })()}

                {/* Pagination controls */}
                {searchedStudents.length > 1 && (
                  <div className="flex justify-between items-center mt-4">
                    <button
                      onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
                    >
                      Prev
                    </button>
                    <span className="text-gray-700">
                      Page {currentPage} of {searchedStudents.length}
                    </span>
                    <button
                      onClick={() =>
                        setCurrentPage((prev) =>
                          prev < searchedStudents.length ? prev + 1 : prev
                        )
                      }
                      disabled={currentPage >= searchedStudents.length}
                      className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
                    >
                      Next
                    </button>
                  </div>
                )}

                <div className="mt-4 text-right">
                  <button
                    onClick={() => {
                      setIsSearchModalOpen(false);
                      setSearchValue("");
                      setSearchAttribute(""); 
                      setFilteredSuggestions([]);
                    }}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
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
