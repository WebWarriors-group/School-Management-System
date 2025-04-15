import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Toaster,toast } from "sonner";

interface Student {
  reg_no: string;
  class_id: number;
  distance_to_school?: number;
  method_of_coming_to_school?: string;
  receiving_any_grade_5_scholarship: boolean;
  receiving_any_samurdhi_aswesuma: boolean;
  receiving_any_scholarship: boolean;
}

export default function EditStudent() {
  const { reg_no } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState<Student | null>(null);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/students/${reg_no}`)
      .then((res) => res.json())
      .then((data) => setStudent(data))
      .catch(() => toast.error("Failed to load student data"));
  }, [reg_no]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (!student) return;
    const { name, value } = e.target;

    setStudent({
      ...student,
      [name]:
        name === "class_id" || name === "distance_to_school"
          ? Number(value)
          : name.startsWith("receiving_")
          ? value === "true"
          : value,
    });
  };

  const handleUpdate = async () => {
    if (!student) return;

    try {
      const res = await fetch(`http://127.0.0.1:8000/api/students/${student.reg_no}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(student),
      });

      if (!res.ok) throw new Error("Update failed");

      toast.success("✅ Student updated successfully!");
      navigate("/"); // Go back to list
    } catch (err) {
      console.error(err);
      toast.error("❌ Failed to update student");
    }
  };

  if (!student) return <div>Loading...</div>;

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-2xl font-semibold">Edit Student</h2>
      <Input disabled value={student.reg_no} />
      <Input name="class_id" value={student.class_id} onChange={handleChange} />
      <Input
        name="distance_to_school"
        value={student.distance_to_school ?? ""}
        onChange={handleChange}
      />
      <Input
        name="method_of_coming_to_school"
        value={student.method_of_coming_to_school ?? ""}
        onChange={handleChange}
      />

      

      <div className="flex gap-4 pt-4">
        <Button onClick={handleUpdate} className="bg-green-600 text-white">
          Save Changes
        </Button>
        <Button onClick={() => navigate("/")} className="bg-gray-500 text-white">
          Cancel
        </Button>
      </div>
    </div>
  );
}
