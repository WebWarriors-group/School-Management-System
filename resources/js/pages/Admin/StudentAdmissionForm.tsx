import { useState } from "react";
import { router } from "@inertiajs/react";
import {Toaster,toast} from "sonner";

interface StudentAdmissionProps {
  setShowForm: (value: boolean) => void;
}

export default function StudentAdmission({ setShowForm }: StudentAdmissionProps) {
  const [regNo, setRegNo] = useState("");
  const [message, setMessage] = useState("");
   const [email, setEmail] = useState("");  
  const [loading, setLoading] = useState(false);

  const handleSendForm = async () => {
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("http://127.0.0.1:8000/api/send-admission-form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ reg_no: regNo, email }),
      });

      if (!response.ok) {
        throw new Error("Failed to send form.");
      }

      const data = await response.json();
      toast.success("Admission form sent successfully!");
      setRegNo("");
      setEmail("");
    } catch (error) {
      toast.error("Failed to send form. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow">
      <h2 className="text-lg font-bold mb-4">Send Admission Form</h2>
          <Toaster position="top-right" richColors />

      <input
        type="text"
        placeholder="Enter Student Reg No"
        value={regNo}
        onChange={(e) => setRegNo(e.target.value)}
        className="border rounded w-full p-2 mb-3"
        required
      />

      <div className="flex gap-2">
        <button
          onClick={handleSendForm}
          className="bg-green-500 text-white px-4 py-2 rounded"
          disabled={loading}
        >
          {loading ? "Sending..." : "Send"}
        </button>

       
        <button
          onClick={() => setShowForm(false)}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Cancel
        </button>
      </div>

      {message && <p className="mt-3 text-sm text-gray-700">{message}</p>}
    </div>
  );
}
