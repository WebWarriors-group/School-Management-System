import React, { useState, useEffect } from "react";
import { Toaster, toast } from "sonner";
import { Button } from "@/components/ui/button"; // Adjust import paths as per your project
import { Input } from "@/components/ui/input"; // Adjust import paths as per your project
import { Student } from "@/types";


interface AddStudentProps {
    onClose: () => void;
    onStudentAdded: (student: Student) => void;
}

const AddStudent: React.FC<AddStudentProps> = ({ onClose, onStudentAdded }) => {
    const [newStudent, setNewStudent] = useState<Student>({
        reg_no:"",
        class_id: 0,
        distance_to_school: 0,
        method_of_coming_to_school: "",
        receiving_any_grade_5_scholarship: false,
        receiving_any_samurdhi_aswesuma: false,
        receiving_any_scholarship: false,
        admission_date:"",
    });

    const [errors, setErrors] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);

    const validateFields = (student: Student): string[] => {
        const errors = [];
        const regNoPattern = /^REG-\d{5}$/;

        if (!student.reg_no) {
            errors.push("Registration number is required.");
        } else if (!regNoPattern.test(student.reg_no)) {
            errors.push("Registration number must be in the format REG-XXXXX.");
        }

        // if (student.distance_to_school < 0 || isNaN(student.distance_to_school)) {
        //   errors.push("Distance to school must be a valid number ≥ 0.");
        // }

        return errors;
    };

    const handleInputChangeAdd = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewStudent((prev) => ({ ...prev, [name]: value }));
        setErrors(validateFields(newStudent));
    };

    const handleBlur = () => {
        setErrors(validateFields(newStudent));
    };

    const addStudent = async () => {
        const validationErrors = validateFields(newStudent);
        if (validationErrors.length > 0) {
            validationErrors.forEach((error) => toast.error(error));
            return;
        }

        try {
            setLoading(true);
            const response = await fetch("http://127.0.0.1:8000/api/students", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newStudent),
            });

            const data = await response.json();
            if (response.ok) {
                toast.success("Student added successfully!");
                onStudentAdded(data.student);
            } else {
                toast.error(data.message || "Failed to add student.");
            }
        } catch (error) {
            console.error("Error adding student:", error);
            toast.error("An error occurred.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={(e) => e.preventDefault()}>
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white p-6 rounded-lg shadow-lg w-[500px] max-w-full">
                    <h3 className="text-lg font-semibold mb-4">Add Student Details</h3>

                    <div className="space-y-3">
                        <Input
                            type="text"
                            name="reg_no"
                            placeholder="Registration No"
                            value={newStudent.reg_no}
                            onChange={handleInputChangeAdd}
                            onBlur={handleBlur}
                            className="w-full border border-gray-300 px-4 py-2 rounded"
                        />
                        {errors.length > 0 && (
                            <ul className="text-red-500">
                                {errors.map((err, i) => (
                                    <li key={i}>{err}</li>
                                ))}
                            </ul>
                        )}

                        <Input
                            type="number"
                            name="class_id"
                            placeholder="Class ID"
                            value={newStudent.class_id}
                            onChange={handleInputChangeAdd}
                            className="w-full border border-gray-300 px-4 py-2 rounded"
                        />

                        <Input
                            type="number"
                            name="distance_to_school"
                            placeholder="Distance to School (km)"
                            value={newStudent.distance_to_school}
                            onChange={handleInputChangeAdd}
                            className="w-full border border-gray-300 px-4 py-2 rounded"
                        />

                        <Input
                            type="text"
                            name="method_of_coming_to_school"
                            placeholder="Method of Coming to School"
                            value={newStudent.method_of_coming_to_school}
                            onChange={handleInputChangeAdd}
                            className="w-full border border-gray-300 px-4 py-2 rounded"
                        />

                        <div className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                checked={newStudent.receiving_any_grade_5_scholarship}
                                onChange={(e) =>
                                    setNewStudent((prev) => ({
                                        ...prev,
                                        receiving_any_grade_5_scholarship: e.target.checked,
                                    }))
                                }
                            />
                            <label>Grade 5 Scholarship</label>
                        </div>

                        <div className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                checked={newStudent.receiving_any_samurdhi_aswesuma}
                                onChange={(e) =>
                                    setNewStudent((prev) => ({
                                        ...prev,
                                        receiving_any_samurdhi_aswesuma: e.target.checked,
                                    }))
                                }
                            />
                            <label>Samurdhi/Aswesuma</label>
                        </div>

                        <div className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                checked={newStudent.receiving_any_scholarship}
                                onChange={(e) =>
                                    setNewStudent((prev) => ({
                                        ...prev,
                                        receiving_any_scholarship: e.target.checked,
                                    }))
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
                                onClick={onClose}
                                className="bg-red-700 text-white px-4 py-2 rounded"
                            >
                                Cancel
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default AddStudent;
