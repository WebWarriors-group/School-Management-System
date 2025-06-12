import React, { useEffect, useState } from 'react';

interface StudentAdmissionFormProps {
  setShowForm: (val: boolean) => void;
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
    father_whatsapp: ''


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
    { sibling_name: '', relationship: '', age: '', occupation: '', contact: '' }
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
    setSiblings((prev) => [...prev, { sibling_name: '', relationship: '', age: '', occupation: '', contact: '' }]);
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

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/students`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
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
  const currentYear = new Date().getFullYear();
  const minDate = `${currentYear - 20}-01-01`;
  const maxDate = `${currentYear - 10}-01-01`;
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
        <div>
          <h4 className="text-2xl font-semibold text-yellow-900 mb-2 text-center">Student Academic Details</h4>


          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <label className="block text-lg font-medium text-gray-700 mb-2">Registration No *</label>
              <input
                name="reg_no"
                type="text"
                value={form.reg_no}
                onChange={handleChange}
                className="w-full border-2 border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                required
              />
            </div>

            <div className="relative">
              <label className="block text-lg font-medium text-gray-700 mb-1">Class *</label>
              <input
                name="class_id"
                type="text"
                value={form.class_id}
                onChange={handleChange}
                className="w-full border-2 border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                required
              />
            </div>
          </div>


          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative">
              <label className="block text-lg font-medium text-gray-700 mb-2">Distance to School (km)</label>
              <input
                name="distance_to_school"
                type="number"
                min="0"
                value={form.distance_to_school}
                onChange={handleChange}
                className="w-full border-2 border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              />
            </div>

            <div className="relative">
              <label className="block text-lg font-medium text-gray-700 mb-2">Method of Coming to School</label>
              <input
                name="method_of_coming_to_school"
                type="text"
                value={form.method_of_coming_to_school}
                onChange={handleChange}
                className="w-full border-2 border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              />
            </div>
          </div>


          <div className="relative">
            <label className="block text-lg font-medium text-gray-700 mb-2">Grade 6–9 Aesthetic Subjects</label>
            <select
              name="grade_6_9_asthectic_subjects"
              value={form.grade_6_9_asthectic_subjects}
              onChange={handleChange}
              className="w-full border-2 border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            >
              <option value="">Select</option>
              <option value="Art">Art</option>
              <option value="Dance">Dance</option>
              <option value="Music">Music</option>
              <option value="Drama & Theatre">Drama & Theatre</option>
            </select>
          </div>


          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative">
              <label className="block text-lg font-medium text-gray-700 mb-2">Basket 1 Subjects</label>
              <select
                name="grade_10_11_basket1_subjects"
                value={form.grade_10_11_basket1_subjects}
                onChange={handleChange}
                className="w-full border-2 border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              >
                <option value="">Select</option>
                <option value="Commerce">Commerce</option>
                <option value="Civics">Civics</option>
                <option value="Geography">Geography</option>
                <option value="Home Science">Home Science</option>
              </select>
            </div>

            <div className="relative">
              <label className="block text-lg font-medium text-gray-700 mb-2">Basket 2 Subjects</label>
              <select
                name="grade_10_11_basket2_subjects"
                value={form.grade_10_11_basket2_subjects}
                onChange={handleChange}
                className="w-full border-2 border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              >
                <option value="">Select</option>
                <option value="Design & Technology">Design & Technology</option>
                <option value="Tamil Literature">Tamil Literature</option>
                <option value="English Literature">English Literature</option>
                <option value="Sinhala Literature">Sinhala Literature</option>
                <option value="Art">Art</option>
                <option value="Dance">Dance</option>
                <option value="Music">Music</option>
                <option value="Drama & Theatre">Drama & Theatre</option>
              </select>
            </div>

            <div className="relative">
              <label className="block text-lg font-medium text-gray-700 mb-2">Basket 3 Subjects</label>
              <select
                name="grade_10_11_basket3_subjects"
                value={form.grade_10_11_basket3_subjects}
                onChange={handleChange}
                className="w-full border-2 border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              >
                <option value="">Select</option>
                <option value="ICT">ICT</option>
                <option value="Health Science">Health Science</option>
                <option value="Agriculture">Agriculture</option>
              </select>
            </div>
          </div>


          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center gap-4">
              <input
                type="checkbox"
                name="receiving_any_grade_5_scholarship"
                checked={form.receiving_any_grade_5_scholarship}
                onChange={handleChange}
                className="w-5 h-5"
              />
              <label className="text-lg font-medium text-gray-700">Grade 5 Scholarship</label>
            </div>

            <div className="flex items-center gap-4">
              <input
                type="checkbox"
                name="receiving_any_samurdhi_aswesuma"
                checked={form.receiving_any_samurdhi_aswesuma}
                onChange={handleChange}
                className="w-5 h-5"
              />
              <label className="text-lg font-medium text-gray-700">Samurdhi / Aswesuma</label>
            </div>

            <div className="flex items-center gap-4">
              <input
                type="checkbox"
                name="receiving_any_scholarship"
                checked={form.receiving_any_scholarship}
                onChange={handleChange}
                className="w-5 h-5"
              />
              <label className="text-lg font-medium text-gray-700">Any Other Scholarship</label>
            </div>
          </div>
        </div>
      )}
      {currentPage == 2 && (

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


      )}
      {currentPage === 3 && (
        <div>
          <h4 className="text-2xl font-semibold text-yellow-900 mb-4 text-center">
            Student Personal Details
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <div>
              <label className="block text-lg font-medium text-gray-700 mb-2">Full Name *</label>
              <input
                name="full_name"
                type="text"
                value={form.full_name}
                onChange={handleChange}
                className="w-full border-2 border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>


            <div>
              <label className="block text-lg font-medium text-gray-700 mb-2">Full Name with Initial *</label>
              <input
                name="fullname_with_initial"
                type="text"
                value={form.fullname_with_initial}
                onChange={handleChange}
                className="w-full border-2 border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>


          <div className="my-4">
            <label className="block text-lg font-medium text-gray-700 mb-2">Photo</label>
            <input
              name="photo"
              type="file"
              accept="image/*"
              onChange={handleChange}
            />

            {form.photo && typeof form.photo !== "string" && (
              <img
                src={URL.createObjectURL(form.photo)}
                alt="Preview"
                className="mt-2 max-h-40 object-contain"
              />
            )}

          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <div>
              <label className="block text-lg font-medium text-gray-700 mb-2">Birthday *</label>
              <input
                name="birthday"
                type="date"
                value={form.birthday}
                min={minDate}
                max={maxDate}
                onChange={handleChange}
                className="w-full border-2 border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>


            <div>
              <label className="block text-lg font-medium text-gray-700 mb-2">Age</label>
              <input
                name="age"
                type="number"
                min="10"
                max="21"
                value={form.age}
                onChange={handleChange}
                className="w-full border-2 border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                readOnly
              />

            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <div>
              <label className="block text-lg font-medium text-gray-700 mb-2">Ethnicity</label>
              <select
                name="ethnicity"
                value={form.ethnicity}
                onChange={handleChange}
                className="w-full border-2 border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select</option>
                <option value="Sinhalese">Sinhalese</option>
                <option value="Tamil">Tamil</option>
                <option value="Muslim">Muslim</option>
                <option value="Other">Other</option>
              </select>
            </div>


            <div>
              <label className="block text-lg font-medium text-gray-700 mb-2">Religion</label>
              <select
                name="religion"
                value={form.religion}
                onChange={handleChange}
                className="w-full border-2 border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select</option>
                <option value="Buddhism">Buddhism</option>
                <option value="Hinduism">Hinduism</option>
                <option value="Islam">Islam</option>
                <option value="Christianity">Christianity</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <div>
              <label className="block text-lg font-medium text-gray-700 mb-2">Gender</label>
              <select
                name="gender"
                value={form.gender}
                onChange={handleChange}
                className="w-full border-2 border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>


            <div className="flex items-center mt-6">
              <input
                type="checkbox"
                name="special_needs"
                checked={form.special_needs}
                onChange={handleChange}
                className="w-5 h-5 mr-3"
              />
              <label className="text-lg font-medium text-gray-700">Special Needs</label>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <div>
              <label className="block text-lg font-medium text-gray-700 mb-2">Birth Certificate Number</label>
              <input
                name="birth_certificate_number"
                type="text"
                value={form.birth_certificate_number}
                onChange={handleChange}
                className="w-full border-2 border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>


            <div>
              <label className="block text-lg font-medium text-gray-700 mb-2">NIC Number</label>
              <input
                name="nic_number"
                type="text"
                value={form.nic_number}
                onChange={handleChange}
                className="w-full border-2 border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <div>
              <label className="block text-lg font-medium text-gray-700 mb-2">Postal IC Number</label>
              <input
                name="postal_ic_number"
                type="text"
                value={form.postal_ic_number}
                onChange={handleChange}
                className="w-full border-2 border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>


            <div>
              <label className="block text-lg font-medium text-gray-700 mb-2">Address</label>
              <textarea
                name="address"
                value={form.address}
                onChange={handleChange}
                className="w-full border-2 border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={4}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">


            <div>
              <label className="block text-lg font-medium text-gray-700 mb-2">Height (cm)</label>
              <input
                name="height"
                type="number"
                min="0"
                value={form.height}
                onChange={handleChange}
                className="w-full border-2 border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>


            <div>
              <label className="block text-lg font-medium text-gray-700 mb-2">Weight (kg)</label>
              <input
                name="weight"
                type="number"
                min="0"
                value={form.weight}
                onChange={handleChange}
                className="w-full border-2 border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      )}


      {currentPage === 4 && (
        <div>
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
                value={siblings[index].relationship}
                onChange={(e) => handleSiblingChange(e, index)}
                className="w-full p-2 border rounded"
              >
                <option value="">Select Relationship</option>
                <option value="Brother">Brother</option>
                <option value="Sister">Sister</option>
              </select>

              <input
                type="number"
                name="age"
                value={sibling.age}
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

          <div className="flex justify-between mt-4">
            <button type="button" onClick={addSibling} className="px-4 py-2 bg-blue-500 text-white rounded">Add Another Sibling</button>
          </div>
        </div>
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


