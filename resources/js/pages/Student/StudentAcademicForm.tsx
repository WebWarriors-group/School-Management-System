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
    <div>
      <h4 className="text-2xl font-semibold text-yellow-900 mb-4 text-center">
        Student Academic Details
      </h4>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-lg font-medium text-gray-700 mb-2">Registration No *</label>
          <input
            name="reg_no"
            type="text"
            value={form.reg_no}
            onChange={handleChange}
            className="w-full border-2 border-gray-300 rounded-md px-4 py-3"
            required
          />
        </div>

        <div>
          <label className="block text-lg font-medium text-gray-700 mb-2">Class *</label>
          <input
            name="class_id"
            type="text"
            value={form.class_id}
            onChange={handleChange}
            className="w-full border-2 border-gray-300 rounded-md px-4 py-3"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-lg font-medium text-gray-700 mb-2">
            Distance to School (km)
          </label>
          <input
            name="distance_to_school"
            type="number"
            min="0"
            value={form.distance_to_school}
            onChange={handleChange}
            className="w-full border-2 border-gray-300 rounded-md px-4 py-3"
          />
        </div>

        <div>
          <label className="block text-lg font-medium text-gray-700 mb-2">
            Method of Coming to School
          </label>
          <input
            name="method_of_coming_to_school"
            type="text"
            value={form.method_of_coming_to_school}
            onChange={handleChange}
            className="w-full border-2 border-gray-300 rounded-md px-4 py-3"
          />
        </div>
      </div>

      <div>
        <label className="block text-lg font-medium text-gray-700 mb-2">
          Grade 6–9 Aesthetic Subjects
        </label>
        <select
          name="grade_6_9_asthectic_subjects"
          value={form.grade_6_9_asthectic_subjects}
          onChange={handleChange}
          className="w-full border-2 border-gray-300 rounded-md px-4 py-3"
        >
          <option value="">Select</option>
          <option value="Art">Art</option>
          <option value="Dance">Dance</option>
          <option value="Music">Music</option>
          <option value="Drama & Theatre">Drama & Theatre</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-lg font-medium text-gray-700 mb-2">Basket 1 Subjects</label>
          <select
            name="grade_10_11_basket1_subjects"
            value={form.grade_10_11_basket1_subjects}
            onChange={handleChange}
            className="w-full border-2 border-gray-300 rounded-md px-4 py-3"
          >
            <option value="">Select</option>
            <option value="Commerce">Commerce</option>
            <option value="Civics">Civics</option>
            <option value="Geography">Geography</option>
            <option value="Home Science">Home Science</option>
          </select>
        </div>

        <div>
          <label className="block text-lg font-medium text-gray-700 mb-2">Basket 2 Subjects</label>
          <select
            name="grade_10_11_basket2_subjects"
            value={form.grade_10_11_basket2_subjects}
            onChange={handleChange}
            className="w-full border-2 border-gray-300 rounded-md px-4 py-3"
          >
            <option value="">Select</option>
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
          <label className="block text-lg font-medium text-gray-700 mb-2">Basket 3 Subjects</label>
          <select
            name="grade_10_11_basket3_subjects"
            value={form.grade_10_11_basket3_subjects}
            onChange={handleChange}
            className="w-full border-2 border-gray-300 rounded-md px-4 py-3"
          >
            <option value="">Select</option>
            <option value="ICT">ICT</option>
            <option value="Health Science">Health Science</option>
            <option value="Agriculture">Agriculture</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            name="receiving_any_grade_5_scholarship"
            checked={form.receiving_any_grade_5_scholarship}
            onChange={handleChange}
            className="w-5 h-5"
          />
          <label className="text-lg font-medium text-gray-700">Grade 5 Scholarship</label>
        </div>

        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            name="receiving_any_samurdhi_aswesuma"
            checked={form.receiving_any_samurdhi_aswesuma}
            onChange={handleChange}
            className="w-5 h-5"
          />
          <label className="text-lg font-medium text-gray-700">Samurdhi / Aswesuma</label>
        </div>

        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            name="receiving_any_scholarship"
            checked={form.receiving_any_scholarship}
            onChange={handleChange}
            className="w-5 h-5"
          />
          <label className="text-lg font-medium text-gray-700">Any Other Scholarship</label>
        </div>
      </div>

</div>
  );
};
export default StudentAcademicForm;
