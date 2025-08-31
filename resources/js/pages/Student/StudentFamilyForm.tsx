import React from 'react';

interface StudentFamilyFormProps {
  form: {
    mother_name: string;
    mother_occupation: string;
    mother_income: string;
    mother_working_place: string;
    mother_contact: string;
    mother_email: string;
    mother_whatsapp: string;
    father_name: string;
    father_occupation: string;
    father_income: string;
    father_working_place: string;
    father_contact: string;
    father_email: string;
    father_whatsapp: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
}

const StudentFamilyForm: React.FC<StudentFamilyFormProps> = ({ form, handleChange }) => {
  // Helper function to format labels
  const formatLabel = (field: string) => {
    const words = field.replace(/_/g, ' ').split(' ');
    return words.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800">Parent/Guardian Information</h2>
        <p className="text-gray-600 mt-2">Please provide details for at least one parent/guardian</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Mother's Information Card */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center mb-4">
            <div className="bg-blue-100 p-2 rounded-lg mr-3">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800">Mother's Details</h3>
          </div>

          <div className="space-y-4">
            {[
              { field: 'mother_name', label: 'Full Name', required: true },
              { field: 'mother_occupation', label: 'Occupation' },
              { field: 'mother_income', label: 'Monthly Income (LKR)', type: 'number' },
              { field: 'mother_working_place', label: 'Working Place' },
              { field: 'mother_contact', label: 'Phone Number', type: 'tel' },
              { field: 'mother_email', label: 'Email Address', type: 'email' },
              { field: 'mother_whatsapp', label: 'WhatsApp Number', type: 'tel' }
            ].map(({ field, label, type = 'text', required = false }) => (
              <div key={field}>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {label} {required && <span className="text-red-500">*</span>}
                </label>
                <input
                  type={type}
                  name={field}
                  value={form[field as keyof typeof form] || ''}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  placeholder={`Enter ${label.toLowerCase()}`}
                  required={required}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Father's Information Card */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center mb-4">
            <div className="bg-blue-100 p-2 rounded-lg mr-3">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800">Father's Details</h3>
          </div>

          <div className="space-y-4">
            {[
              { field: 'father_name', label: 'Full Name', required: true },
              { field: 'father_occupation', label: 'Occupation' },
              { field: 'father_income', label: 'Monthly Income (LKR)', type: 'number' },
              { field: 'father_working_place', label: 'Working Place' },
              { field: 'father_contact', label: 'Phone Number', type: 'tel' },
              { field: 'father_email', label: 'Email Address', type: 'email' },
              { field: 'father_whatsapp', label: 'WhatsApp Number', type: 'tel' }
            ].map(({ field, label, type = 'text', required = false }) => (
              <div key={field}>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {label} {required && <span className="text-red-500">*</span>}
                </label>
                <input
                  type={type}
                  name={field}
                  value={form[field as keyof typeof form] || ''}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  placeholder={`Enter ${label.toLowerCase()}`}
                  required={required}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Additional Notes */}
      <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
        <div className="flex">
          <svg className="w-5 h-5 text-blue-600 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-sm text-gray-600">
            If parents are separated or if there are any special circumstances regarding guardianship, 
            please inform the school administration separately.
          </p>
        </div>
      </div>
    </div>
  );
};

export default StudentFamilyForm;