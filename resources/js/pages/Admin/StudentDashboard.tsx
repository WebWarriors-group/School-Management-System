import React, { useState, useEffect } from "react";
import { Head } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Table from "@/components/ui/table";
import axios from "axios";
// import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

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
    title: "Student Dashboard",
    href: "/student/dashboard",
  },
];


const StudentDashboard: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [searchRegNo, setSearchRegNo] = useState("");
  const [searchedStudent, setSearchedStudent] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [newStudent, setNewStudent] = useState<Student>({
    reg_no: "",
    class_id: 0,
    distance_to_school: undefined,
    method_of_coming_to_school: "",
    receiving_any_grade_5_scholarship: false,
    receiving_any_samurdhi_aswesuma: false,
    receiving_any_scholarship: false,
  });
  const [message, setMessage] = useState({ text: "", type: "" });
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/students")
      .then((response) => setStudents(response.data))
      .catch((error) => console.error("Error fetching students:", error));
  }, []);

  const addStudent = async () => {
    if (!newStudent.reg_no || newStudent.class_id === 0) {
      setMessage({ text: "Please provide valid details.", type: "error" });
      setTimeout(() => setMessage({ text: "", type: "" }), 3000);
      return;
    }

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/students", newStudent);
      setStudents((prev) => [...prev, response.data]);
      setNewStudent({
        reg_no: "",
        class_id: 0,
        distance_to_school: undefined,
        method_of_coming_to_school: "",
        receiving_any_grade_5_scholarship: false,
        receiving_any_samurdhi_aswesuma: false,
        receiving_any_scholarship: false,
      });
      setMessage({ text: "Student Added Successfully!", type: "success" });
      setTimeout(() => setMessage({ text: "", type: "" }), 3000);
      setShowAddForm(false);
    } catch (error) {
      setMessage({ text: "Failed to add student. Please try again.", type: "error" });
      setTimeout(() => setMessage({ text: "", type: "" }), 3000);
    }
  };

  
  // const viewStudentDetails = async (reg_no) => {
  //   try {
  //     const response = await axios.get(`http://127.0.0.1:8000/api/students?reg_no=${regNo}`);
      
  //     if (response.data.length > 0) {
  //       setSearchedStudent(response.data[0]); // Assuming it's an array
  //     } else {
  //       alert("No student found with this Registration Number.");
  //       setSearchedStudent(null);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching student details:", error);
  //     alert("Error occurred while fetching student details.");
  //     setSearchedStudent(null);
  //   }
  // };
  const deleteStudent = async (reg_no: string) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/students/${reg_no}`);
      setStudents((prev) => prev.filter(student => student.reg_no !== reg_no));
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };
  
  const classData = [
    { name: "6-9", value: students.filter(s => s.class_id >= 6 && s.class_id <= 9).length },
    { name: "10-11", value: students.filter(s => s.class_id >= 10 && s.class_id <= 11).length },
    { name: "12-13", value: students.filter(s => s.class_id >= 12 && s.class_id <= 13).length }
  ];

  // const genderData = [
  //   { name: "Male", value: students.filter(s => s.gender === "male").length },
  //   { name: "Female", value: students.filter(s => s.gender === "female").length }
  // ];
  const searchStudent = async () => {
    setIsLoading(true);
    if (!searchRegNo.trim()) {
      alert("Please enter a valid Registration Number.");
      setIsLoading(false);
      return;
    }
  
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/students?reg_no=${searchRegNo}`);
      const student = response.data.length ? response.data[0] : null;
      setSearchedStudent(student);
      setIsModalOpen(!!student); // Open modal if student found
    } catch (error) {
      console.error("Error searching for student:", error);
      setSearchedStudent(null);
    } finally {
      setIsLoading(false);
    }
  };
  
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const editStudent = (student: Student) => {
    setEditingStudent(student);
  };
  
  const updateStudent = async () => {
    try {
      await axios.put(`http://127.0.0.1:8000/api/students/${editingStudent?.reg_no}`, editingStudent);
      setStudents((prev) =>
        prev.map((student) =>
          student.reg_no === editingStudent?.reg_no ? editingStudent : student
        )
      );
      setEditingStudent(null); // Exit edit mode after updating
    } catch (error) {
      console.error("Error updating student:", error);
    }
  };
  
  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditingStudent({
      ...editingStudent!,
      [e.target.name]: e.target.value,
    });
  };
  
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Student Dashboard" />
      <div className="flex h-screen bg-white">
        <div className="flex-1 flex flex-col">
          <header className="flex justify-between items-center p-4 border-b bg-white shadow-sm">
            <h1 className="text-xl font-semibold text-maroon-700">Student Dashboard</h1>
            <div className="flex items-center gap-2">
  <Input 
    value={searchRegNo} 
    onChange={(e) => setSearchRegNo(e.target.value)}
    className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-maroon-500"
    placeholder="Enter Registration Number"
  />
  <Button 
    onClick={searchStudent} 
    className="bg-red-700 text-white px-4 py-2 rounded-md hover:bg-maroon-800 transition duration-300 focus:outline-none focus:ring-2 focus:ring-maroon-500"
    aria-label="Search Student"
  >
    {isLoading ? "Searching..." : "Search"}
  </Button>
</div>
          </header>

          <main className="p-6 bg-gray-50 flex-1 overflow-y-auto">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                        <div className="border-green-900 rounded-2xl border-t-4 bg-white p-6 shadow">
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

            {!showAddForm && (
              <Button onClick={() => setShowAddForm(true)} className="bg-green-700 text-white mb-4">
                Add New Student
              </Button>
            )}

            {showAddForm && (
              <Card className="mb-8">
                <CardContent> Student Details
                  <Input
                    type="text"
                    placeholder="Registration No"
                    value={newStudent.reg_no}
                    onChange={(e) => setNewStudent({ ...newStudent, reg_no: e.target.value })}
                    className="mb-4"
                  />
                  <Input
                    type="text"
                    placeholder="Class ID"
                    value={newStudent.class_id}
                    onChange={(e) => setNewStudent({ ...newStudent, class_id: Number(e.target.value) })}
                    className="mb-4"
                  />
 <Input
                type="text"
                placeholder="Method of Coming to School"
                value={newStudent.method_of_coming_to_school}
                onChange={(e) => setNewStudent({ ...newStudent, method_of_coming_to_school: e.target.value })}
                className="mb-4"
              />
              <div className="mb-4">
                <label>
                  <input
                    type="checkbox"
                    checked={newStudent.receiving_any_grade_5_scholarship}
                    onChange={(e) =>
                      setNewStudent({ ...newStudent, receiving_any_grade_5_scholarship: e.target.checked })
                    }
                    className="mr-2"
                  />
                  Grade 5 Scholarship
                </label>
              </div>
              <div className="mb-4">
                <label>
                  <input
                    type="checkbox"
                    checked={newStudent.receiving_any_samurdhi_aswesuma}
                    onChange={(e) =>
                      setNewStudent({ ...newStudent, receiving_any_samurdhi_aswesuma: e.target.checked })
                    }
                    className="mr-2"
                  />
                  Samurdhi/Aswesuma
                </label>
              </div>
              <div className="mb-4">
                <label>
                  <input
                    type="checkbox"
                    checked={newStudent.receiving_any_scholarship}
                    onChange={(e) =>
                      setNewStudent({ ...newStudent, receiving_any_scholarship: e.target.checked })
                    }
                    className="mr-2"
                  />
                  Receiving any Scholarship
                </label></div>

{message.text && (
  <div
    className={`fixed top-20 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-md text-center transition-opacity duration-300 ${
      message.type === "success" ? "bg-green-100 text-green-700 border border-green-400" : "bg-red-100 text-red-700 border border-red-400"
    }`}
  >
    {message.text}
  </div>
)}

                  <Button onClick={addStudent} className="bg-green-700 text-white mr-2">
                    Save
                  </Button>
                  
                  <Button onClick={() => setShowAddForm(false)} className="bg-red-600 text-white">
                    Cancel
                  </Button>

                </CardContent>
              </Card>
            )}

<Table
          columns={["Reg No", "Class ID",  "Actions"]}
          data={students.map(student => ({
            "Reg No": student.reg_no,
            "Class ID": student.class_id,
            // "Gender": student.gender,
            "Actions": (
              <div className="flex gap-2">
               <Button onClick={() => editStudent(student)} className="bg-blue-500 text-white">Edit</Button>
               {editingStudent && (
  <div className="bg-gray-100 p-4 rounded-md mb-4">
    <h2 className="font-bold mb-2">Edit Student</h2>
    <div className="mb-2">
      <label className="block">Reg No:</label>
      <Input
        type="text"
        name="reg_no"
        value={editingStudent.reg_no}
        onChange={handleEditChange}
        disabled // Assuming Reg No shouldn't be changed
        className="mb-2"
      />
    </div>
    <div className="mb-2">
      <label className="block">Class ID:</label>
      <Input
        type="number"
        name="class_id"
        value={editingStudent.class_id}
        onChange={handleEditChange}
        className="mb-2"
      />
    </div>
    <div className="mb-2">
      <label className="block">Gender:</label>
      <Input
        type="text"
        name="gender"
        // value={editingStudent.gender}
        onChange={handleEditChange}
        className="mb-2"
      />
    </div>
    <Button onClick={updateStudent} className="bg-blue-500 text-white">Save</Button>
    <Button onClick={() => setEditingStudent(null)} className="bg-gray-400 text-white ml-2">Cancel</Button>
  </div>
)}

                <Button 
          onClick={() => deleteStudent(student.reg_no)} 
          className="bg-red-600 text-white"
        >
          Delete
        </Button>
                <Button className="bg-green-500 text-white">View</Button>
              </div>
            ),
          }))}
        />

<div className="grid grid-cols-2 gap-6 mt-6">
          <div>
            <h2 className="text-maroon-700 font-bold">Class Categories</h2>
            {/* <PieChart width={300} height={300}>
              <Pie data={classData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100}>
                {classData.map((entry, index) => (<Cell key={index} fill={["#E63946", "#F1FAEE", "#A8DADC"][index]} />))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart> */}
          </div>

          <div>
            <h2 className="text-maroon-700 font-bold">Gender Distribution</h2>
            {/* <PieChart width={300} height={300}>
              <Pie data={genderData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100}>
                {genderData.map((entry, index) => (<Cell key={index} fill={["#457B9D", "#E63946"][index]} />))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart> */}
          </div>
        </div>
          </main>                     
        </div>
      </div>
    </AppLayout>
  );
};

export default StudentDashboard;
