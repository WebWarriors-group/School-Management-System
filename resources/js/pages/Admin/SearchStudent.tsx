import React, { useState } from "react";
import { Filter, Search } from "lucide-react";
import { toast } from "sonner";
import { Student } from "@/types"; // adjust import path as needed

interface SearchStudentProps {
  students: Student[];
}

const searchLabels: Record<string, string> = {
  reg_no: "Reg. No",
  class_id: "Class",
  distance_to_school: "Distance",
  method_of_coming_to_school: "Method",
};

const SearchStudent: React.FC<SearchStudentProps> = ({ students }) => {
  const [searchAttribute, setSearchAttribute] = useState<string>("");
  const [searchValue, setSearchValue] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchedStudents, setSearchedStudents] = useState<Student[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

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
      suggestions = students
        .map((student) => String(student[searchAttribute as keyof Student] ?? ""))
        .filter((val) => val.toLowerCase().includes(input.toLowerCase()));
    } else {
      suggestions = students
        .flatMap((student) => keys.map((key) => String(student[key as keyof Student] ?? "")))
        .filter((val) => val.toLowerCase().includes(input.toLowerCase()));
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
      matches = students.filter((student) =>
        String(student[searchAttribute as keyof Student])
          .toLowerCase()
          .includes(searchValue.toLowerCase())
      );
    } else {
      matches = students.filter((student) =>
        keys.some((key) =>
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

  return (
    <>
      <div className="relative  max-w-xl">
        
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

      <button
        onClick={handleSearch}
        className="bg-red-600 text-white px-4 py-2 ml-2 mr-2 rounded hover:bg-blue-700 transition"
      >
        <Search size={16} />
      </button>

      {/* Dropdown to choose search attribute */}
 {isDropdownOpen && (
                <div className="absolute top-14 left-0 w-[300px] mt-2 bg-white border border-gray-300 rounded shadow-md z-50">
                  <div className="p-2">
                    <select
                      className="w-full px-3 py-2 border rounded outline-none mb-2"
                      value={searchValue} 
                      onChange={(e) => {
                        setSearchAttribute(e.target.value);
                        setSearchValue(""); 
                        setFilteredSuggestions([]);
                        setIsDropdownOpen(false); 
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

      {/* Search Modal */}
      {isSearchModalOpen && searchedStudents.length > 0 && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl h-[90vh] p-8 relative overflow-y-auto">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-6 border-b pb-3">
              🔍 Searched Student Details
            </h2>

            {/* Show current student */}
            {(() => {
              const student = searchedStudents[currentPage - 1];
              return (
                <div className="overflow-hidden rounded-lg border border-gray-200">
                  <table className="w-full text-sm text-left text-gray-800">
                    <tbody>
                      <tr className="even:bg-gray-50">
                        <th className="px-4 py-3 bg-gray-100 font-semibold">🎓 Reg No</th>
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

            {/* Pagination */}
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

            {/* Close button */}
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
    </>
  );
};

export default SearchStudent;
