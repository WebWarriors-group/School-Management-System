import React, { useState } from 'react';

interface StudentAdmissionFormProps {
  setShowForm: (val: boolean) => void;
}

export default function StudentAdmissionForm({ setShowForm }: StudentAdmissionFormProps) {
  const [form, setForm] = useState({
    reg_no: '',
    class_id: '',
    distance_to_school: '',
    method_of_coming_to_school: '',
    grade_6_9_asthectic_subjects: '',
    grade_10_11_basket1_subjects: '',
    grade_10_11_basket2_subjects: '',
    grade_10_11_basket3_subjects: '',
    receiving_any_grade_5_scholarship: false,
    receiving_any_samurdhi_aswesuma: false,
    receiving_any_scholarship: false,
  });

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/students`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Validation or server error:', errorData);
        alert('Failed to submit admission. Please check the input.');
        return;
      }

      const data = await response.json();
      console.log('Submission success:', data);
      alert('Student admission submitted successfully!');
      setShowForm(false); // Hide the form after successful submission
    } catch (error) {
      console.error('Submission error:', error);
      alert('Something went wrong. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-lg space-y-6 transition-all duration-300 ease-in-out">
      <h2 className="text-3xl font-semibold text-red-700 mb-6 text-center">Student Admission Form</h2>

      {/* Row 1 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="relative">
          <label className="block text-lg font-medium text-gray-700 mb-2">Registration No *</label>
          <input
            name="reg_no"
            type="text"
            value={form.reg_no}
            onChange={handleChange}
            className="w-full border-2 border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            required
          />
        </div>

        <div className="relative">
          <label className="block text-lg font-medium text-gray-700 mb-2">Class *</label>
          <input
            name="class_id"
            type="text"
            value={form.class_id}
            onChange={handleChange}
            className="w-full border-2 border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            required
          />
        </div>
      </div>

      {/* Row 2 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="relative">
          <label className="block text-lg font-medium text-gray-700 mb-2">Distance to School (km)</label>
          <input
            name="distance_to_school"
            type="number"
            min="0"
            value={form.distance_to_school}
            onChange={handleChange}
            className="w-full border-2 border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
          />
        </div>

        <div className="relative">
          <label className="block text-lg font-medium text-gray-700 mb-2">Method of Coming to School</label>
          <input
            name="method_of_coming_to_school"
            type="text"
            value={form.method_of_coming_to_school}
            onChange={handleChange}
            className="w-full border-2 border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
          />
        </div>
      </div>

      {/* Aesthetic Subjects */}
      <div className="relative">
        <label className="block text-lg font-medium text-gray-700 mb-2">Grade 6–9 Aesthetic Subjects</label>
        <select
          name="grade_6_9_asthectic_subjects"
          value={form.grade_6_9_asthectic_subjects}
          onChange={handleChange}
          className="w-full border-2 border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
        >
          <option value="">Select</option>
          <option value="Art">Art</option>
          <option value="Dance">Dance</option>
          <option value="Music">Music</option>
          <option value="Drama & Theatre">Drama & Theatre</option>
        </select>
      </div>

      {/* Grade 10–11 Subjects */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="relative">
          <label className="block text-lg font-medium text-gray-700 mb-2">Basket 1 Subjects</label>
          <select
            name="grade_10_11_basket1_subjects"
            value={form.grade_10_11_basket1_subjects}
            onChange={handleChange}
            className="w-full border-2 border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
          >
            <option value="">Select</option>
            <option value="Commerce">Commerce</option>
            <option value="Civics">Civics</option>
            <option value="Geography">Geography</option>
            <option value="Home Science">Home Science</option>
          </select>
        </div>

        <div className="relative">
          <label className="block text-lg font-medium text-gray-700 mb-2">Basket 2 Subjects</label>
          <select
            name="grade_10_11_basket2_subjects"
            value={form.grade_10_11_basket2_subjects}
            onChange={handleChange}
            className="w-full border-2 border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
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

        <div className="relative">
          <label className="block text-lg font-medium text-gray-700 mb-2">Basket 3 Subjects</label>
          <select
            name="grade_10_11_basket3_subjects"
            value={form.grade_10_11_basket3_subjects}
            onChange={handleChange}
            className="w-full border-2 border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
          >
            <option value="">Select</option>
            <option value="ICT">ICT</option>
            <option value="Health Science">Health Science</option>
            <option value="Agriculture">Agriculture</option>
          </select>
        </div>
      </div>

      {/* Scholarships */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="flex items-center gap-4">
          <input
            type="checkbox"
            name="receiving_any_grade_5_scholarship"
            checked={form.receiving_any_grade_5_scholarship}
            onChange={handleChange}
            className="w-5 h-5"
          />
          <label className="text-lg font-medium text-gray-700">Grade 5 Scholarship</label>
        </div>

        <div className="flex items-center gap-4">
          <input
            type="checkbox"
            name="receiving_any_samurdhi_aswesuma"
            checked={form.receiving_any_samurdhi_aswesuma}
            onChange={handleChange}
            className="w-5 h-5"
          />
          <label className="text-lg font-medium text-gray-700">Samurdhi / Aswesuma</label>
        </div>

        <div className="flex items-center gap-4">
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

      {/* Submit and Cancel Buttons */}
      <div className="flex justify-end gap-6 mt-8">
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all duration-300 ease-in-out"
        >
          Submit
        </button>
        <button
          type="button"
          onClick={() => setShowForm(false)}
          className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-all duration-300 ease-in-out"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
