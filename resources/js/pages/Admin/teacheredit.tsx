import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia'; // Used for handling form submissions in Inertia.js
import { Teacher } from '@/types/Teacher'; // Assuming you've defined a Teacher type for type safety

// TeacherEditModal component
const TeacherEditModal: React.FC<{ teacher: Teacher; onClose: () => void }> = ({
  teacher,
  onClose,
}) => {
  // Define state to hold the teacher's editable data
  const [formData, setFormData] = useState({
    first_name: teacher.first_name,
    last_name: teacher.last_name,
    email: teacher.email,
    phone_number: teacher.phone_number,
    address: teacher.address,
    work_info: teacher.work_info,
    qualifications: teacher.qualifications,
    // Add other relevant fields here
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();

    // Update logic using Inertia.js to submit the form data to the backend
    Inertia.put(`/teachers/${teacher.id}`, formData, {
      onSuccess: () => {
        // Close the modal after a successful update
        onClose();
      },
    });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4">Edit Teacher Information</h2>

        <form onSubmit={handleUpdate}>
          <div className="mb-4">
            <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">
              First Name
            </label>
            <input
              type="text"
              id="first_name"
              name="first_name"
              value={formData.first_name}
              onChange={handleInputChange}
              className="mt-1 p-2 border border-gray-300 rounded w-full"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="last_name" className="block text-sm font-medium text-gray-700">
              Last Name
            </label>
            <input
              type="text"
              id="last_name"
              name="last_name"
              value={formData.last_name}
              onChange={handleInputChange}
              className="mt-1 p-2 border border-gray-300 rounded w-full"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="mt-1 p-2 border border-gray-300 rounded w-full"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="phone_number" className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              type="text"
              id="phone_number"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleInputChange}
              className="mt-1 p-2 border border-gray-300 rounded w-full"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="address" className="block text-sm font-medium text-gray-700">
              Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              className="mt-1 p-2 border border-gray-300 rounded w-full"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="work_info" className="block text-sm font-medium text-gray-700">
              Work Info
            </label>
            <input
              type="text"
              id="work_info"
              name="work_info"
              value={formData.work_info}
              onChange={handleInputChange}
              className="mt-1 p-2 border border-gray-300 rounded w-full"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="qualifications" className="block text-sm font-medium text-gray-700">
              Qualifications
            </label>
            <input
              type="text"
              id="qualifications"
              name="qualifications"
              value={formData.qualifications}
              onChange={handleInputChange}
              className="mt-1 p-2 border border-gray-300 rounded w-full"
            />
          </div>

          {/* Add more fields here as necessary */}

          <div className="flex justify-end space-x-4 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// TeacherList component (Parent Component for Modal)
const TeacherList: React.FC = () => {
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Sample teacher list, you should fetch this data from your backend or API
  const teachers: Teacher[] = [
    { id: 1, first_name: 'John', last_name: 'Doe', email: 'john.doe@example.com', phone_number: '1234567890', address: '123 Main St', work_info: 'Math Teacher', qualifications: 'MSc in Mathematics' },
    // Add more sample data as needed
  ];

  const openModal = (teacher: Teacher) => {
    setSelectedTeacher(teacher);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTeacher(null);
  };

  return (
    <div>
      {/* Render teacher list here with an edit button */}
      <div className="space-y-4">
        {teachers.map((teacher) => (
          <div key={teacher.id} className="p-4 border rounded-lg shadow-md">
            <p>{teacher.first_name} {teacher.last_name}</p>
            <p>{teacher.email}</p>
            <button
              onClick={() => openModal(teacher)}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Edit
            </button>
          </div>
        ))}
      </div>

      {/* Show the edit modal if a teacher is selected */}
      {selectedTeacher && isModalOpen && (
        <TeacherEditModal teacher={selectedTeacher} onClose={closeModal} />
      )}
    </div>
  );
};

export default TeacherList;
