import React, { useEffect, useState } from 'react';
import StudentAcademicForm from './StudentAcademicForm';
import StudentPersonalForm from './StudentPersonalForm';
import StudentFamilyForm from './StudentFamilyForm';
import StudentSiblingForm from './StudentSiblingForm';

interface StudentAdmissionFormProps {
  setShowForm: (val: boolean) => void
}

export default function StudentAdmissionForm({ setShowForm }: StudentAdmissionFormProps) {
  const [form, setForm] = useState({
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
    fullname_with_initial: '',
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
  });
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 5;


  useEffect(() => {
    let objectUrl: string | null = null;
    if (form.photo && typeof form.photo !== "string") {
      objectUrl = URL.createObjectURL(form.photo);
    }
    return () => {
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [form.photo]);
  const [siblings, setSiblings] = React.useState([
    { sibling_name: '', relationship: '', sibling_age: '', occupation: '', contact: '' }
  ]);
  const handleSiblingChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    index: number
  ) => {
    const { name, value } = e.target;
    setSiblings((prev) => {
      const newSiblings = [...prev];
      newSiblings[index] = { ...newSiblings[index], [name]: value };
      return newSiblings;
    });
  };

  const addSibling = () => {
    setSiblings((prev) => [...prev, { sibling_name: '', relationship: '', sibling_age: '', occupation: '', contact: '' }]);
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

  // 🔒 Confirmation dialog before proceeding
  if (!window.confirm('Are you sure you want to submit this admission form?')) return;

  try {
    const response = await fetch(`http://127.0.0.1:8000/api/students`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...form,
        siblings: siblings,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Validation or server error:', errorData);
      alert('Failed to submit admission. Please check the input.');
      return;
    }

    const data = await response.json();
    console.log('Submission success:', data);
    alert('Student admission submitted successfully!');
    setShowForm(false);
  } catch (error) {
    console.error('Submission error:', error);
    alert('Something went wrong. Please try again.');
  }
};


  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg  space-y-1 transition-all duration-300 ease-in-out max-h-[90vh] overflow-y-auto">

      <div className="relative mb-6">


        <button
          type="button"
          onClick={() => setShowForm(false)}
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
            <p><strong>Full Name with Initial:</strong> {form.fullname_with_initial}</p>
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
                <img
                  src={URL.createObjectURL(form.photo)}
                  alt="Uploaded"
                  className="mt-1 h-24 w-24 object-cover rounded border"
                />
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
      <div className="flex justify-between items-center mt-6 px-4">
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


