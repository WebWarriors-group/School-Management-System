import React, { useEffect, useState } from 'react';
import StudentAcademicForm from './StudentAcademicForm';
import StudentPersonalForm from './StudentPersonalForm';
import StudentFamilyForm from './StudentFamilyForm';
import StudentSiblingForm from './StudentSiblingForm';

interface StudentAdmissionFormProps {
  setShowForm: (val: boolean) => void
}

interface Sibling {
  sibling_name: string;
  relationship: string;
  sibling_age: number;
  occupation: string;
  contact: string;
}


export default function StudentAdmissionForm({ setShowForm }: StudentAdmissionFormProps) {
type StudentFormValues = {
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
  full_name: string;
  full_name_with_initial: string;
  photo: File | null;
  birthday: string;
  ethnicity: string;
  religion: string;
  gender: string;
  birth_certificate_number: string;
  address: string;
  nic_number: string;
  postal_ic_number: string;
  age: string;
  special_needs: boolean;
  height: string;
  weight: string;
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

  const initialFormValues: StudentFormValues = {
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
  full_name: '',
  full_name_with_initial: '',
  photo: null,
  birthday: '',
  ethnicity: '',
  religion: '',
  gender: '',
  birth_certificate_number: '',
  address: '',
  nic_number: '',
  postal_ic_number: '',
  age: '',
  special_needs: false,
  height: '',
  weight: '',
  mother_name: '',
  mother_occupation: '',
  mother_income: '',
  mother_working_place: '',
  mother_contact: '',
  mother_email: '',
  mother_whatsapp: '',
  father_name: '',
  father_occupation: '',
  father_income: '',
  father_working_place: '',
  father_contact: '',
  father_email: '',
  father_whatsapp: '',
};

 const [form, setForm] = useState<StudentFormValues>(initialFormValues);


  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 5;
const [photoPreview, setPhotoPreview] = useState<string | null>(null);
const resetFormState = () => {
  setForm(initialFormValues);
  setSiblings([{ sibling_name: '', relationship: '', sibling_age: 0, occupation: '', contact: '' }]);

  setCurrentPage(1);
};



useEffect(() => {
  if (!form.photo || typeof form.photo === "string") return;

  const objectUrl = URL.createObjectURL(form.photo);
  setPhotoPreview(objectUrl);
  return () => URL.revokeObjectURL(objectUrl);
}, [form.photo]);

const [siblings, setSiblings] = React.useState<Sibling[]>([
  { sibling_name: '', relationship: '', sibling_age: 0, occupation: '', contact: '' }
]);


const handleSiblingChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  index: number
) => {
  const { name, value } = e.target;
  setSiblings((prev) => {
    const newSiblings = [...prev];
    newSiblings[index] = {
      ...newSiblings[index],
      [name]: name === "sibling_age" ? Number(value) : value,
    };
    return newSiblings;
  });
};


const addSibling = () => {
  setSiblings((prev) => [
    ...prev,
    { sibling_name: '', relationship: '', sibling_age: 0, occupation: '', contact: '' }
  ]);
};


  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const target = e.target;
    const { name, value, type } = target;

    if (type === "file" && target instanceof HTMLInputElement) {
      if (target.files && target.files.length > 0) {
        setForm((prev) => ({
          ...prev,
          [name]: target.files![0],
        }));
      }
    }

    else if (name === "birthday") {
      const birthDate = new Date(value);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const m = today.getMonth() - birthDate.getMonth();

      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }

      setForm((prev) => ({
        ...prev,
        birthday: value,
        age: age >= 0 ? age.toString() : "0",
      }));
    }

    else if (type === "checkbox" && target instanceof HTMLInputElement) {
      setForm((prev) => ({
        ...prev,
        [name]: target.checked,
      }));
    }

    else {
      setForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!window.confirm('Are you sure you want to submit this admission form?')) return;


    const payload = new FormData();
    payload.append('reg_no', form.reg_no);
    payload.append('class_id', form.class_id);
    payload.append('distance_to_school', form.distance_to_school);
    payload.append('method_of_coming_to_school', form.method_of_coming_to_school);
    payload.append('grade_6_9_asthectic_subjects', form.grade_6_9_asthectic_subjects);
    payload.append('grade_10_11_basket1_subjects', form.grade_10_11_basket1_subjects);
    payload.append('grade_10_11_basket2_subjects', form.grade_10_11_basket2_subjects);
    payload.append('grade_10_11_basket3_subjects', form.grade_10_11_basket3_subjects);
payload.append('receiving_any_grade_5_scholarship', String(form.receiving_any_grade_5_scholarship ? 1 : 0));
payload.append('receiving_any_samurdhi_aswesuma', String(form.receiving_any_samurdhi_aswesuma ? 1 : 0));
payload.append('receiving_any_scholarship', String(form.receiving_any_scholarship ? 1 : 0));

   payload.append('personal[birthday]', form.birthday);
payload.append('personal[full_name]', form.full_name);
payload.append('personal[full_name_with_initial]', form.full_name_with_initial);

payload.append('personal[ethnicity]', form.ethnicity);

payload.append('personal[religion]', form.religion);

    payload.append('personal[gender]', form.gender);
    payload.append('personal[birth_certificate_number]', form.birth_certificate_number);
    payload.append('personal[address]', form.address);
    payload.append('personal[nic_number]', form.nic_number);
    payload.append('personal[postal_ic_number]', form.postal_ic_number);
    payload.append('personal[age]', form.age);
    payload.append('personal[special_needs]', String(form.special_needs ? 1 : 0));
    payload.append('personal[height]', form.height);
    payload.append('personal[weight]', form.weight);
    if (form.photo) {
      payload.append('personal[photo]', form.photo);
    }
// Sample: Add these inside your payload setup
payload.append('family[mother_name]', form.mother_name || '');
payload.append('family[mother_occupation]', form.mother_occupation || '');
payload.append('family[mother_income]', form.mother_income || '');
payload.append('family[mother_working_place]', form.mother_working_place || '');
payload.append('family[mother_contact]', form.mother_contact || '');
payload.append('family[mother_email]', form.mother_email || '');
payload.append('family[mother_whatsapp]', form.mother_whatsapp || '');

payload.append('family[father_name]', form.father_name || '');
payload.append('family[father_occupation]', form.father_occupation || '');
payload.append('family[father_income]', form.father_income || '');
payload.append('family[father_working_place]', form.father_working_place || '');
payload.append('family[father_contact]', form.father_contact || '');
payload.append('family[father_email]', form.father_email || '');
payload.append('family[father_whatsapp]', form.father_whatsapp || '');


    siblings.forEach((sibling, index) => {
      payload.append(`siblings[${index}][sibling_name]`, sibling.sibling_name);
      payload.append(`siblings[${index}][relationship]`, sibling.relationship);
payload.append(`siblings[${index}][sibling_age]`, sibling.sibling_age.toString());


      payload.append(`siblings[${index}][occupation]`, sibling.occupation);
      payload.append(`siblings[${index}][contact]`, sibling.contact);
    });
   if (!form.reg_no || !form.class_id || !form.full_name || !form.birthday) {
  alert("Please fill in all required fields.");
  return;
}

fetch('/api/student', {
  method: 'POST',
  headers: {
    'Accept': 'application/json',
  },
  body: payload,
})

  .then(async (response) => {
    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error:', errorData);
      alert("Submission failed. Please check the data.");
    } else {
      const data = await response.json();
      console.log('Success:', data);
      alert("Student admission submitted successfully!");
      resetFormState(); // optional
      setShowForm(false); // close the form
    }
  })
  .catch((error) => {
    console.error('Network error:', error);
    alert("Network error occurred while submitting the form.");
  });

  }
   return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg z-10 relative max-w-4xl p-6 mx-auto">
      <div className="relative mb-6">
        <button
          type="button"
          onClick={() => { resetFormState(); setShowForm(false); }}
          className="absolute top-0 right-0 bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
        >
          X
        </button>
        
        {/* Header Section */}
        <div className="text-center mb-6 border-b pb-4">
          <h1 className="text-2xl font-bold text-gray-800">ADMISSION FORM</h1>
          <div className="flex justify-between mt-4 text-sm">
           
           
          </div>
        </div>

        {/* Form Sections */}
        <div className="border rounded-lg p-4 mb-6">
          {currentPage === 1 && (
            <StudentAcademicForm form={form} handleChange={handleChange} />
          )}
          {currentPage === 2 && (
            <StudentFamilyForm form={form} handleChange={handleChange} />
          )}
          {currentPage === 3 && (
            <StudentPersonalForm form={form} handleChange={handleChange} />
          )}
          {currentPage === 4 && (
            <StudentSiblingForm siblings={siblings} handleSiblingChange={handleSiblingChange} addSibling={addSibling} />
          )}
          {currentPage === 5 && (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-center text-gray-700 mb-4">Review & Submit</h3>
              
              {/* Personal Info Section */}
              <div className="border rounded p-4">
                <h4 className="font-bold text-lg mb-2">Personal Information</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p><strong>Full Name:</strong> {form.full_name}</p>
                    <p><strong>Name with Initials:</strong> {form.full_name_with_initial}</p>
                    <p><strong>Birthday:</strong> {form.birthday}</p>
                    <p><strong>Age:</strong> {form.age}</p>
                    <p><strong>Religion:</strong> {form.religion}</p>
                  </div>
                  <div>
                    <p><strong>Gender:</strong> {form.gender}</p>
                    <p><strong>Ethnicity:</strong> {form.ethnicity}</p>
                    <p><strong>Birth Certificate:</strong> {form.birth_certificate_number}</p>
                    <p><strong>Address:</strong> {form.address}</p>
                    {form.photo && (
                      <div className="mt-2">
                        <strong>Photo:</strong>
                        <img 
                          src={typeof form.photo === "string" ? form.photo : URL.createObjectURL(form.photo)} 
                          alt="Student" 
                          className="mt-1 h-24 w-24 object-cover rounded border"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Academic Info Section */}
              <div className="border rounded p-4">
                <h4 className="font-bold text-lg mb-2">Academic Information</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p><strong>Registration No:</strong> {form.reg_no}</p>
                    <p><strong>Class:</strong> {form.class_id}</p>
                    <p><strong>Distance to School:</strong> {form.distance_to_school} km</p>
                  </div>
                  <div>
                    <p><strong>Transport Method:</strong> {form.method_of_coming_to_school}</p>
                    <p><strong>Scholarship:</strong> {form.receiving_any_scholarship ? "Yes" : "No"}</p>
                  </div>
                </div>
              </div>

              {/* Family Info Section */}
              <div className="border rounded p-4">
                <h4 className="font-bold text-lg mb-2">Family Information</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h5 className="font-medium">Mother</h5>
                    <p><strong>Name:</strong> {form.mother_name}</p>
                    <p><strong>Occupation:</strong> {form.mother_occupation}</p>
                    <p><strong>Contact:</strong> {form.mother_contact}</p>
                  </div>
                  <div>
                    <h5 className="font-medium">Father</h5>
                    <p><strong>Name:</strong> {form.father_name}</p>
                    <p><strong>Occupation:</strong> {form.father_occupation}</p>
                    <p><strong>Contact:</strong> {form.father_contact}</p>
                  </div>
                </div>
              </div>

              {/* Siblings Section */}
              <div className="border rounded p-4">
                <h4 className="font-bold text-lg mb-2">Siblings</h4>
                {siblings.map((s, i) => (
                  <div key={i} className="mb-3 last:mb-0">
                    <div className="grid grid-cols-2 gap-4">
                      <p><strong>Name:</strong> {s.sibling_name}</p>
                      <p><strong>Relationship:</strong> {s.relationship}</p>
                      <p><strong>Age:</strong> {s.sibling_age}</p>
                      <p><strong>Contact:</strong> {s.contact}</p>
                    </div>
                    {i < siblings.length - 1 && <hr className="my-2" />}
                  </div>
                ))}
              </div>

              {/* Signature Section */}
              
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-6">
          {currentPage > 1 && (
            <button
              type="button"
              onClick={handlePrev}
              className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
            >
              Previous
            </button>
          )}
          
          <div className="flex-1 text-center text-sm text-gray-500">
            Page {currentPage} of {totalPages}
          </div>
          
          {currentPage < totalPages ? (
            <button
              type="button"
              onClick={handleNext}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Next
            </button>
          ) : (
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Submit
            </button>
          )}
        </div>
      </div>
    </form>
  );
}
   
        