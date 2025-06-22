import React from 'react';
import { useEffect } from 'react';

interface StudentPersonalFormProps {
  form: {
    full_name: string;
    full_name_with_initial: string;
    birthday: string;
    age: string;
    ethnicity: string;
    religion: string;
    gender: string;
    birth_certificate_number: string;
    nic_number: string;
    postal_ic_number: string;
    address: string;
    special_needs: boolean;
    height: string;
    weight: string;
    photo: File | null;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
}


// You can define min/max outside the component if static
const currentYear = new Date().getFullYear();
const minDate = `${currentYear - 20}-01-01`;
const maxDate = `${currentYear - 10}-01-01`;

const StudentPersonalForm: React.FC<StudentPersonalFormProps> = ({ form, handleChange }) => {
  useEffect(() => {
  if (form.birthday) {
    const birthDate = new Date(form.birthday);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    // Optionally consider month/day for accuracy
    form.age = age.toString(); // OR call a setForm function to update
  }
}, [form.birthday]);
  return (
    <div>
      <h4 className="text-2xl font-semibold text-yellow-900 mb-4 text-center">
        Student Personal Details
      </h4>

      {/* === Full Name + Full Name with Initial === */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-lg font-medium text-gray-700 mb-2">Full Name *</label>
          <input
            name="full_name"
            type="text"
            value={form.full_name}
            onChange={handleChange}
            className="w-full border-2 border-gray-300 hover:border-blue-400 transition duration-300  rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-lg font-medium text-gray-700 mb-2">Full Name with Initial *</label>
          <input
            name="full_name_with_initial"
            type="text"
            value={form.full_name_with_initial}
            onChange={handleChange}
            className="w-full border-2 border-gray-300 hover:border-blue-400 transition duration-300  rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
      </div>

      {/* === Photo Upload === */}
      <div className="my-4">
        <label className="block text-lg font-medium text-gray-700 mb-2">Photo</label>
        <input
          name="photo"
          type="file"
          accept="image/*"
          onChange={handleChange}
        />
        {form.photo && typeof form.photo !== "string" && (
          <img
            src={URL.createObjectURL(form.photo)}
            alt="Preview"
            className="mt-2 max-h-40 object-contain"
          />
        )}
      </div>

      {/* === Birthday + Age === */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-lg font-medium text-gray-700 mb-2">Birthday *</label>
          <input
            name="birthday"
            type="date"
            value={form.birthday}
            min={minDate}
            max={maxDate}
            onChange={handleChange}
            className="w-full border-2 border-gray-300 hover:border-blue-400 transition duration-300  hover:border-blue-400 transition duration-300  rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-lg font-medium text-gray-700 mb-2">Age</label>
          <input
            name="age"
            type="number"
            min="10"
            max="21"
            value={form.age}
            onChange={handleChange}
            className="w-full border-2 border-gray-300 hover:border-blue-400 transition duration-300  rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            readOnly
          />
        </div>
      </div>

      {/* === Ethnicity + Religion === */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-lg font-medium text-gray-700 mb-2">Ethnicity</label>
          <select
            name="ethnicity"
            value={form.ethnicity}
            onChange={handleChange}
            className="w-full border-2 border-gray-300 hover:border-blue-400 transition duration-300  rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select</option>
            <option value="Sinhalese">Sinhalese</option>
            <option value="Tamil">Tamil</option>
            <option value="Muslim">Muslim</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label className="block text-lg font-medium text-gray-700 mb-2">Religion</label>
          <select
            name="religion"
            value={form.religion}
            onChange={handleChange}
            className="w-full border-2 border-gray-300 hover:border-blue-400 transition duration-300  rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select</option>
            <option value="Buddhism">Buddhism</option>
            <option value="Hinduism">Hinduism</option>
            <option value="Islam">Islam</option>
            <option value="Christianity">Christianity</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>

      {/* === Gender + Special Needs === */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-lg font-medium text-gray-700 mb-2">Gender</label>
          <select
            name="gender"
            value={form.gender}
            onChange={handleChange}
            className="w-full border-2 border-gray-300 hover:border-blue-400 transition duration-300  rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="flex items-center mt-6">
          <input
            type="checkbox"
            name="special_needs"
            checked={form.special_needs}
            onChange={handleChange}
            className="w-5 h-5 mr-3"
          />
          <label className="text-lg font-medium text-gray-700">Special Needs</label>
        </div>
      </div>

      {/* === IDs === */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-lg font-medium text-gray-700 mb-2">Birth Certificate Number</label>
          <input
            name="birth_certificate_number"
            type="text"
            value={form.birth_certificate_number}
            onChange={handleChange}
            className="w-full border-2 border-gray-300 hover:border-blue-400 transition duration-300  rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-lg font-medium text-gray-700 mb-2">NIC Number</label>
          <input
            name="nic_number"
            type="text"
            value={form.nic_number}
            onChange={handleChange}
            className="w-full border-2 border-gray-300 hover:border-blue-400 transition duration-300  rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* === Postal IC + Address === */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-lg font-medium text-gray-700 mb-2">Postal IC Number</label>
          <input
            name="postal_ic_number"
            type="text"
            value={form.postal_ic_number}
            onChange={handleChange}
            className="w-full border-2 border-gray-300 hover:border-blue-400 transition duration-300  rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-lg font-medium text-gray-700 mb-2">Address</label>
          <textarea
            name="address"
            value={form.address}
            onChange={handleChange}
            className="w-full border-2 border-gray-300 hover:border-blue-400 transition duration-300  rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={4}
          />
        </div>
      </div>

      {/* === Height + Weight === */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-lg font-medium text-gray-700 mb-2">Height (cm)</label>
          <input
            name="height"
            type="number"
            min="0"
            value={form.height}
            onChange={handleChange}
            className="w-full border-2 border-gray-300 hover:border-blue-400 transition duration-300  rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-lg font-medium text-gray-700 mb-2">Weight (kg)</label>
          <input
            name="weight"
            type="number"
            min="0"
            value={form.weight}
            onChange={handleChange}
            className="w-full border-2 border-gray-300 hover:border-blue-400 transition duration-300  rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
    </div>
  );
};

export default StudentPersonalForm;
