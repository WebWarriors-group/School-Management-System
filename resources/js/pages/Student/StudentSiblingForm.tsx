// StudentSiblingForm.tsx
import React from 'react';

interface Sibling {
  sibling_name: string;
  relationship: string;
  sibling_age: string;
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
}

const StudentSiblingForm: React.FC<Props> = ({ siblings, handleSiblingChange, addSibling }) => {
  return (
    <div className="p-4">
      <h3 className="text-2xl font-semibold text-yellow-900 mb-4 text-center">Sibling Information</h3>
      {siblings.map((sibling, index) => (
        <div key={index} className="space-y-2 border rounded p-4 mb-4 shadow">
          <p className="font-bold">Sibling {index + 1}</p>
          <input
            type="text"
            name="sibling_name"
            value={sibling.sibling_name}
            onChange={(e) => handleSiblingChange(e, index)}
            placeholder="Sibling Name"
            className="w-full p-2 border rounded"
          />
          <select
            name="relationship"
            value={sibling.relationship}
            onChange={(e) => handleSiblingChange(e, index)}
            className="w-full p-2 border rounded"
          >
            <option value="">Select Relationship</option>
            <option value="Brother">Brother</option>
            <option value="Sister">Sister</option>
          </select>
          <input
            type="number"
            name="sibling_age"
            value={sibling.sibling_age}
            onChange={(e) => handleSiblingChange(e, index)}
            placeholder="Age"
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            name="occupation"
            value={sibling.occupation}
            onChange={(e) => handleSiblingChange(e, index)}
            placeholder="Occupation"
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            name="contact"
            value={sibling.contact}
            onChange={(e) => handleSiblingChange(e, index)}
            placeholder="Contact Number"
            className="w-full p-2 border rounded"
          />
        </div>
      ))}
      <button
        type="button"
        onClick={addSibling}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Add Another Sibling
      </button>
    </div>
  );
};

export default StudentSiblingForm;
