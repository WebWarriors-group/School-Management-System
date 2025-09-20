import React from 'react';

interface StudentAcademicFormProps {
  form: {
    reg_no: string;
    class_id: string;
    distance_to_school: string;
    method_of_coming_to_school: string;
    grade_6_9_asthectic_subjects: string;
    grade_10_11_basket1_subjects: string;
    grade_10_11_basket2_subjects: string;
    grade_10_11_basket3_subjects: string;
    receiving_any_grade_5_scholarship: boolean;
    receiving_any_samurdhi_aswesuma: boolean;
    receiving_any_scholarship: boolean;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
}

const StudentAcademicForm: React.FC<StudentAcademicFormProps> = ({ form, handleChange }) => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-2 border-b border-gray-200">
        Student Academic Details
      </h2>

      <div className="space-y-6">
        {/* Basic Information Section */}
        <section>
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Basic Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Registration Number <span className="text-red-500">*</span>
              </label>
              <input
                name="reg_no"
                type="text"
                value={form.reg_no}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                required
                placeholder="Enter registration number"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Class <span className="text-red-500">*</span>
              </label>
              <input
                name="class_id"
                type="text"
                value={form.class_id}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                required
                placeholder="Enter class"
              />
            </div>
          </div>
        </section>

        {/* Transportation Section */}
        <section>
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Transportation Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Distance to School (km)
              </label>
              <div className="relative">
                
                <input
                  name="distance_to_school"
                  type="number"
                  min="0"
                  step="0.1"
                  value={form.distance_to_school}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  placeholder="e.g. 3.5 km"
                />
                
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Method of Transportation
              </label>
              <select
                name="method_of_coming_to_school"
                value={form.method_of_coming_to_school}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              >
                <option value="">Select transportation method</option>
                <option value="Walking">Walking</option>
                <option value="School Bus">School Bus</option>
                <option value="Public Transport">Public Transport</option>
                <option value="Private Vehicle">Private Vehicle</option>
                <option value="Bicycle">Bicycle</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
        </section>

        {/* Academic Subjects Section */}
        <section>
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Academic Subjects</h3>
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Grade 6–9 Aesthetic Subjects
            </label>
            <select
              name="grade_6_9_asthectic_subjects"
              value={form.grade_6_9_asthectic_subjects}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            >
              <option value="">Select an aesthetic subject</option>
              <option value="Art">Art</option>
              <option value="Dance">Dance</option>
              <option value="Music">Music</option>
              <option value="Drama & Theatre">Drama & Theatre</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Basket 1 Subjects
              </label>
              <select
                name="grade_10_11_basket1_subjects"
                value={form.grade_10_11_basket1_subjects}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              >
                <option value="">Select subject</option>
                <option value="Commerce">Commerce</option>
                <option value="Civics">Civics</option>
                <option value="Geography">Geography</option>
                <option value="Home Science">Home Science</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Basket 2 Subjects
              </label>
              <select
                name="grade_10_11_basket2_subjects"
                value={form.grade_10_11_basket2_subjects}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              >
                <option value="">Select subject</option>
                <option value="Design & Technology">Design & Technology</option>
                <option value="Tamil Literature">Tamil Literature</option>
                <option value="English Literature">English Literature</option>
                <option value="Sinhala Literature">Sinhala Literature</option>
                <option value="Art">Art</option>
                <option value="Dance">Dance</option>
                <option value="Music">Music</option>
                <option value="Drama & Theatre">Drama & Theatre</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Basket 3 Subjects
              </label>
              <select
                name="grade_10_11_basket3_subjects"
                value={form.grade_10_11_basket3_subjects}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              >
                <option value="">Select subject</option>
                <option value="ICT">ICT</option>
                <option value="Health Science">Health Science</option>
                <option value="Agriculture">Agriculture</option>
              </select>
            </div>
          </div>
        </section>

        {/* Scholarships Section */}
        <section>
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Scholarships & Benefits</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="grade5Scholarship"
                name="receiving_any_grade_5_scholarship"
                checked={form.receiving_any_grade_5_scholarship}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="grade5Scholarship" className="ml-2 block text-sm text-gray-700">
                Grade 5 Scholarship
              </label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="samurdhiAswesuma"
                name="receiving_any_samurdhi_aswesuma"
                checked={form.receiving_any_samurdhi_aswesuma}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="samurdhiAswesuma" className="ml-2 block text-sm text-gray-700">
                Samurdhi/Aswesuma
              </label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="otherScholarship"
                name="receiving_any_scholarship"
                checked={form.receiving_any_scholarship}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="otherScholarship" className="ml-2 block text-sm text-gray-700">
                Other Scholarship
              </label>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default StudentAcademicForm;