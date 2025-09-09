
import { useRef, useState } from "react";
import * as XLSX from "xlsx";
import { Toaster, toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Upload, FileText , X, Download, AlertCircle} from "lucide-react"; 
import('./Dashboardoverview') 

interface ImportStudentProps {
    fetchStudents: () => void;
    onClose: () => void;
}

const ImportStudent = ({ fetchStudents, onClose }: ImportStudentProps) => {
    const [file, setFile] = useState<File | null>(null);
    const [isUploading,setIsUploading] = useState(false);
    const [validationErrors , setValidationErrors] = useState<string[]>([]);
    const fileInputRef = useRef<HTMLInputElement | null>(null);
const MAX_FILE_SIZE = 5 * 1024 *1024;
const REQUIRED_COLUMNS = [
    'reg_no',
    'class_id',
    'distance_to_school',
    'method_of_coming_to_school',
    'receiving_any_grade_5_scholarship',
    'receiving_any_samurdhi_aswesuma',
    'receiving_any_scholarship',
];

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        setValidationErrors([]);
        if(!e.target.files?.length) return;
       
            const selectedFile = e.target.files[0];
            const fileExtension = selectedFile.name.split('.').pop()?.toLowerCase();

            if (!['xlsx', 'xls','csv'].includes(fileExtension || '')) {
                toast.error (" Invalid file type! Please upload an Excel file (.xlsx, .xls) or CSV.");
                resetFileInput();
                return;
            }


            if(selectedFile.size > MAX_FILE_SIZE){
                toast.error(`File too large! Maximum size is ${MAX_FILE_SIZE / 1024 / 1024 } MB.`);
                resetFileInput();
                return;
            }
                
                const reader = new FileReader();

                reader.onload = (event) => {
                          try {
                    if (!event.target?.result) throw new Error("Failed to read file");                  
                            const arrayBuffer = event.target.result;
                            const workbook = XLSX.read(arrayBuffer, { type: 'array' });
                            const sheetName = workbook.SheetNames[0];
                            const sheet = workbook.Sheets[sheetName];
                            const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

    
                            if (!jsonData.length || !Array.isArray(jsonData[0])) {
                                throw new Error("File appears to be empty or corrupted");
                            }
                        const headers = jsonData[0]?.map(h => String(h).trim().toLowerCase());
const missingColumns = REQUIRED_COLUMNS.filter(col => !headers.includes(col.toLowerCase()));

                            if (missingColumns.length > 0) {
                                setValidationErrors(missingColumns.map(col => ` Missing columns: "${col}"`));
                                resetFileInput();
                                return;
                            }

                      const dataRows = jsonData.slice(1);
                      if(dataRows.length === 0){
                        setValidationErrors(["File contains no data rows"]);
                        resetFileInput();
                        return;
                      }     


                            setFile(selectedFile);
                            toast.success("File validated successfully!");
                        } catch (error) {
                            console.error("Error processing file:", error);
                            toast.error("❌ Error processing file. Please check the format and Try again.");
                            resetFileInput();
                        }
                    
                };

                reader.onerror = () => {
                    toast.error("❌ Failed to read the file.");
                    resetFileInput();
                };

                reader.readAsArrayBuffer(selectedFile);
            
    };

    const resetFileInput = () => {
        setFile(null);
        if(fileInputRef.current) fileInputRef.current.value = "";
    };
    const handleImport = async () => {
        if (!file) {
            toast.error("Please select a valid file first!");
            return ;
        }
 setIsUploading(true);
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
                throw new Error("Server returned an invalid response");
            }

            if (response.ok) {
                toast.success("🎉 Students imported Successfully!");
                fetchStudents();
                resetFileInput();
                onClose();
            } else {
                const message = data?.message || "Import Failed!";
                const errorDetails = data?.error || data?.details;
                const errorMessage = errorDetails ? `${message}: ${errorDetails}` : message;
                toast.error(`❌ ${errorMessage}`);
                
            }
        } catch (err) {
            console.error("Upload failed:", err);
            toast.error(`❌ Upload error: ${err instanceof Error ? err.message : "Unknown error"}`);
           
        } finally{
            setIsUploading(false);
        }
    };
const downloadSampleFile = () => {
        
        const wb = XLSX.utils.book_new();
        const sampleData = [
            REQUIRED_COLUMNS,
            ["STU001", "CLASS-A", "2.5", "Bus", "Yes", "No", "Yes"],
            ["STU002", "CLASS-B", "1.2", "Walking", "No", "Yes", "No"]
        ];
        const ws = XLSX.utils.aoa_to_sheet(sampleData);
        XLSX.utils.book_append_sheet(wb, ws, "Students");
        XLSX.writeFile(wb, "student_import_sample.xlsx");
    };
    return (
        <div className="space-y-2 p-4 bg-white rounded-lg shadow-md">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-800">Import Students</h2>
                <Button 
                    onClick={onClose} 
                    variant="outline" 
                    size="sm"
                    className="flex items-center gap-1"
                >
                    <X size={16} /> Close
                </Button>
            </div>
            
            <div className="space-y-2">
                <div className="flex items-center justify-between">
                    <p className="text-gray-600">
                        Upload an Excel file with student data. All required columns must be present.
                    </p>
  <Button 
                        onClick={downloadSampleFile}
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-1"
                    >
                        <Download size={16} /> Sample File
                    </Button>
                </div>
                
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                    <input
                     type="file"
                        accept=".xlsx,.xls,.csv"
                        onChange={handleFileChange}
                        ref={fileInputRef}
                        className="hidden"
                        id="file-upload"
                    />
                    
                    <label 
                        htmlFor="file-upload" 
                        className="cursor-pointer flex flex-col items-center justify-center"
                    >
                        <Upload className="h-4 w-4 text-gray-400 mb-3" />
                        <p className="text-lg font-medium text-gray-700 mb-1">
                            {file ? file.name : "Click to upload or drag and drop"}
                        </p>
                        <p className="text-sm text-gray-500">
                            Excel files (.xlsx, .xls) or CSV up to {MAX_FILE_SIZE / 1024 / 1024}MB
                        </p>
                    </label>
                </div>
                
                {validationErrors.length > 0 && (
                    <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
                        <div className="flex items-start">
                            <AlertCircle className="h-5 w-5 text-red-500 mr-2 mt-0.5" />
                             <div>
                                <h3 className="text-sm font-medium text-red-800">Validation Errors</h3>
                                <ul className="mt-2 text-sm text-red-700 list-disc pl-5 space-y-1">
                                    {validationErrors.map((error, index) => (
                                        <li key={index}>{error}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                )}
                
                {file && (
                    <div className="flex items-center justify-between bg-blue-50 p-3 rounded-lg">
                        <div className="flex items-center">
                            <FileText className="h-5 w-5 text-blue-500 mr-2" />
                            <span className="text-sm font-medium text-blue-800">
                                {file.name} ({(file.size / 1024).toFixed(1)} KB)
                            </span>
                        </div>
                        <Button 
                            onClick={resetFileInput}
                            variant="ghost"
                            size="sm"
                            className="text-blue-600 hover:text-blue-800"
                        >
                            Remove
                        </Button>
                    </div>
                )}
            </div>
            
            <div className="flex justify-end space-x-3 pt-4">
                <Button 
                    onClick={onClose} 
                    variant="outline"
                    disabled={isUploading}
                >
                    Cancel
                </Button>
                <Button
                    onClick={handleImport}
                    disabled={!file || isUploading}
                    className="flex items-center gap-2"
                >
                    {isUploading ? (
                        <>
                            <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Processing...
                        </>
                    ) : (
                        <>
                            <Upload size={16} /> Import Students
                        </>
                    )}
                </Button>
            </div>
            
            <Toaster richColors position="top-right" />
        </div>
    );
};

export default ImportStudent;