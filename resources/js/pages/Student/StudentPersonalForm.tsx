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

const currentYear = new Date().getFullYear();
const minDate = `${currentYear - 20}-01-01`;
const maxDate = `${currentYear - 10}-01-01`;

const StudentPersonalForm: React.FC<StudentPersonalFormProps> = ({ form, handleChange }) => {
  useEffect(() => {
    if (form.birthday) {
      const birthDate = new Date(form.birthday);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      form.age = age.toString();
    }
  }, [form.birthday]);

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800">Personal Information</h2>
        <p className="text-gray-600 mt-2">Please provide the student's personal details</p>
      </div>

      {/* Basic Information Section */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">Basic Information</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              name="full_name"
              type="text"
              value={form.full_name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              placeholder="Enter full name"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name with Initials <span className="text-red-500">*</span>
            </label>
            <input
              name="full_name_with_initial"
              type="text"
              value={form.full_name_with_initial}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              placeholder="Enter name with initials"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Birthday <span className="text-red-500">*</span>
            </label>
            <input
              name="birthday"
              type="date"
              value={form.birthday}
              min={minDate}
              max={maxDate}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Age
            </label>
            <input
              name="age"
              type="number"
              min="10"
              max="21"
              value={form.age}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-50"
              readOnly
            />
          </div>
        </div>
      </div>

      {/* Photo Upload Section */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">Student Photo</h3>
        
        <div className="flex flex-col md:flex-row items-start gap-6">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload Photo
            </label>
            <div className="flex items-center gap-4">
              <label className="flex flex-col items-center justify-center w-40 h-40 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p className="text-xs text-gray-500 mt-2">Click to upload</p>
                </div>
                <input 
                  name="photo" 
                  type="file" 
                  accept="image/*" 
                  onChange={handleChange} 
                  className="hidden" 
                />
              </label>
              {form.photo && typeof form.photo !== "string" && (
                <div className="relative">
                  <img
                    src={URL.createObjectURL(form.photo)}
                    alt="Preview"
                    className="h-40 w-40 object-cover rounded-lg border-2 border-gray-200"
                  />
                  <button
                    type="button"
                    onClick={() => handleChange({ target: { name: 'photo', value: null } } as any)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              )}
            </div>
          </div>
          
          <div className="text-sm text-gray-500">
            <p className="font-medium">Photo Requirements:</p>
            <ul className="list-disc pl-5 mt-1 space-y-1">
              <li>Recent passport-style photo</li>
              <li>Clear face visible</li>
              <li>Max file size: 2MB</li>
              <li>Formats: JPG, PNG</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Personal Details Section */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">Personal Details</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Ethnicity
            </label>
            <select
              name="ethnicity"
              value={form.ethnicity}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            >
              <option value="">Select ethnicity</option>
              <option value="Sinhalese">Sinhalese</option>
              <option value="Tamil">Tamil</option>
              <option value="Muslim">Muslim</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Religion
            </label>
            <select
              name="religion"
              value={form.religion}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            >
              <option value="">Select religion</option>
              <option value="Buddhism">Buddhism</option>
              <option value="Hinduism">Hinduism</option>
              <option value="Islam">Islam</option>
              <option value="Christianity">Christianity</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Gender
            </label>
            <select
              name="gender"
              value={form.gender}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            >
              <option value="">Select gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              name="special_needs"
              checked={form.special_needs}
              onChange={handleChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label className="ml-2 block text-sm text-gray-700">
              Special Needs
            </label>
          </div>
        </div>
      </div>

      {/* Identification Section */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">Identification</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Birth Certificate Number
            </label>
            <input
              name="birth_certificate_number"
              type="text"
              value={form.birth_certificate_number}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              placeholder="Enter birth certificate number"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              NIC Number
            </label>
            <input
              name="nic_number"
              type="text"
              value={form.nic_number}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              placeholder="Enter NIC number"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Postal IC Number
            </label>
            <input
              name="postal_ic_number"
              type="text"
              value={form.postal_ic_number}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              placeholder="Enter postal IC number"
            />
          </div>
        </div>
      </div>

      {/* Address Section */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">Address</h3>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Full Address
          </label>
          <textarea
            name="address"
            value={form.address}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            rows={4}
            placeholder="Enter full address"
          />
        </div>
      </div>

      {/* Physical Attributes Section */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">Physical Attributes</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Height (cm)
            </label>
            <div className="relative">
              <input
                name="height"
                type="number"
                min="0"
                value={form.height}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                placeholder="Enter height"
              />
              
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Weight (kg)
            </label>
            <div className="relative">
              <input
                name="weight"
                type="number"
                min="0"
                value={form.weight}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                placeholder="Enter weight"
              />

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentPersonalForm;