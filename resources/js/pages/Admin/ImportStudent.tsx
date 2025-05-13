
import { useRef, useState } from "react";
import * as XLSX from "xlsx";
import { Toaster, toast } from "sonner";
import { Button } from "@/components/ui/button";

interface ImportStudentProps {
    fetchStudents: () => void;
    onClose: () => void;
}

const ImportStudent = ({ fetchStudents, onClose }: ImportStudentProps) => {
    const [file, setFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.length) {
            const selectedFile = e.target.files[0];
            const fileExtension = selectedFile.name.split('.').pop()?.toLowerCase();

            if (fileExtension && ['xlsx', 'xls'].includes(fileExtension)) {
                const reader = new FileReader();

                reader.onload = (event) => {
                    if (event.target && event.target.result) {
                        try {
                            const arrayBuffer = event.target.result;
                            const workbook = XLSX.read(arrayBuffer, { type: 'array' });
                            const sheetName = workbook.SheetNames[0];
                            const sheet = workbook.Sheets[sheetName];
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

                            const missingColumns = requiredColumns.filter(col => !headers.includes(col));
                            if (missingColumns.length > 0) {
                                toast.error(`❌ Missing columns: ${missingColumns.join(', ')}`);
                                setFile(null);
                                if (fileInputRef.current) fileInputRef.current.value = "";
                                return;
                            }

                            setFile(selectedFile);
                        } catch (error) {
                            console.error("Error reading file:", error);
                            toast.error("❌ Error reading file. Please upload a valid Excel file.");
                            setFile(null);
                        }
                    }
                };

                reader.onerror = (error) => {
                    console.error("FileReader error:", error);
                    toast.error("❌ Failed to read the file.");
                    setFile(null);
                };

                reader.readAsArrayBuffer(selectedFile);
            } else {
                toast.error("❌ Invalid file type! Please select an Excel file.");
                setFile(null);
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
            let data;
            try {
                data = JSON.parse(text);
            } catch {
                throw new Error("Server did not return valid JSON.");
            }

            if (response.ok) {
                toast.success("🎉 Import Successful!");
                fetchStudents();
                setFile(null);
                if (fileInputRef.current) fileInputRef.current.value = "";
                onClose();
            } else {
                const message = data?.message || "Import Failed!";
                const dbError = data?.error;
                toast.error(`❌ ${message}${dbError ? `: ${dbError}` : ""}`);
                setFile(null);
            }
        } catch (err) {
            console.error("Upload failed:", err);
            toast.error(`❌ Upload error: ${err instanceof Error ? err.message : String(err)}`);
            setFile(null);
        }
    };

    return (
        <div className="flex justify-left mb-4 space-x-3 pt-4">
            <input type="file" accept=".xlsx,.xls,.csv" onChange={handleFileChange} ref={fileInputRef} />

            <Button onClick={handleImport} className="bg-green-600 text-white px-4 py-2 ml-2 rounded">
                Import
            </Button>

            <Button onClick={onClose} className="bg-red-700 text-white px-4 py-2 rounded">
                Cancel
            </Button>
        </div>
    );
};

export default ImportStudent;
