import React, { useState } from 'react';
import { router } from '@inertiajs/react';
import { route } from 'ziggy-js';

import { Ziggy } from '@/ziggy'; // 👈 adjust this path based on where Ziggy is published
import ConfirmDeleteModal from "@/components/ConfirmDeleteModal";// adjust the path if needed

interface Subject {
  subject_id: string;
  subject_name: string;
}

interface Props {
  subjects: Subject[];
}

const SubjectsIndex = ({ subjects }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSubjectId, setSelectedSubjectId] = useState<string | null>(null);

  const openDeleteModal = (id: string) => {
    setSelectedSubjectId(id);
    setIsModalOpen(true);
  };

  const closeDeleteModal = () => {
    setSelectedSubjectId(null);
    setIsModalOpen(false);
  };

  const confirmDelete = () => {
    if (selectedSubjectId) {
      router.delete(route('subjects.destroy', selectedSubjectId,undefined, Ziggy), {
        onSuccess: () => {
          router.reload(); // reload page to refresh the list after deletion
        },
      });
    }
    closeDeleteModal();
  };

  const handleEdit = (id: string) => {
    router.visit(route('subjects.edit', id));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 text-sm">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-800">📚 Subject Management</h1>
          <button
            onClick={() => router.visit(route('subjects.create'))}
            className="bg-green-600 hover:bg-green-700 text-white font-medium px-4 py-2 rounded shadow-sm transition text-sm"
          >
            + Add Subject
          </button>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {subjects.length === 0 ? (
            <div className="p-8 text-center text-gray-500 text-sm">No subjects found.</div>
          ) : (
            <table className="w-full text-sm text-left border-separate border-spacing-0">
              <thead>
                <tr className="bg-blue-800 text-white text-sm">
                  <th className="px-4 py-3 font-semibold rounded-tl-lg">Subject ID</th>
                  <th className="px-4 py-3 font-semibold">Subject Name</th>
                  <th className="px-4 py-3 font-semibold rounded-tr-lg">Actions</th>
                </tr>
              </thead>
              <tbody>
                {subjects.map((subject, index) => (
                  <tr
                    key={subject.subject_id}
                    className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50 hover:bg-gray-100'}
                  >
                    <td className="px-4 py-3 text-gray-800 border-t">{subject.subject_id}</td>
                    <td className="px-4 py-3 text-gray-800 border-t">{subject.subject_name}</td>
                    <td className="px-4 py-3 border-t">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(subject.subject_id)}
                          className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1.5 rounded text-xs transition"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => openDeleteModal(subject.subject_id)}
                          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded text-xs transition"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Confirm Delete Modal */}
        <ConfirmDeleteModal
          isOpen={isModalOpen}
          onClose={closeDeleteModal}
          onConfirm={confirmDelete}
        />
      </div>
    </div>
  );
};

export default SubjectsIndex;
