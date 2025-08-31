import React from 'react';

interface Sibling {
  sibling_name: string;
  relationship: string;
  sibling_age: number;
  occupation: string;
  contact: string;
}

interface Props {
  siblings: Sibling[];
  handleSiblingChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    index: number
  ) => void;
  addSibling: () => void;
  removeSibling?: (index: number) => void;
}

const StudentSiblingForm: React.FC<Props> = ({ 
  siblings, 
  handleSiblingChange, 
  addSibling,
  removeSibling 
}) => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800">Sibling Information</h2>
        <p className="text-gray-600 mt-2">
          {siblings.length === 0 
            ? "Add siblings if applicable" 
            : `You've added ${siblings.length} sibling${siblings.length !== 1 ? 's' : ''}`}
        </p>
      </div>

      {siblings.length === 0 && (
        <div className="bg-blue-50 p-6 rounded-lg border border-blue-100 text-center">
          <svg 
            className="mx-auto w-10 h-10 text-blue-400 mb-3" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          <p className="text-gray-600">No siblings added yet</p>
        </div>
      )}

      <div className="space-y-4">
        {siblings.map((sibling, index) => (
          <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 relative">
            {siblings.length > 1 && removeSibling && (
              <button
                type="button"
                onClick={() => removeSibling(index)}
                className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition"
                aria-label="Remove sibling"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            )}
            
            <div className="flex items-center mb-4">
              <div className="bg-blue-100 p-2 rounded-lg mr-3">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-800">
                Sibling {index + 1}
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  name="sibling_name"
                  value={sibling.sibling_name}
                  onChange={(e) => handleSiblingChange(e, index)}
                  placeholder="Enter sibling's full name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Relationship
                </label>
                <select
                  name="relationship"
                  value={sibling.relationship}
                  onChange={(e) => handleSiblingChange(e, index)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                >
                  <option value="">Select relationship</option>
                  <option value="Brother">Brother</option>
                  <option value="Sister">Sister</option>
                  <option value="Step Brother">Step Brother</option>
                  <option value="Step Sister">Step Sister</option>
                  <option value="Half Brother">Half Brother</option>
                  <option value="Half Sister">Half Sister</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Age
                </label>
                <input
                  type="number"
                  name="sibling_age"
                  value={sibling.sibling_age || ''}
                  onChange={(e) => handleSiblingChange(e, index)}
                  placeholder="Enter age"
                  min="0"
                  max="99"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Occupation
                </label>
                <input
                  type="text"
                  name="occupation"
                  value={sibling.occupation}
                  onChange={(e) => handleSiblingChange(e, index)}
                  placeholder="Enter occupation"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Contact Number
                </label>
                <input
                  type="tel"
                  name="contact"
                  value={sibling.contact}
                  onChange={(e) => handleSiblingChange(e, index)}
                  placeholder="Enter phone number"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={addSibling}
        className="flex items-center justify-center w-full md:w-auto px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
        </svg>
        Add Sibling
      </button>

      {siblings.length > 0 && (
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
          <p className="text-sm text-gray-600">
            You can add up to 5 siblings. If you need to add more, please contact the school administration.
          </p>
        </div>
      )}
    </div>
  );
};

export default StudentSiblingForm;