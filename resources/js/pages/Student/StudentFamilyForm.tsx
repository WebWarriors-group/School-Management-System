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
    // You can add other fields too or simplify using `form: any` for now
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
}
const StudentFamilyForm: React.FC<StudentFamilyFormProps> = ({ form, handleChange }) => {
  return (
    
        <div>
          <h3 className="text-2xl font-semibold text-yellow-900 mb-2 text-center">Parent/Guardian Details</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className='relative'>
              <h4 className="text-xl font-semibold mb-2">Mother's Info</h4>
              {['mother_name', 'mother_occupation', 'mother_income', 'mother_working_place', 'mother_contact', 'mother_email', 'mother_whatsapp'].map((field) => (
                <div key={field}>
                  <label className="block text-lg font-medium text-gray-700 mb-2">{field.replace(/_/g, ' ')}:</label>
                  <input
                    type="text"
                    name={field}
                    value={String(form[field as keyof typeof form])}
                    onChange={handleChange}
                    className="w-full border px-3 py-2 rounded mb-2"
                  />
                </div>
              ))}

            </div>

            <div>
              <h4 className="text-xl font-semibold mb-2">Father's Info</h4>
              {['father_name', 'father_occupation', 'father_income', 'father_working_place', 'father_contact', 'father_email', 'father_whatsapp'].map((field) => (
                <div key={field}>
                  <label className="block text-lg font-medium text-gray-700 mb-2">{field.replace(/_/g, ' ')}:</label>
                  <input
                    type="text"
                    name={field}
                    value={String(form[field as keyof typeof form])}
                    onChange={handleChange}
                    className="w-full border px-3 py-2 rounded mb-2"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>


     
  
  );
};

export default StudentFamilyForm;


