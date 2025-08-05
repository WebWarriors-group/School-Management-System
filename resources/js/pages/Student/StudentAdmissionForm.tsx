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
          resetFormState(); 
          setShowForm(false);
        }
      })
      .catch((error) => {
        console.error('Network error:', error);
        alert("Network error occurred while submitting the form.");
      });

  }
  return (
   
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-xl shadow-2xl w-full max-w-5xl max-h-[90vh] flex flex-col overflow-hidden border-t-4 border-blue-600"
    >
    
      <div className="bg-[#152238] text-white p-6 sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
           
            <div className="mr-4 bg-white p-2 rounded-full">
              <img src="/images/School.jpg" alt="School Logo" className="w-10 h-10" />

            </div>
            <div>
              <h1 className="text-2xl font-bold"> T / Tn/ Mahadivulwewa Maha Vidyalaya(National School)</h1>
              <p className="text-blue-100">Student Admission Form</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => { resetFormState(); setShowForm(false); }}
            className="text-white hover:text-blue-200 text-2xl"
            aria-label="Close form"
          >
            &times;
          </button>
        </div>

  
        <div className="mt-6">
          <div className="flex justify-between mb-2 text-sm font-medium text-blue-100">
            {[1, 2, 3, 4, 5].map((page) => (
              <span
                key={page}
                className={`${currentPage >= page ? 'text-white' : 'text-blue-200'}`}
              >
                {page === 1 && 'Academic'}
                {page === 2 && 'Family'}
                {page === 3 && 'Personal'}
                {page === 4 && 'Siblings'}
                {page === 5 && 'Review'}
              </span>
            ))}
          </div>
          <div className="w-full bg-blue-400 bg-opacity-50 rounded-full h-2">
            <div
              className="bg-white h-2 rounded-full"
              style={{ width: `${(currentPage / totalPages) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

     
      <div className="p-6 overflow-y-auto flex-grow bg-gray-50">
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
          <StudentSiblingForm
            siblings={siblings}
            handleSiblingChange={handleSiblingChange}
            addSibling={addSibling}
          />
        )}
        {currentPage === 5 && (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-800">Review Your Application</h2>
              <p className="text-gray-600">Please verify all information before submission</p>
            </div>

          
            <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
              <div className="flex items-center mb-4">
                <div className="bg-blue-100 p-2 rounded-lg mr-3">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-800">Personal Information</h3>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <InfoRow label="Full Name" value={form.full_name} />
                  <InfoRow label="Name with Initials" value={form.full_name_with_initial} />
                  <InfoRow label="Birthday" value={form.birthday} />
                  <InfoRow label="Age" value={form.age} />
                </div>
                <div className="space-y-3">
                  <InfoRow label="Gender" value={form.gender} />
                  <InfoRow label="Ethnicity" value={form.ethnicity} />
                  <InfoRow label="Religion" value={form.religion} />
                  {form.photo && (
                    <div>
                      <InfoRow label="Photo" value="" />
                      <img
                        src={typeof form.photo === "string" ? form.photo : URL.createObjectURL(form.photo)}
                        alt="Student"
                        className="mt-1 h-24 w-24 object-cover rounded-lg border-2 border-blue-200"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>

          
            <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
              <div className="flex items-center mb-4">
                <div className="bg-blue-100 p-2 rounded-lg mr-3">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-800">Academic Information</h3>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <InfoRow label="Registration No" value={form.reg_no} />
                  <InfoRow label="Class" value={form.class_id} />
                  <InfoRow label="Distance to School" value={`${form.distance_to_school} km`} />
                </div>
                <div className="space-y-3">
                  <InfoRow label="Transport Method" value={form.method_of_coming_to_school} />
                  <InfoRow label="Grade 5 Scholarship" value={form.receiving_any_grade_5_scholarship ? "Yes" : "No"} />
                  <InfoRow label="Other Scholarship" value={form.receiving_any_scholarship ? "Yes" : "No"} />
                </div>
              </div>
            </div>

        
            <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
              <div className="flex items-center mb-4">
                <div className="bg-blue-100 p-2 rounded-lg mr-3">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-800">Family Information</h3>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h4 className="font-medium text-blue-700 border-b border-blue-100 pb-1">Mother</h4>
                  <InfoRow label="Name" value={form.mother_name} />
                  <InfoRow label="Occupation" value={form.mother_occupation} />
                  <InfoRow label="Contact" value={form.mother_contact} />
                </div>
                <div className="space-y-3">
                  <h4 className="font-medium text-blue-700 border-b border-blue-100 pb-1">Father</h4>
                  <InfoRow label="Name" value={form.father_name} />
                  <InfoRow label="Occupation" value={form.father_occupation} />
                  <InfoRow label="Contact" value={form.father_contact} />
                </div>
              </div>
            </div>

          
            {siblings.length > 0 && (
              <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
                <div className="flex items-center mb-4">
                  <div className="bg-blue-100 p-2 rounded-lg mr-3">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800">Siblings ({siblings.length})</h3>
                </div>
                <div className="space-y-4">
                  {siblings.map((s, i) => (
                    <div key={i} className="border border-blue-50 rounded-lg p-4 bg-blue-50">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <InfoRow label="Name" value={s.sibling_name} />
                          <InfoRow label="Relationship" value={s.relationship} />
                        </div>
                        <div className="space-y-2">
                          <InfoRow label="Age" value={s.sibling_age.toString()} />
                          <InfoRow label="Contact" value={s.contact} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

    
            <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
              <div className="flex items-center mb-4">
                <div className="bg-blue-100 p-2 rounded-lg mr-3">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-800">Confirmation</h3>
              </div>
              <div className="flex items-start">
                <input
                  type="checkbox"
                  id="confirmation"
                  required
                  className="mt-1 mr-3 h-5 w-5 text-blue-600 rounded focus:ring-blue-500 border-gray-300"
                />
                <label htmlFor="confirmation" className="text-gray-700">
                  I hereby declare that all the information provided in this application is true,
                  complete and accurate to the best of my knowledge. I understand that any false
                  information may result in the rejection of this application.
                </label>
              </div>
            </div>
          </div>
        )}
      </div>

   
      <div className="border-t border-gray-200 p-4 sticky bottom-0 bg-white">
        <div className="flex justify-between">
          {currentPage > 1 ? (
            <button
              type="button"
              onClick={handlePrev}
              className="flex items-center px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
              Previous
            </button>
          ) : (
            <div></div>
          )}

          {currentPage < totalPages ? (
            <button
              type="button"
              onClick={handleNext}
              className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Next
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          ) : (
            <button
              type="submit"
              className="flex items-center px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              Submit Application
            </button>
          )}
        </div>
      </div>
    </form>

  );
};


const InfoRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex">
    <span className="font-medium text-gray-700 w-40">{label}:</span>
    <span className="text-gray-900">{value || '-'}</span>
  </div>
);