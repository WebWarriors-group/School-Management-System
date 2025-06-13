import { useState } from "react";
import { useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

import InputError from '@/components/input-error';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type TeacherForm = {
  teacher_NIC: string;
  Full_name: string;
  Full_name_with_initial: string;
  Photo: File | null;
  Gender: string;
  Region: string;
  Ethnicity: string;
  Birthdate: string;
  Title: string;
  Marital_status: string;
  Details_about_family_members: string;
  Emergency_telephone_number: string;
  Email_address: string;
  Fixed_telephone_number: string;
  Mobile_number: string;
  Whatsapp_number: string;
  permanent_address: string;
  residential_address: string;
  grama_niladari_division: string;
  grama_niladari_division_number: string;
  election_division: string;
  election_division_number: string;
  appointed_date: string;
  work_acceptance_date: string;
  
  // New Fields
  appointment_type: string;
  salary_increment_date: string; // ISO format date (YYYY-MM-DD)
  current_grade_of_teaching_service: "Grade I" | "Grade II" | "Grade III";
  work_acceptance_date_school: string; // ISO format date (YYYY-MM-DD)
  temporary_attachedschool_or_institute_name: string;
  appointed_subject: string;
  which_grades_teaching_done: string;
  current_teaching_subject: string;
  other_subjects_taught: string;
  assigned_class: string;
  other_responsibilities_assigned: string;
  is_150_hrs_tamil_course_completed: boolean;
  commuting_from_school: "Home" | "Boarding" | "Hostel" | "Other";
  distance_from_school: number;
  commuting_method_to_school: "Bicycle" | "MotorBike" | "Car" | "Bus" | "Threewheeler" | "Walk" | "Other";
  number_in_sign_sheet: string;
  number_in_salary_sheet: string;
  type_of_service_in_school:string;
  gce_al_subject_stream: string;
  highest_education_qualification: string;
  basic_degree_stream: string;
  highest_professional_qualification: string;
  present_class: string;
  present_grade: string;
  appointment_date_for_current_class: string;
  appointment_date_for_current_grade: string;
  current_appointment_service_medium: string;
  appointed_subject_section: string;
  subject_appointed: string;
  currentservice_appointed_date: string;
  subjects_taught_most_and_second_most: string;
  position_in_the_school: string;
  assign_date_for_the_school: string;
  other_responsibilities_in_school: string;
  EDCS_membership: string;
  WSOP_Number: number | null;
  Agrahara_insuarence_membership: string;

};





export default function AddTeacherForm() {
  const { data, setData, post, processing, errors } = useForm<TeacherForm>({
    // TeacherForm Fields
    teacher_NIC: '',
    Full_name: '',
    Full_name_with_initial: '',
    Photo: null,
    Gender: "Male",
    Region: '',
    Ethnicity: '',
    Birthdate: '',
    Title: '',
    Marital_status: "Single",
    Details_about_family_members: '',
    Emergency_telephone_number: '',
    Email_address: '',
    Fixed_telephone_number: '',
    Mobile_number: '',
    Whatsapp_number: '',
    permanent_address: '',
    residential_address: '',
    grama_niladari_division: '',
    grama_niladari_division_number: '',
    election_division: '',
    election_division_number: '',
    appointed_date: '',
    work_acceptance_date: '',
    appointment_type: '',
    salary_increment_date: '',
    current_grade_of_teaching_service: "Grade I",
    work_acceptance_date_school: '',
    temporary_attachedschool_or_institute_name: '',
    appointed_subject: '',
    which_grades_teaching_done: '',
    current_teaching_subject: '',
    other_subjects_taught: '',
    assigned_class: '',
    other_responsibilities_assigned: '',
    is_150_hrs_tamil_course_completed: false,
    commuting_from_school: "Home",
    distance_from_school: 0,
    commuting_method_to_school: "Bicycle",
    number_in_sign_sheet: '',
    number_in_salary_sheet: '',
  
    // TeacherAdditionalInfoForm Fields
    type_of_service_in_school:'',
    gce_al_subject_stream: '',
    highest_education_qualification: '',
    basic_degree_stream: '',
    highest_professional_qualification: '',
    present_class: "class I",
    present_grade: "Grade I",
    appointment_date_for_current_class: '',
    appointment_date_for_current_grade: '',
    current_appointment_service_medium: "Tamil",
    appointed_subject_section: '',
    subject_appointed: '',
    currentservice_appointed_date: '',
    subjects_taught_most_and_second_most: '',
    position_in_the_school: '',
    assign_date_for_the_school: '',
    other_responsibilities_in_school:'',
    EDCS_membership: "Yes",
    WSOP_Number: null,
    Agrahara_insuarence_membership: "Yes",
  });
  

  const submit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    setData('current_grade_of_teaching_service', data.current_grade_of_teaching_service || 'Grade I'); // Default value if empty
    setData('present_class', data.present_class || 'class I');
    setData('present_grade', data.present_grade || 'Grade I');
    setData('current_appointment_service_medium', data.current_appointment_service_medium || 'Tamil');
    setData('is_150_hrs_tamil_course_completed', data.is_150_hrs_tamil_course_completed !== undefined ? data.is_150_hrs_tamil_course_completed : false); // Default to false if undefined
  setData('commuting_from_school', data.commuting_from_school || 'Home'); // Default to 'Home' if empty
  setData('distance_from_school', Number(data.distance_from_school) || 0); // Default to 0 if empty
  setData('commuting_method_to_school', data.commuting_method_to_school || 'Bicycle'); // Default to 'Bicycle' if empty
  setData('WSOP_Number', data.WSOP_Number || null); // Default to null if empty

    
    post(route('teacher.requests'), {
      
    headers: { "Content-Type": "multipart/form-data" }, 
      onSuccess: () => alert('Teacher data added successfully!'),
      onError: (errors) => console.log('Validation Errors:', errors),
    });
  };
    
        const [step, setStep] = useState(1);
      
        const handleNextStep = () => setStep(step + 1);
        const handlePrevStep = () => setStep(step - 1);
    
    
    const [photo, setPhoto] = useState<File | null>(null);
    const [photoName, setPhotoName] = useState<string>("");
    

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const file = e.target.files[0];
            setPhoto(file);  // Store the file
            setPhotoName(file.name);  // Store the file name
        }
    };
    return (
        <div className="max-w-xl mx-auto mt-2 p-7 bg-white shadow-lg rounded-lg  border-t-6 border-t-[#152238]">
            <h2 className="text-2xl font-bold mb-4 text-yellow-700">Add Teacher</h2>
            <form className="flex flex-col gap-6" onSubmit={submit} encType="multipart/form-data">
            {step === 1 && (
  <div>
    <h3 className="text-xl font-bold"> Teacher's Basic Information</h3>
    
    {/* Teacher NIC */}
    <div className="mb-4 py-5">
      <label htmlFor="teacher_NIC" className="block text-sm font-medium text-gray-700">
        Teacher NIC
      </label>
      <input
        type="text"
        id="teacher_NIC"
        name="teacher_NIC"
        className="w-full p-2 border rounded"
        placeholder="Enter Teacher NIC"
        value={data.teacher_NIC}
        onChange={(e) => setData('teacher_NIC', e.target.value)}
        required
      />
      <InputError message={errors.teacher_NIC} className="mt-2" />
    </div>

    {/* Full Name */}
    <div className="mb-4">
      <label htmlFor="Full_name" className="block text-sm font-medium text-gray-700">
        Full Name
      </label>
      <input
        type="text"
        id="Full_name"
        name="Full_name"
        className="w-full p-2 border rounded"
        placeholder="Enter Full Name"
        value={data.Full_name}
        onChange={(e) => setData('Full_name', e.target.value)}
        required
      />
      <InputError message={errors.Full_name} className="mt-2" />
    </div>

    {/* Full Name with Initials */}
    <div className="mb-4">
      <label htmlFor="Full_name_with_initial" className="block text-sm font-medium text-gray-700">
        Full Name with Initials
      </label>
      <input
        type="text"
        id="Full_name_with_initial"
        name="Full_name_with_initial"
        className="w-full p-2 border rounded"
        placeholder="Enter Full Name with Initials"
        value={data.Full_name_with_initial}
        onChange={(e) => setData('Full_name_with_initial', e.target.value)}
        required
      />
      <InputError message={errors.Full_name_with_initial} className="mt-2" />
    </div>

    {/* Photo Upload */}
    <div className="mb-4">
      <label htmlFor="Photo" className="block text-sm font-medium text-gray-700">
        Upload Photo
      </label>
      <input
        type="file"
        id="Photo"
        name="Photo"
        className="w-full p-2 border rounded"
        onChange={(e) => setData('Photo', e.target.files ? e.target.files[0] : null)}
      />
      <InputError message={errors.Photo} className="mt-2" />
    </div>

    {/* Gender */}
    <div className="mb-4">
      <label htmlFor="Gender" className="block text-sm font-medium text-gray-700">
        Gender
      </label>
      <select
        id="Gender"
        name="Gender"
        className="w-full p-2 border rounded"
        value={data.Gender}
        onChange={(e) => setData('Gender', e.target.value as "Male" | "Female" | "Other")}
        required
      >
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="Other">Other</option>
      </select>
      <InputError message={errors.Gender} className="mt-2" />
    </div>

    {/* Region */}
    <div className="mb-4">
      <label htmlFor="Religion" className="block text-sm font-medium text-gray-700">
        Religion
      </label>
      <input
        type="text"
        id="Region"
        name="Region"
        className="w-full p-2 border rounded"
        placeholder="Enter Religion"
        value={data.Region}
        onChange={(e) => setData('Region', e.target.value)}
        required
      />
      <InputError message={errors.Region} className="mt-2" />
    </div>

    {/* Ethnicity */}
    <div className="mb-4">
      <label htmlFor="Ethnicity" className="block text-sm font-medium text-gray-700">
        Ethnicity
      </label>
      <input
        type="text"
        id="Ethnicity"
        name="Ethnicity"
        className="w-full p-2 border rounded"
        placeholder="Enter Ethnicity"
        value={data.Ethnicity}
        onChange={(e) => setData('Ethnicity', e.target.value)}
        required
      />
      <InputError message={errors.Ethnicity} className="mt-2" />
    </div>

    {/* Birthdate */}
    <div className="mb-4">
      <label htmlFor="Birthdate" className="block text-sm font-medium text-gray-700">
        Birthdate
      </label>
      <input
        type="date"
        id="Birthdate"
        name="Birthdate"
        className="w-full p-2 border rounded"
        value={data.Birthdate}
        onChange={(e) => setData('Birthdate', e.target.value)}
        max={new Date().toISOString().split('T')[0]} // This sets today's date as the max

        required
      />
      <InputError message={errors.Birthdate} className="mt-2" />
    </div>

    {/* Title */}
    <div className="mb-4">
      <label htmlFor="Title" className="block text-sm font-medium text-gray-700">
        Title
      </label>
      <input
        type="text"
        id="Title"
        name="Title"
        className="w-full p-2 border rounded"
        placeholder="Enter Title"
        value={data.Title}
        onChange={(e) => setData('Title', e.target.value)}
        required
      />
      <InputError message={errors.Title} className="mt-2" />
    </div>

    {/* Marital Status */}
    <div className="mb-4">
      <label htmlFor="Marital_status" className="block text-sm font-medium text-gray-700">
        Marital Status
      </label>
      <select
        id="Marital_status"
        name="Marital_status"
        className="w-full p-2 border rounded"
        value={data.Marital_status}
        onChange={(e) => setData('Marital_status', e.target.value as "Single" | "Married" | "Divorced" | "Widowed")}
        required
      >
        <option value="Single">Single</option>
        <option value="Married">Married</option>
        <option value="Divorced">Divorced</option>
        <option value="Widowed">Widowed</option>
      </select>
      <InputError message={errors.Marital_status} className="mt-2" />
    </div>

    {/* Details About Family Members */}
    <div className="mb-4">
      <label htmlFor="Details_about_family_members" className="block text-sm font-medium text-gray-700">
        Details About Family Members
      </label>
      <textarea
        id="Details_about_family_members"
        name="Details_about_family_members"
        className="w-full p-2 border rounded"
        placeholder="Enter Details About Family Members"
        value={data.Details_about_family_members}
        onChange={(e) => setData('Details_about_family_members', e.target.value)}
      />
      <InputError message={errors.Details_about_family_members} className="mt-2" />
    </div>

    {/* Emergency Telephone Number */}
    <div className="mb-4">
      <label htmlFor="Emergency_telephone_number" className="block text-sm font-medium text-gray-700">
        Emergency Telephone Number
      </label>
      <input
        type="tel"
        id="Emergency_telephone_number"
        name="Emergency_telephone_number"
        className="w-full p-2 border rounded"
        placeholder="Enter Number"
        value={data.Emergency_telephone_number}
        onChange={(e) => setData('Emergency_telephone_number', e.target.value)}
        required
      />
      <InputError message={errors.Emergency_telephone_number} className="mt-2" />
    </div>

    <div className="mb-4">
      <label htmlFor="Email_address" className="block text-sm font-medium text-gray-700">
        E-mail Address
      </label>
      <input
        type="email"
        id="Email_address"
        name="Email_address"
        className="w-full p-2 border rounded"
        placeholder="example@gmail.com"
        value={data.Email_address}
        onChange={(e) => setData('Email_address', e.target.value)}
        required
      />
      <InputError message={errors.Email_address} className="mt-2" />
    </div>

    <div className="mb-4">
      <label htmlFor="Fixed_telephone_number" className="block text-sm font-medium text-gray-700">
        Fixed Telephone Number
      </label>
      <input
        type="tel"
        id="Fixed_telephone_number"
        name="Fixed_telephone_number"
        className="w-full p-2 border rounded"
        placeholder="Enter Number"
        value={data.Fixed_telephone_number}
        onChange={(e) => setData('Fixed_telephone_number', e.target.value)}
        required
      />
      <InputError message={errors.Fixed_telephone_number} className="mt-2" />
    </div>
    <div className="mb-4">
      <label htmlFor="Mobile_number" className="block text-sm font-medium text-gray-700">
        Mobile Number
      </label>
      <input
        type="tel"
        id="Mobile_number"
        name="Mobile_number"
        className="w-full p-2 border rounded"
        placeholder="Enter Number"
        value={data.Mobile_number}
        onChange={(e) => setData('Mobile_number', e.target.value)}
        required
      />
      <InputError message={errors.Mobile_number} className="mt-2" />
    </div>
    <div className="mb-4">
      <label htmlFor="Whatsapp_number" className="block text-sm font-medium text-gray-700">
        Whatsapp Number
      </label>
      <input
        type="tel"
        id="Whatsapp_number"
        name="Whatsapp_number"
        className="w-full p-2 border rounded"
        placeholder="Enter Number"
        value={data.Whatsapp_number}
        onChange={(e) => setData('Whatsapp_number', e.target.value)}
        required
      />
      <InputError message={errors.Whatsapp_number} className="mt-2" />
    </div>

    {/* Navigation Buttons */}
    <div className="flex justify-between">
      <button
        type="button"
        onClick={handleNextStep}
        className="bg-blue-600 text-white  text-right px-4 py-2 rounded-2xl cursor-[pointer]"
        disabled={processing}
      >
        Next
      </button>
    </div>
  </div>
)}

{step === 2 && (
  <div>
    <h3 className="text-lg font-bold">Step 2: Address Info</h3>

    {/* Permanent Address */}
<div className="mb-4">
  <label htmlFor="permanent_address" className="block text-sm font-medium text-gray-700">
    Permanent Address
  </label>
  <input
    type="text"
    id="permanent_address"
    name="permanent_address"
    className="w-full p-2 border rounded mt-1"
    value={data.permanent_address}
    onChange={(e) => setData('permanent_address', e.target.value)}
    required
  />
  <InputError message={errors.permanent_address} className="mt-2" />
</div>

{/* Residential Address */}
<div className="mb-4">
  <label htmlFor="residential_address" className="block text-sm font-medium text-gray-700">
    Residential Address
  </label>
  <input
    type="text"
    id="residential_address"
    name="residential_address"
    className="w-full p-2 border rounded mt-1"
    value={data.residential_address}
    onChange={(e) => setData('residential_address', e.target.value)}
    required
  />
  <InputError message={errors.residential_address} className="mt-2" />
</div>

{/* Grama Niladari Division */}
<div className="mb-4">
  <label htmlFor="grama_niladari_division" className="block text-sm font-medium text-gray-700">
    Grama Niladari Division
  </label>
  <input
    type="text"
    id="grama_niladari_division"
    name="grama_niladari_division"
    className="w-full p-2 border rounded mt-1"
    value={data.grama_niladari_division}
    onChange={(e) => setData('grama_niladari_division', e.target.value)}
    required
  />
  <InputError message={errors.grama_niladari_division} className="mt-2" />
</div>

{/* Grama Niladari Division Number */}
<div className="mb-4">
  <label htmlFor="grama_niladari_division_number" className="block text-sm font-medium text-gray-700">
    Grama Niladari Division Number
  </label>
  <input
    type="text"
    id="grama_niladari_division_number"
    name="grama_niladari_division_number"
    className="w-full p-2 border rounded mt-1"
    value={data.grama_niladari_division_number}
    onChange={(e) => setData('grama_niladari_division_number', e.target.value)}
    required
  />
  <InputError message={errors.grama_niladari_division_number} className="mt-2" />
</div>

{/* Election Division */}
<div className="mb-4">
  <label htmlFor="election_division" className="block text-sm font-medium text-gray-700">
    Election Division
  </label>
  <input
    type="text"
    id="election_division"
    name="election_division"
    className="w-full p-2 border rounded mt-1"
    value={data.election_division}
    onChange={(e) => setData('election_division', e.target.value)}
    required
  />
  <InputError message={errors.election_division} className="mt-2" />
</div>

{/* Election Division Number */}
<div className="mb-4">
  <label htmlFor="election_division_number" className="block text-sm font-medium text-gray-700">
    Election Division Number
  </label>
  <input
    type="text"
    id="election_division_number"
    name="election_division_number"
    className="w-full p-2 border rounded mt-1"
    value={data.election_division_number}
    onChange={(e) => setData('election_division_number', e.target.value)}
    required
  />
  <InputError message={errors.election_division_number} className="mt-2" />
</div>

    <div className="flex justify-between">
      <button type="button" onClick={handlePrevStep} className="bg-gray-600 text-white px-4 py-2 rounded-md">
        Back
      </button>
      <button type="button" onClick={handleNextStep} className="bg-blue-600 text-white px-4 py-2 rounded-md">
        Next
      </button>
    </div>
  </div>
)}

{step === 3 && (
  <div>
    <h3 className="text-lg font-bold">Step 3: Teacher's Work Information</h3>

    {/* Appointed Date */}
    <div className="mb-4">
      <label htmlFor="appointed_date" className="block text-sm font-medium text-gray-700">
        Appointed Date
      </label>
      <input
        type="date"
        name="appointed_date"
        id="appointed_date"
        value={data.appointed_date}
        onChange={(e)=>setData('appointed_date',e.target.value)}
        max={new Date().toISOString().split('T')[0]} // This sets today's date as the max
        className="w-full p-2 border rounded"
        required
      />
    </div>

    {/* Work Acceptance Date */}
    <div className="mb-4">
      <label htmlFor="work_acceptance_date" className="block text-sm font-medium text-gray-700">
        Work Acceptance Date
      </label>
      <input
        type="date"
        name="work_acceptance_date"
        id="work_acceptance_date"
        value={data.work_acceptance_date}
        onChange={(e)=>setData('work_acceptance_date',e.target.value)}
        max={new Date().toISOString().split('T')[0]} // This sets today's date as the max
        className="w-full p-2 border rounded"
        required
      />
    </div>

    {/* Appointment Type */}
    <div className="mb-4">
      <label htmlFor="appointment_type" className="block text-sm font-medium text-gray-700">
        Appointment Type
      </label>
      <input
        type="text"
        name="appointment_type"
        id="appointment_type"
        value={data.appointment_type}
        onChange={(e)=>setData('appointment_type',e.target.value)}

        className="w-full p-2 border rounded"
        placeholder="Enter Appointment Type"
        required
      />
    </div>

    {/* Salary Increment Date */}
    <div className="mb-4">
      <label htmlFor="salary_increment_date" className="block text-sm font-medium text-gray-700">
        Salary Increment Date
      </label>
      <input
        type="date"
        name="salary_increment_date"
        //id="salary_increment_date"
        value={data.salary_increment_date}
        onChange={(e)=>setData('salary_increment_date',e.target.value)}
        max={new Date().toISOString().split('T')[0]} // This sets today's date as the max
        className="w-full p-2 border rounded"
        required
      />
    </div>

    {/* Current Grade of Teaching Service */}
    <div className="mb-4">
      <label htmlFor="current_grade_of_teaching_service" className="block text-sm font-medium text-gray-700">
        Current Grade of Teaching Service
      </label>
      <select
        name="current_grade_of_teaching_service"
        id="current_grade_of_teaching_service"
        value={data.current_grade_of_teaching_service}
       onChange={(e)=>{console.log("Selected Value:", e.target.value);
        setData('current_grade_of_teaching_service',e.target.value as "Grade I" | "Grade II" | "Grade III")}}

        className="w-full p-2 border rounded"
        required
      >
        <option value="Grade I">Grade I</option>
        <option value="Grade II">Grade II</option>
        <option value="Grade III">Grade III</option>
      </select>
    </div>

    {/* Work Acceptance Date at School */}
    <div className="mb-4">
      <label htmlFor="work_acceptance_date_school" className="block text-sm font-medium text-gray-700">
        Work Acceptance Date at School
      </label>
      <input
        type="date"
        name="work_acceptance_date_school"
        id="work_acceptance_date_school"
        value={data.work_acceptance_date_school}
        onChange={(e)=>setData('work_acceptance_date_school',e.target.value)}
        max={new Date().toISOString().split('T')[0]} // This sets today's date as the max
        className="w-full p-2 border rounded"
        required
      />
    </div>

    {/* Temporary Attached School or Institute Name */}
    <div className="mb-4">
      <label htmlFor="temporary_attachedschool_or_institute_name" className="block text-sm font-medium text-gray-700">
        Temporary Attached School or Institute Name
      </label>
      <input
        type="text"
        name="temporary_attachedschool_or_institute_name"
        id="temporary_attachedschool_or_institute_name"
        value={data.temporary_attachedschool_or_institute_name}
        onChange={(e)=>setData('temporary_attachedschool_or_institute_name',e.target.value)}
 
        className="w-full p-2 border rounded"
        placeholder="Enter School or Institute Name"
        required
      />
    </div>

    {/* Appointed Subject */}
    <div className="mb-4">
      <label htmlFor="appointed_subject" className="block text-sm font-medium text-gray-700">
        Appointed Subject
      </label>
      <input
        type="text"
        name="appointed_subject"

        id="appointed_subject"
        value={data.appointed_subject}
        onChange={(e)=>setData('appointed_subject',e.target.value)}
 
        className="w-full p-2 border rounded"
        placeholder="Enter Appointed Subject"
        required
      />
    </div>

    {/* Which Grades Teaching Done */}
    <div className="mb-4">
      <label htmlFor="which_grades_teaching_done" className="block text-sm font-medium text-gray-700">
        Which Grades Teaching Done
      </label>
      <input
        type="text"
        name="which_grades_teaching_done"
        id="which_grades_teaching_done"
        value={data.which_grades_teaching_done}
        onChange={(e)=>setData('which_grades_teaching_done',e.target.value)}
 
        className="w-full p-2 border rounded"
        placeholder="Enter Grades Teaching Done"
        required
      />
    </div>

    {/* Current Teaching Subject */}
    <div className="mb-4">
      <label htmlFor="current_teaching_subject" className="block text-sm font-medium text-gray-700">
        Current Teaching Subject
      </label>
      <input
        type="text"
        name="current_teaching_subject"
        id="current_teaching_subject"
        value={data.current_teaching_subject}
        onChange={(e)=>setData('current_teaching_subject',e.target.value)}
 
        className="w-full p-2 border rounded"
        placeholder="Enter Current Teaching Subject"
        required
      />
    </div>

    {/* Other Subjects Taught */}
    <div className="mb-4">
      <label htmlFor="other_subjects_taught" className="block text-sm font-medium text-gray-700">
        Other Subjects Taught
      </label>
      <input
        type="text"
        name="other_subjects_taught"
        id="other_subjects_taught"
        value={data.other_subjects_taught}
        onChange={(e)=>setData('other_subjects_taught',e.target.value)}
 
        className="w-full p-2 border rounded"
        placeholder="Enter Other Subjects Taught"
        required
      />
    </div>

    {/* Assigned Class */}
    <div className="mb-4">
      <label htmlFor="assigned_class" className="block text-sm font-medium text-gray-700">
        Assigned Class
      </label>
      <input
        type="text"
        name="assigned_class"
        id="assigned_class"
        value={data.assigned_class}
        onChange={(e)=>setData('assigned_class',e.target.value)}
 
        className="w-full p-2 border rounded"
        placeholder="Enter Assigned Class"
        required
      />
    </div>

    {/* Other Responsibilities Assigned */}
    <div className="mb-4">
      <label htmlFor="other_responsibilities_assigned" className="block text-sm font-medium text-gray-700">
        Other Responsibilities Assigned
      </label>
      <input
        type="text"
        name="other_responsibilities_assigned"
        id="other_responsibilities_assigned"
        value={data.other_responsibilities_assigned}
        onChange={(e)=>setData('other_responsibilities_assigned',e.target.value)}
 
        className="w-full p-2 border rounded"
        placeholder="Enter Other Responsibilities Assigned"
        required
      />
    </div>

    {/* 150 Hours Tamil Course Completed */}
    <div className="mb-4">
      <label htmlFor="150_hrs_tamil_course_completed" className="block text-sm font-medium text-gray-700">
        150 Hours Tamil Course Completed
      </label>
      <input
        type="checkbox"
        name="150_hrs_tamil_course_completed"
        id="150_hrs_tamil_course_completed"
        checked={data.is_150_hrs_tamil_course_completed}
        onChange={(e) => setData('is_150_hrs_tamil_course_completed', e.target.checked)} // Set true or false

        //onChange={(e)=>setData('150_hrs_tamil_course_completed',e.target.value)}
 
        className="p-2"
      />
    </div>

    {/* Commuting From School */}
    <div className="mb-4">
      <label htmlFor="commuting_from_school" className="block text-sm font-medium text-gray-700">
        Commuting From School
      </label>
      <select
        name="commuting_from_school"
        id="commuting_from_school"
        value={data.commuting_from_school}
        onChange={(e)=>setData('commuting_from_school',e.target.value as "Home" | "Boarding" | "Hostel" |"Other")}
 
        className="w-full p-2 border rounded"
        required
      >
        <option value="Home">Home</option>
        <option value="Boarding">Boarding</option>
        <option value="Hostel">Hostel</option>
        <option value="Other">Other</option>
      </select>
    </div>

    {/* Distance From School */}
    <div className="mb-4">
      <label htmlFor="distance_from_school" className="block text-sm font-medium text-gray-700">
        Distance From School
      </label>
      <input
        type="number"
        name="distance_from_school"
        id="distance_from_school"
        className="w-full p-2 border rounded"
        //value="which_grades_teaching_done"
        onChange={(e)=>setData('distance_from_school',parseFloat(e.target.value) || 0)}
 
        placeholder="Enter Distance from School"
        required
      />
    </div>

    {/* Commuting Method to School */}
    <div className="mb-4">
      <label htmlFor="commuting_method_to_school" className="block text-sm font-medium text-gray-700">
        Commuting Method to School
      </label>
      <select
        name="commuting_method_to_school"
        id="commuting_method_to_school"
        className="w-full p-2 border rounded"
        value={data.which_grades_teaching_done}
        onChange={(e)=>setData('commuting_method_to_school', e.target.value as "Bicycle" | "MotorBike" | "Car" | "Threewheeler"|"Other" | "Walk")}
 
        required
      >
        <option value="Bicycle">Bicycle</option>
        <option value="MotorBike">MotorBike</option>
        <option value="Car">Car</option>
        <option value="Bus">Bus</option>
        <option value="Threewheeler">Threewheeler</option>
        <option value="Walk">Walk</option>
        <option value="Other">Other</option>
      </select>
    </div>

    {/* Number in Sign Sheet */}
    <div className="mb-4">
      <label htmlFor="number_in_sign_sheet" className="block text-sm font-medium text-gray-700">
        Number in Sign Sheet
      </label>
      <input
        type="text"
        name="number_in_sign_sheet"
        id="number_in_sign_sheet"
        value={data.number_in_sign_sheet}
        onChange={(e)=>setData('number_in_sign_sheet',e.target.value)}
 
        className="w-full p-2 border rounded"
        placeholder="Enter Number in Sign Sheet"
        required
      />
    </div>

    {/* Number in Salary Sheet */}
    <div className="mb-4">
      <label htmlFor="number_in_salary_sheet" className="block text-sm font-medium text-gray-700">
        Number in Salary Sheet
      </label>
      <input
        type="text"
        name="number_in_salary_sheet"
        id="number_in_salary_sheet"
        value={data.number_in_salary_sheet}
        onChange={(e)=>setData('number_in_salary_sheet',e.target.value)}
 
        className="w-full p-2 border rounded"
        placeholder="Enter Number in Salary Sheet"
        required
      />
    </div>

    {/* Navigation Buttons */}
    <div className="flex justify-between">
      <button
        type="button"
        onClick={handlePrevStep}
        className="bg-gray-600 text-white px-4 py-2 rounded-md"
      >
        Back
      </button>
      <button
        type="button"
        onClick={handleNextStep}
        className="bg-blue-600 text-white px-4 py-2 rounded-md"
      >
        Next
      </button>
    </div>
  </div>
)}
                 

                 {step === 4 && (
  <div>
    <h3 className="text-lg font-bold">Step 4: Teacher's Qualification</h3>

    {/* Teacher NIC */}
    

    {/* Type of Service in School */}
    <div className="mb-4">
      <label htmlFor="type_of_service_in_school" className="block text-sm font-medium text-gray-700">
        Type of Service in School
      </label>
      <input
        type="text"
        id="type_of_service_in_school"
        name="type_of_service_in_school"
       value={data.type_of_service_in_school}
        onChange={(e)=>setData('type_of_service_in_school',e.target.value)}
 
        className="w-full p-2 border rounded"
        placeholder="Enter Type of Service"
        required
      />
    </div>

    {/* GCE AL Subject Stream */}
    <div className="mb-4">
      <label htmlFor="gce_al_subject_stream" className="block text-sm font-medium text-gray-700">
        GCE AL Subject Stream
      </label>
      <input
        type="text"
        id="gce_al_subject_stream"
        name="gce_al_subject_stream"
        value={data.gce_al_subject_stream}
        onChange={(e)=>setData('gce_al_subject_stream',e.target.value)}
 
        className="w-full p-2 border rounded"
        placeholder="Enter GCE AL Subject Stream"
        required
      />
    </div>

    {/* Highest Education Qualification */}
    <div className="mb-4">
      <label htmlFor="highest_education_qualification" className="block text-sm font-medium text-gray-700">
        Highest Education Qualification
      </label>
      <input
        type="text"
        id="highest_education_qualification"
        name="highest_education_qualification"
        value={data.highest_education_qualification}
        onChange={(e)=>setData('highest_education_qualification',e.target.value)}
 
        className="w-full p-2 border rounded"
        placeholder="Enter Highest Education Qualification"
        required
      />
    </div>

    {/* Basic Degree Stream */}
    <div className="mb-4">
      <label htmlFor="basic_degree_stream" className="block text-sm font-medium text-gray-700">
        Basic Degree Stream
      </label>
      <input
        type="text"
        id="basic_degree_stream"
        name="basic_degree_stream"
        value={data.basic_degree_stream}
        onChange={(e)=>setData('basic_degree_stream',e.target.value)}
 
        className="w-full p-2 border rounded"
        placeholder="Enter Basic Degree Stream"
        required
      />
    </div>

    {/* Highest Professional Qualification */}
    <div className="mb-4">
      <label htmlFor="highest_professional_qualification" className="block text-sm font-medium text-gray-700">
        Highest Professional Qualification
      </label>
      <input
        type="text"
        id="highest_professional_qualification"
        name="highest_professional_qualification"
        value={data.highest_professional_qualification}
        onChange={(e)=>setData('highest_professional_qualification',e.target.value)}
 
        className="w-full p-2 border rounded"
        placeholder="Enter Highest Professional Qualification"
        required
      />
    </div>

    {/* Present Class */}
    <div className="mb-4">
      <label htmlFor="present_class" className="block text-sm font-medium text-gray-700">
        Present Class
      </label>
      <select 
      id="present_class" 
      name="present_class"
      className="w-full p-2 border rounded" 
      value={data.present_class}
      onChange={(e)=>setData('present_class',e.target.value as "class I" | "class II")}
      required>
        <option value="class I">Class I</option>
        <option value="class II">Class II</option>
      </select>
      <InputError message={errors.present_class} className="mt-2" />

    </div>

    {/* Present Grade */}
    <div className="mb-4">
      <label htmlFor="present_grade" className="block text-sm font-medium text-gray-700">
        Present Grade
      </label>
      <select 
      id="present_grade" 
      name="present_grade" 
      className="w-full p-2 border rounded"
      value={data.present_grade}
      onChange={(e)=>setData('present_grade',e.target.value as "Grade I" | "Grade II" | "Grade III")}
      required>
        <option value="Grade I">Grade I</option>
        <option value="Grade II">Grade II</option>
        <option value="Grade III">Grade III</option>
      </select>
      <InputError message={errors.present_grade} className="mt-2" />

    </div>

    {/* Appointment Date for Current Class */}
    <div className="mb-4">
      <label htmlFor="appointment_date_for_current_class" className="block text-sm font-medium text-gray-700">
        Appointment Date for Current Class
      </label>
      <input
        type="date"
        id="appointment_date_for_current_class"
        name="appointment_date_for_current_class"
        value={data.appointment_date_for_current_class}
        onChange={(e)=>setData('appointment_date_for_current_class',e.target.value)}
        max={new Date().toISOString().split('T')[0]} // This sets today's date as the max
        className="w-full p-2 border rounded"
        required
      />
    </div>

    {/* Appointment Date for Current Grade */}
    <div className="mb-4">
      <label htmlFor="appointment_date_for_current_grade" className="block text-sm font-medium text-gray-700">
        Appointment Date for Current Grade
      </label>
      <input
        type="date"
        id="appointment_date_for_current_grade"
        name="appointment_date_for_current_grade"
        value={data.appointment_date_for_current_grade}
        onChange={(e)=>setData('appointment_date_for_current_grade',e.target.value)}
        max={new Date().toISOString().split('T')[0]} // This sets today's date as the max
        className="w-full p-2 border rounded"
        required
      />
    </div>

    {/* Current Appointment Service Medium */}
    <div className="mb-4">
      <label htmlFor="current_appointment_service_medium" className="block text-sm font-medium text-gray-700">
        Current Appointment Service Medium
      </label>
      <select 
      id="current_appointment_service_medium" 
      name="current_appointment_service_medium" 
      className="w-full p-2 border rounded"
      value={data.current_appointment_service_medium}
      onChange={(e)=>setData('current_appointment_service_medium',e.target.value as "Tamil" | "English" | "Sinhala")}
      required>
        <option value="Tamil">Tamil</option>
        <option value="English">English</option>
        <option value="Sinhala">Sinhala</option>
      </select>
      <InputError message={errors.current_appointment_service_medium} className="mt-2" />
    </div>

    {/* Appointed Subject Section */}
    <div className="mb-4">
      <label htmlFor="appointed_subject_section" className="block text-sm font-medium text-gray-700">
        Appointed Subject Section
      </label>
      <input
        type="text"
        id="appointed_subject_section"
        name="appointed_subject_section"
        value={data.appointed_subject_section}
        onChange={(e)=>setData('appointed_subject_section',e.target.value)}
 
        className="w-full p-2 border rounded"
        placeholder="Enter Appointed Subject Section"
        required
      />
    </div>

    {/* Subject Appointed */}
    <div className="mb-4">
      <label htmlFor="subject_appointed" className="block text-sm font-medium text-gray-700">
        Subject Appointed
      </label>
      <input
        type="text"
        id="subject_appointed"
        name="subject_appointed"
        value={data.subject_appointed}
        onChange={(e)=>setData('subject_appointed',e.target.value)}
 
        className="w-full p-2 border rounded"
        placeholder="Enter Subject Appointed"
        required
      />
    </div>

    {/* Current Service Appointed Date */}
    <div className="mb-4">
      <label htmlFor="currentservice_appointed_date" className="block text-sm font-medium text-gray-700">
        Current Service Appointed Date
      </label>
      <input
        type="date"
        id="currentservice_appointed_date"
        name="currentservice_appointed_date"
        value={data.currentservice_appointed_date}
        onChange={(e)=>setData('currentservice_appointed_date',e.target.value)}
        max={new Date().toISOString().split('T')[0]} // This sets today's date as the max
        className="w-full p-2 border rounded"
        required
      />
    </div>

    {/* Subjects Taught Most and Second Most */}
    <div className="mb-4">
      <label htmlFor="subjects_taught_most_and_second_most" className="block text-sm font-medium text-gray-700">
        Subjects Taught Most and Second Most
      </label>
      <input
        type="text"
        id="subjects_taught_most_and_second_most"
        name="subjects_taught_most_and_second_most"
        value={data.subjects_taught_most_and_second_most}
        onChange={(e)=>setData('subjects_taught_most_and_second_most',e.target.value)}
 
        className="w-full p-2 border rounded"
        placeholder="Enter Subjects Taught Most and Second Most"
        required
      />
    </div>

    {/* Position in the School */}
    <div className="mb-4">
      <label htmlFor="position_in_the_school" className="block text-sm font-medium text-gray-700">
        Position in the School
      </label>
      <input
        type="text"
        id="position_in_the_school"
        name="position_in_the_school"
        value={data.position_in_the_school}
        onChange={(e)=>setData('position_in_the_school',e.target.value)}
 
        className="w-full p-2 border rounded"
        placeholder="Enter Position in the School"
        required
      />
    </div>

    {/* Assign Date for the School */}
    <div className="mb-4">
      <label htmlFor="assign_date_for_the_school" className="block text-sm font-medium text-gray-700">
        Assign Date for the School
      </label>
      <input
        type="date"
        id="assign_date_for_the_school"
        name="assign_date_for_the_school"
        className="w-full p-2 border rounded"
        value={data.assign_date_for_the_school}
        onChange={(e)=>setData('assign_date_for_the_school',e.target.value)}
        max={new Date().toISOString().split('T')[0]} // This sets today's date as the max
        required
      />
    </div>

    {/* Navigation Buttons */}
    <div className="flex justify-between">
      <button
        type="button"
        onClick={handlePrevStep}
        className="bg-gray-600 text-white px-4 py-2 rounded-md"
      >
        Back
      </button>
      <button
        type="button"
        onClick={handleNextStep}
        className="bg-blue-600 text-white px-4 py-2 rounded-md"
      >
        Next
      </button>
    </div>
  </div>
)}
{step === 5 && (
  <div>
    <h3 className="text-lg font-bold">Step 5: Additional Responsibilities and Memberships</h3>

    {/* Other Responsibilities in School */}
    <div className="mb-4">
      <label htmlFor="other_responsibilities_in_school" className="block text-sm font-medium text-gray-700">
        Other Responsibilities in School
      </label>
      <input
        type="text"
        id="other_responsibilities_in_school"
        name="other_responsibilities_in_school"
        value={data.other_responsibilities_in_school}
        onChange={(e)=>setData('other_responsibilities_in_school',e.target.value)}
 
        className="w-full p-2 border rounded"
        placeholder="Enter Other Responsibilities"
      />
    </div>

    {/* EDCS Membership */}
    <div className="mb-4">
      <label htmlFor="EDCS_membership" className="block text-sm font-medium text-gray-700">
        EDCS Membership
      </label>
      <select id="EDCS_membership" name="EDCS_membership" value={data.EDCS_membership}
        onChange={(e)=>setData('EDCS_membership',e.target.value as "Yes" | "No")}
  className="w-full p-2 border rounded">
        <option value="Yes">Yes</option>
        <option value="No">No</option>
      </select>
    </div>

    {/* WSOP Number */}
    <div className="mb-4">
      <label htmlFor="WSOP_Number" className="block text-sm font-medium text-gray-700">
        WSOP Number
      </label>
      <input
        type="number"
        id="WSOP_Number"
        name="WSOP_Number"
        value={data.WSOP_Number ?? 0}
        onChange={(e)=>setData('WSOP_Number',parseFloat(e.target.value) || 0)}
 
        className="w-full p-2 border rounded"
        placeholder="Enter WSOP Number"
      />
    </div>

    {/* Agrahara Insurance Membership */}
    <div className="mb-4">
      <label htmlFor="Agrahara_insuarence_membership" className="block text-sm font-medium text-gray-700">
        Agrahara Insurance Membership
      </label>
      <select id="Agrahara_insuarence_membership" name="Agrahara_insuarence_membership" value={data.Agrahara_insuarence_membership}
        onChange={(e)=>setData('Agrahara_insuarence_membership',e.target.value as "Yes" | "No")}
 className="w-full p-2 border rounded">
        <option value="Yes">Yes</option>
        <option value="No">No</option>
      </select>
    </div>

    {/* Navigation Buttons */}
    <div className="flex justify-between">
      <button
        type="button"
        onClick={handlePrevStep}
        className="bg-gray-600 text-white px-4 py-2 rounded-md"
      >
        Back
      </button>
      <button
        type="submit"
        className="bg-green-600 text-white px-4 py-2 rounded-md"
      >
        Submit
      </button>
    </div>
  </div>
)}
</form>
</div>
    )
  }
 