import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Student } from "@/types";
import { Toaster, toast } from "sonner";

interface EditStudentProps {
    editingStudent: Student | null;
    setEditingStudent: React.Dispatch<React.SetStateAction<Student | null>>;
    setStudents: React.Dispatch<React.SetStateAction<Student[]>>;
}

const EditStudent: React.FC<EditStudentProps> = ({
    editingStudent,
    setEditingStudent,
    setStudents,
}) => {
    if (!editingStudent) return null;

    const handleUpdate = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/students/${editingStudent.reg_no}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(editingStudent),
            });

            if (!response.ok) throw new Error("Error updating student");

            toast.success("Student updated successfully!");
            setStudents((prev) =>
                prev.map((student) =>
                    student.reg_no === editingStudent.reg_no ? editingStudent : student
                )
            );
            setEditingStudent(null);
        } catch (error) {
            toast.error("Error updating student.");
            console.error("Error updating student:", error);
        }
    };

    return (
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
                            setEditingStudent({ ...editingStudent, class_id: Number(e.target.value) })
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
                        value={editingStudent.method_of_coming_to_school ?? ""}
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
    );
};

export default EditStudent;
