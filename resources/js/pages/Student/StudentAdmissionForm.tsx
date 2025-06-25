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
    <form onSubmit={handleSubmit} className="bg-white rounded-lg z-10 relative space-y-1 transition-all duration-300 ease-in-out left-50 top-20 max-w-3xl p-4 mx-auto max-h-[75vh] overflow-y-auto"
>

      <div className="relative mb-6">


        <button
          type="button"
          onClick={() => { resetFormState();
            setShowForm(false)}}
          className="absolute top-0 right-0 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-all duration-300 ease-in-out"
        >
          X
        </button>
        <h2 className="text-3xl font-semibold text-red-700 text-center">Student Admission Form</h2>
      </div>
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
        <div>
          <h3 className="text-2xl font-semibold text-yellow-900 mb-4 text-center">Review & Submit</h3>
          <div className="text-gray-800 space-y-2">


            <p><strong>Registration No:</strong> {form.reg_no}</p>
            <p><strong>Class:</strong> {form.class_id}</p>
            <p><strong>Distance to School:</strong> {form.distance_to_school} km</p>
            <p><strong>Method of Coming:</strong> {form.method_of_coming_to_school}</p>
            <p><strong>Aesthetic Subjects (6–9):</strong> {form.grade_6_9_asthectic_subjects}</p>
            <p><strong>Basket 1:</strong> {form.grade_10_11_basket1_subjects}</p>
            <p><strong>Basket 2:</strong> {form.grade_10_11_basket2_subjects}</p>
            <p><strong>Basket 3:</strong> {form.grade_10_11_basket3_subjects}</p>


            <p><strong>Grade 5 Scholarship:</strong> {form.receiving_any_grade_5_scholarship ? "Yes" : "No"}</p>
            <p><strong>Samurdhi/Aswesuma:</strong> {form.receiving_any_samurdhi_aswesuma ? "Yes" : "No"}</p>
            <p><strong>Other Scholarship:</strong> {form.receiving_any_scholarship ? "Yes" : "No"}</p>


            <p><strong>Full Name:</strong> {form.full_name}</p>
            <p><strong>Full Name with Initial:</strong> {form.full_name_with_initial}</p>
            <p><strong>Birthday:</strong> {form.birthday}</p>
            <p><strong>Age:</strong> {form.age}</p>
            <p><strong>Ethnicity:</strong> {form.ethnicity}</p>
            <p><strong>Religion:</strong> {form.religion}</p>
            <p><strong>Gender:</strong> {form.gender}</p>
            <p><strong>Birth Certificate Number:</strong> {form.birth_certificate_number}</p>
            <p><strong>NIC Number:</strong> {form.nic_number}</p>
            <p><strong>Postal IC Number:</strong> {form.postal_ic_number}</p>
            <p><strong>Address:</strong> {form.address}</p>
            <p><strong>Special Needs:</strong> {form.special_needs ? "Yes" : "No"}</p>
            <p><strong>Height:</strong> {form.height} cm</p>
            <p><strong>Weight:</strong> {form.weight} kg</p>
           {form.photo && (
  <div>
    <strong>Photo:</strong>
    {typeof form.photo !== "string" && (
      <img
        src={URL.createObjectURL(form.photo)}
        alt="Uploaded"
        className="mt-1 h-24 w-24 object-cover rounded border"
      />
    )}
  </div>
)}




            <hr className="my-3" />
            <h4 className="font-bold text-lg">Mother's Information</h4>
            <p><strong>Name:</strong> {form.mother_name}</p>
            <p><strong>Occupation:</strong> {form.mother_occupation}</p>
            <p><strong>Income:</strong> {form.mother_income}</p>
            <p><strong>Workplace:</strong> {form.mother_working_place}</p>
            <p><strong>Contact:</strong> {form.mother_contact}</p>
            <p><strong>Email:</strong> {form.mother_email}</p>
            <p><strong>WhatsApp:</strong> {form.mother_whatsapp}</p>


            <hr className="my-3" />
            <h4 className="font-bold text-lg">Father's Information</h4>
            <p><strong>Name:</strong> {form.father_name}</p>
            <p><strong>Occupation:</strong> {form.father_occupation}</p>
            <p><strong>Income:</strong> {form.father_income}</p>
            <p><strong>Workplace:</strong> {form.father_working_place}</p>
            <p><strong>Contact:</strong> {form.father_contact}</p>
            <p><strong>Email:</strong> {form.father_email}</p>
            <p><strong>WhatsApp:</strong> {form.father_whatsapp}</p>
            <hr className="my-3" />
            <h4 className="font-bold text-lg">Sibiling's Information</h4>
            {siblings.map((s, i) => (
              <div key={i}>
                <p><strong>Name:</strong> {s.sibling_name}</p>
                <p><strong>RelationShip</strong> {s.relationship}</p>
                <p><strong>Age:</strong> {s.sibling_age}</p>
                <p><strong>Occupation:</strong> {s.occupation}</p>
                <p><strong>Contact:</strong> {s.contact}</p>
                <hr className="my-2" />
              </div>
            ))}
          </div>
        </div>
      )}
      <div className="flex justify-between items-center mt-6 px-4 gap-4">
        {currentPage > 1 && (
          <button
            type="button"
            onClick={handlePrev}
            className="bg-yellow-600 text-white px-6 py-2 rounded-lg hover:bg-yellow-700 transition duration-200"
          >
            Previous
          </button>
        )}
        {currentPage < totalPages && (
          <button
            type="button"
            onClick={handleNext}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-200 ml-auto"
          >
            Next
          </button>
        )}
        {currentPage === totalPages && (
          <button
            type="submit"
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition duration-200 ml-auto"
          >
            Submit
          </button>
        )}
      </div>
    </form>
  );
}


