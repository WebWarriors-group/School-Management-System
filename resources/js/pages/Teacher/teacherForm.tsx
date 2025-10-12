import { useState } from "react";
import { useForm, router } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import InputError from '@/components/input-error';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
  permanent_residential_address: string;
  grama_niladari_division: string;
  grama_niladari_division_number: string;
  election_division: string;
  election_division_number: string;
  appointed_date: string;
  work_acceptance_date: string;
  appointment_type: string;
  salary_increment_date: string;
  current_grade_of_teaching_service: "Grade I" | "Grade II" | "Grade III";
  work_acceptance_date_school: string;
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
  type_of_service_in_school: string;
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

interface Props {
  setShowTeacherForm: (val: boolean) => void;
}

export default function AddTeacherForm({ setShowTeacherForm }: Props) {
  const { data, setData, post, errors } = useForm<TeacherForm>({
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
    permanent_residential_address: '',
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
    type_of_service_in_school: '',
    gce_al_subject_stream: '',
    highest_education_qualification: '',
    basic_degree_stream: '',
    highest_professional_qualification: '',
    present_class: "class I",
    present_grade: "Grade 1",
    appointment_date_for_current_class: '',
    appointment_date_for_current_grade: '',
    current_appointment_service_medium: "Tamil",
    appointed_subject_section: '',
    subject_appointed: '',
    currentservice_appointed_date: '',
    subjects_taught_most_and_second_most: '',
    position_in_the_school: '',
    assign_date_for_the_school: '',
    other_responsibilities_in_school: '',
    EDCS_membership: "Yes",
    WSOP_Number: null,
    Agrahara_insuarence_membership: "Yes",
  });

  const [step, setStep] = useState(1);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
const [processing,setProcessing]=useState(false);
  const handleNextStep = () => {if (step< 5) {
      setStep(step + 1);}
    };
  const handlePrevStep = () => 
    {if (step>1) {
    setStep(step - 1);}}

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setData('Photo', file);
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setPhotoPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removePhoto = () => {
    setData('Photo', null);
    setPhotoPreview(null);
  };

  const submit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    setData('current_grade_of_teaching_service', data.current_grade_of_teaching_service || 'Grade I');
    setData('present_class', data.present_class || 'class I');
    setData('present_grade', data.present_grade || 'Grade 1');
    setData('current_appointment_service_medium', data.current_appointment_service_medium || 'Tamil');
    setData('is_150_hrs_tamil_course_completed', data.is_150_hrs_tamil_course_completed !== undefined ? data.is_150_hrs_tamil_course_completed : false);
    setData('commuting_from_school', data.commuting_from_school || 'Home');
    setData('distance_from_school', Number(data.distance_from_school) || 0);
    setData('commuting_method_to_school', data.commuting_method_to_school || 'Bicycle');
    setData('WSOP_Number', data.WSOP_Number || null);

    post(route('teacher.requests'), {
      forceFormData: true,
      onSuccess: () => {
        toast.success('Form submitted. Awaiting admin approval!');
        setProcessing(true);
      },
      onError: (errors) => {
        toast.error('Failed to submit. Please check the form.');
      },
    });
  };

  return (
    <>
      <form
        onSubmit={submit}
        className="bg-white rounded-xl shadow-2xl w-full max-w-5xl max-h-[90vh] flex flex-col overflow-hidden border-t-4 border-blue-600"
      >
        {/* Header Section */}
        <div className="bg-[#152238] text-white p-6 sticky top-0 z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="mr-4 bg-white p-2 rounded-full">
                <img src="/images/School.jpg" alt="School Logo" className="w-10 h-10" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">T / Tn/ Mahadivulwewa Maha Vidyalaya (National School)</h1>
                <p className="text-blue-100">Teacher Admission Form</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setShowTeacherForm(false)}
              className="text-white hover:text-blue-200 text-2xl"
              aria-label="Close form"
            >
              &times;
            </button>
          </div>

          {/* Progress Bar */}
          <div className="mt-6" role="progressbar" aria-valuenow={step} aria-valuemin={1} aria-valuemax={5} aria-label="Form progress">
            <div className="flex justify-between mb-2 text-sm font-medium text-blue-100">
              {[1, 2, 3, 4, 5].map((page) => (
                <span
                  key={page}
                  className={`${step >= page ? 'text-white' : 'text-blue-200'}`}
                >
                  {page === 1 && 'Basic Info'}
                  {page === 2 && 'Address'}
                  {page === 3 && 'Work'}
                  {page === 4 && 'Qualification'}
                  {page === 5 && 'Additional'}
                </span>
              ))}
            </div>
            <div className="w-full bg-white bg-opacity-50 rounded-full h-2">
              <div
                className="bg-blue-400 h-2 rounded-full transition-all duration-500"
                style={{ width: `${(step / 5) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Form Content */}
        <div className="p-6 overflow-y-auto flex-grow bg-gray-50">
          {step === 1 && (
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-800">Basic Information</h2>
                <p className="text-gray-600 mt-2">Please provide teacher's personal details</p>
              </div>

              {/* Personal Details Card */}
              <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
                <div className="flex items-center mb-4">
                  <div className="bg-blue-100 p-2 rounded-lg mr-3">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800">Personal Details</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Teacher NIC <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={data.teacher_NIC}
                      onChange={(e) => setData('teacher_NIC', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      placeholder="Enter Teacher NIC"
                      required
                    />
                    <InputError message={errors.teacher_NIC} className="mt-2" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={data.Full_name}
                      onChange={(e) => setData('Full_name', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      placeholder="Enter Full Name"
                      required
                    />
                    <InputError message={errors.Full_name} className="mt-2" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Name with Initials <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={data.Full_name_with_initial}
                      onChange={(e) => setData('Full_name_with_initial', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      placeholder="Enter Name with Initials"
                      required
                    />
                    <InputError message={errors.Full_name_with_initial} className="mt-2" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Gender <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={data.Gender}
                      onChange={(e) => setData('Gender', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      required
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                    <InputError message={errors.Gender} className="mt-2" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Religion <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={data.Region}
                      onChange={(e) => setData('Region', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      placeholder="Enter Religion"
                      required
                    />
                    <InputError message={errors.Region} className="mt-2" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Ethnicity <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={data.Ethnicity}
                      onChange={(e) => setData('Ethnicity', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      placeholder="Enter Ethnicity"
                      required
                    />
                    <InputError message={errors.Ethnicity} className="mt-2" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Birthdate <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      value={data.Birthdate}
                      onChange={(e) => setData('Birthdate', e.target.value)}
                      max={new Date().toISOString().split('T')[0]}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      required
                    />
                    <InputError message={errors.Birthdate} className="mt-2" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Title <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={data.Title}
                      onChange={(e) => setData('Title', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      placeholder="Enter Title"
                      required
                    />
                    <InputError message={errors.Title} className="mt-2" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Marital Status <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={data.Marital_status}
                      onChange={(e) => setData('Marital_status', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      required
                    >
                      <option value="Single">Single</option>
                      <option value="Married">Married</option>
                      <option value="Divorced">Divorced</option>
                      <option value="Widowed">Widowed</option>
                    </select>
                    <InputError message={errors.Marital_status} className="mt-2" />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Family Details
                    </label>
                    <textarea
                      value={data.Details_about_family_members}
                      onChange={(e) => setData('Details_about_family_members', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      placeholder="Enter details about family members"
                      rows={3}
                    />
                    <InputError message={errors.Details_about_family_members} className="mt-2" />
                  </div>
                </div>
              </div>

              {/* Photo Upload Card */}
              <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
                <div className="flex items-center mb-4">
                  <div className="bg-blue-100 p-2 rounded-lg mr-3">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800">Photo Upload</h3>
                </div>
                
                <div className="flex flex-col md:flex-row items-start gap-6">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Upload Photo
                    </label>
                    <div className="flex items-center gap-4">
                      <label className="flex flex-col items-center justify-center w-40 h-40 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <p className="text-xs text-gray-500 mt-2">Click to upload</p>
                        </div>
                        <input 
                          type="file" 
                          accept="image/*" 
                          onChange={handleFileChange}
                          className="hidden" 
                        />
                      </label>
                      {photoPreview && (
                        <div className="relative">
                          <img
                            src={photoPreview}
                            alt="Preview"
                            className="h-40 w-40 object-cover rounded-lg border-2 border-blue-200"
                          />
                          <button
                            type="button"
                            onClick={removePhoto}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="text-sm text-gray-500">
                    <p className="font-medium">Photo Requirements:</p>
                    <ul className="list-disc pl-5 mt-1 space-y-1">
                      <li>Recent passport-style photo</li>
                      <li>Clear face visible</li>
                      <li>Max file size: 2MB</li>
                      <li>Formats: JPG, PNG</li>
                    </ul>
                  </div>
                </div>
                <InputError message={errors.Photo} className="mt-2" />
              </div>

              {/* Contact Information Card */}
              <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
                <div className="flex items-center mb-4">
                  <div className="bg-blue-100 p-2 rounded-lg mr-3">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800">Contact Information</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      value={data.Email_address}
                      onChange={(e) => setData('Email_address', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      placeholder="example@gmail.com"
                      required
                    />
                    <InputError message={errors.Email_address} className="mt-2" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Mobile Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      value={data.Mobile_number}
                      onChange={(e) => setData('Mobile_number', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      placeholder="Enter Mobile Number"
                      required
                    />
                    <InputError message={errors.Mobile_number} className="mt-2" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      WhatsApp Number
                    </label>
                    <input
                      type="tel"
                      value={data.Whatsapp_number}
                      onChange={(e) => setData('Whatsapp_number', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      placeholder="Enter WhatsApp Number"
                    />
                    <InputError message={errors.Whatsapp_number} className="mt-2" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Fixed Telephone
                    </label>
                    <input
                      type="tel"
                      value={data.Fixed_telephone_number}
                      onChange={(e) => setData('Fixed_telephone_number', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      placeholder="Enter Fixed Telephone"
                    />
                    <InputError message={errors.Fixed_telephone_number} className="mt-2" />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Emergency Contact <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      value={data.Emergency_telephone_number}
                      onChange={(e) => setData('Emergency_telephone_number', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      placeholder="Enter Emergency Contact"
                      required
                    />
                    <InputError message={errors.Emergency_telephone_number} className="mt-2" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-800">Address Information</h2>
                <p className="text-gray-600 mt-2">Please provide teacher's address details</p>
              </div>

              {/* Address Card */}
              <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
                <div className="flex items-center mb-4">
                  <div className="bg-blue-100 p-2 rounded-lg mr-3">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800">Address Details</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Permanent Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={data.permanent_address}
                      onChange={(e) => setData('permanent_address', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      placeholder="Enter Permanent Address"
                      required
                    />
                    <InputError message={errors.permanent_address} className="mt-2" />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Residential Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={data.permanent_residential_address}
                      onChange={(e) => setData('permanent_residential_address', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      placeholder="Enter Residential Address"
                      required
                    />
                    <InputError message={errors.permanent_residential_address} className="mt-2" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Grama Niladari Division <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={data.grama_niladari_division}
                      onChange={(e) => setData('grama_niladari_division', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      placeholder="Enter Division"
                      required
                    />
                    <InputError message={errors.grama_niladari_division} className="mt-2" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Grama Niladari Division Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={data.grama_niladari_division_number}
                      onChange={(e) => setData('grama_niladari_division_number', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      placeholder="Enter Division Number"
                      required
                    />
                    <InputError message={errors.grama_niladari_division_number} className="mt-2" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Election Division <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={data.election_division}
                      onChange={(e) => setData('election_division', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      placeholder="Enter Election Division"
                      required
                    />
                    <InputError message={errors.election_division} className="mt-2" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Election Division Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={data.election_division_number}
                      onChange={(e) => setData('election_division_number', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      placeholder="Enter Election Division Number"
                      required
                    />
                    <InputError message={errors.election_division_number} className="mt-2" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-800">Work Information</h2>
                <p className="text-gray-600 mt-2">Please provide teacher's work details</p>
              </div>

              {/* Appointment Details Card */}
              <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
                <div className="flex items-center mb-4">
                  <div className="bg-blue-100 p-2 rounded-lg mr-3">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800">Appointment Details</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Appointed Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      value={data.appointed_date}
                      onChange={(e) => setData('appointed_date', e.target.value)}
                      max={new Date().toISOString().split('T')[0]}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      required
                    />
                    <InputError message={errors.appointed_date} className="mt-2" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Work Acceptance Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      value={data.work_acceptance_date}
                      onChange={(e) => setData('work_acceptance_date', e.target.value)}
                      max={new Date().toISOString().split('T')[0]}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      required
                    />
                    <InputError message={errors.work_acceptance_date} className="mt-2" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Appointment Type <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={data.appointment_type}
                      onChange={(e) => setData('appointment_type', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      placeholder="Enter Appointment Type"
                      required
                    />
                    <InputError message={errors.appointment_type} className="mt-2" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Salary Increment Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      value={data.salary_increment_date}
                      onChange={(e) => setData('salary_increment_date', e.target.value)}
                      max={new Date().toISOString().split('T')[0]}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      required
                    />
                    <InputError message={errors.salary_increment_date} className="mt-2" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Current Grade <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={data.current_grade_of_teaching_service}
                      onChange={(e) => setData('current_grade_of_teaching_service', e.target.value as "Grade I" | "Grade II" | "Grade III")}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      required
                    >
                      <option value="Grade I">Grade I</option>
                      <option value="Grade II">Grade II</option>
                      <option value="Grade III">Grade III</option>
                    </select>
                    <InputError message={errors.current_grade_of_teaching_service} className="mt-2" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      School Acceptance Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      value={data.work_acceptance_date_school}
                      onChange={(e) => setData('work_acceptance_date_school', e.target.value)}
                      max={new Date().toISOString().split('T')[0]}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      required
                    />
                    <InputError message={errors.work_acceptance_date_school} className="mt-2" />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Temporary Attached School/Institute <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={data.temporary_attachedschool_or_institute_name}
                      onChange={(e) => setData('temporary_attachedschool_or_institute_name', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      placeholder="Enter School or Institute Name"
                      required
                    />
                    <InputError message={errors.temporary_attachedschool_or_institute_name} className="mt-2" />
                  </div>
                </div>
              </div>

              {/* Teaching Details Card */}
              <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
                <div className="flex items-center mb-4">
                  <div className="bg-blue-100 p-2 rounded-lg mr-3">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800">Teaching Details</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Appointed Subject <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={data.appointed_subject}
                      onChange={(e) => setData('appointed_subject', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      placeholder="Enter Appointed Subject"
                      required
                    />
                    <InputError message={errors.appointed_subject} className="mt-2" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Grades Teaching Done <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={data.which_grades_teaching_done}
                      onChange={(e) => setData('which_grades_teaching_done', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      placeholder="Enter Grades Teaching Done"
                      required
                    />
                    <InputError message={errors.which_grades_teaching_done} className="mt-2" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Current Teaching Subject <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={data.current_teaching_subject}
                      onChange={(e) => setData('current_teaching_subject', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      placeholder="Enter Current Teaching Subject"
                      required
                    />
                    <InputError message={errors.current_teaching_subject} className="mt-2" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Other Subjects Taught <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={data.other_subjects_taught}
                      onChange={(e) => setData('other_subjects_taught', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      placeholder="Enter Other Subjects Taught"
                      required
                    />
                    <InputError message={errors.other_subjects_taught} className="mt-2" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Assigned Class <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={data.assigned_class}
                      onChange={(e) => setData('assigned_class', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      placeholder="Enter Assigned Class"
                      required
                    />
                    <InputError message={errors.assigned_class} className="mt-2" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Other Responsibilities <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={data.other_responsibilities_assigned}
                      onChange={(e) => setData('other_responsibilities_assigned', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      placeholder="Enter Other Responsibilities"
                      required
                    />
                    <InputError message={errors.other_responsibilities_assigned} className="mt-2" />
                  </div>

                  <div className="md:col-span-2">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={data.is_150_hrs_tamil_course_completed}
                        onChange={(e) => setData('is_150_hrs_tamil_course_completed', e.target.checked)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label className="ml-2 block text-sm text-gray-700">
                        150 Hours Tamil Course Completed
                      </label>
                    </div>
                    <InputError message={errors.is_150_hrs_tamil_course_completed} className="mt-2" />
                  </div>
                </div>
              </div>

              {/* Transportation Card */}
              <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
                <div className="flex items-center mb-4">
                  <div className="bg-blue-100 p-2 rounded-lg mr-3">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800">Transportation Details</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Commuting From <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={data.commuting_from_school}
                      onChange={(e) => setData('commuting_from_school', e.target.value as "Home" | "Boarding" | "Hostel" | "Other")}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      required
                    >
                      <option value="Home">Home</option>
                      <option value="Boarding">Boarding</option>
                      <option value="Hostel">Hostel</option>
                      <option value="Other">Other</option>
                    </select>
                    <InputError message={errors.commuting_from_school} className="mt-2" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Distance (km) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      value={data.distance_from_school}
                      onChange={(e) => setData('distance_from_school', parseFloat(e.target.value) || 0)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      placeholder="Enter Distance"
                      required
                    />
                    <InputError message={errors.distance_from_school} className="mt-2" />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Commuting Method <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={data.commuting_method_to_school}
                      onChange={(e) => setData('commuting_method_to_school', e.target.value as "Bicycle" | "MotorBike" | "Car" | "Bus" | "Threewheeler" | "Walk" | "Other")}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
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
                    <InputError message={errors.commuting_method_to_school} className="mt-2" />
                  </div>
                </div>
              </div>

              {/* Administrative Details Card */}
              <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
                <div className="flex items-center mb-4">
                  <div className="bg-blue-100 p-2 rounded-lg mr-3">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800">Administrative Details</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Sign Sheet Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={data.number_in_sign_sheet}
                      onChange={(e) => setData('number_in_sign_sheet', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      placeholder="Enter Sign Sheet Number"
                      required
                    />
                    <InputError message={errors.number_in_sign_sheet} className="mt-2" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Salary Sheet Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={data.number_in_salary_sheet}
                      onChange={(e) => setData('number_in_salary_sheet', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      placeholder="Enter Salary Sheet Number"
                      required
                    />
                    <InputError message={errors.number_in_salary_sheet} className="mt-2" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-800">Qualifications</h2>
                <p className="text-gray-600 mt-2">Please provide teacher's educational qualifications</p>
              </div>

              {/* Education Details Card */}
              <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
                <div className="flex items-center mb-4">
                  <div className="bg-blue-100 p-2 rounded-lg mr-3">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14v6l9-5-9-5-9 5 9 5z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800">Education Details</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Type of Service <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={data.type_of_service_in_school}
                      onChange={(e) => setData('type_of_service_in_school', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      placeholder="Enter Type of Service"
                      required
                    />
                    <InputError message={errors.type_of_service_in_school} className="mt-2" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      GCE AL Subject Stream <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={data.gce_al_subject_stream}
                      onChange={(e) => setData('gce_al_subject_stream', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      placeholder="Enter GCE AL Subject Stream"
                      required
                    />
                    <InputError message={errors.gce_al_subject_stream} className="mt-2" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Highest Education <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={data.highest_education_qualification}
                      onChange={(e) => setData('highest_education_qualification', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      placeholder="Enter Highest Education"
                      required
                    />
                    <InputError message={errors.highest_education_qualification} className="mt-2" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Basic Degree Stream <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={data.basic_degree_stream}
                      onChange={(e) => setData('basic_degree_stream', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      placeholder="Enter Basic Degree Stream"
                      required
                    />
                    <InputError message={errors.basic_degree_stream} className="mt-2" />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Highest Professional Qualification <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={data.highest_professional_qualification}
                      onChange={(e) => setData('highest_professional_qualification', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      placeholder="Enter Highest Professional Qualification"
                      required
                    />
                    <InputError message={errors.highest_professional_qualification} className="mt-2" />
                  </div>
                </div>
              </div>

              {/* Current Position Card */}
              <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
                <div className="flex items-center mb-4">
                  <div className="bg-blue-100 p-2 rounded-lg mr-3">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800">Current Position</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Present Class <span className="text-red-500">*</span>
                    </label>
                    <select 
                      value={data.present_class}
                      onChange={(e) => setData('present_class', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      required
                    >
                      <option value="class I">Class I</option>
                      <option value="class II">Class II</option>
                    </select>
                    <InputError message={errors.present_class} className="mt-2" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Present Grade <span className="text-red-500">*</span>
                    </label>
                    <select 
                      value={data.present_grade}
                      onChange={(e) => setData('present_grade', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      required
                    >
                      <option value="Grade 1">Grade 1</option>
                      <option value="Grade 2">Grade 2</option>
                      <option value="Grade 3">Grade 3</option>
                    </select>
                    <InputError message={errors.present_grade} className="mt-2" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Class Appointment Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      value={data.appointment_date_for_current_class}
                      onChange={(e) => setData('appointment_date_for_current_class', e.target.value)}
                      max={new Date().toISOString().split('T')[0]}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      required
                    />
                    <InputError message={errors.appointment_date_for_current_class} className="mt-2" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Grade Appointment Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      value={data.appointment_date_for_current_grade}
                      onChange={(e) => setData('appointment_date_for_current_grade', e.target.value)}
                      max={new Date().toISOString().split('T')[0]}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      required
                    />
                    <InputError message={errors.appointment_date_for_current_grade} className="mt-2" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Service Medium <span className="text-red-500">*</span>
                    </label>
                    <select 
                      value={data.current_appointment_service_medium}
                      onChange={(e) => setData('current_appointment_service_medium', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      required
                    >
                      <option value="Tamil">Tamil</option>
                      <option value="English">English</option>
                      <option value="Sinhala">Sinhala</option>
                    </select>
                    <InputError message={errors.current_appointment_service_medium} className="mt-2" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Subject Section <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={data.appointed_subject_section}
                      onChange={(e) => setData('appointed_subject_section', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      placeholder="Enter Subject Section"
                      required
                    />
                    <InputError message={errors.appointed_subject_section} className="mt-2" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Subject Appointed <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={data.subject_appointed}
                      onChange={(e) => setData('subject_appointed', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      placeholder="Enter Subject Appointed"
                      required
                    />
                    <InputError message={errors.subject_appointed} className="mt-2" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Service Appointment Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      value={data.currentservice_appointed_date}
                      onChange={(e) => setData('currentservice_appointed_date', e.target.value)}
                      max={new Date().toISOString().split('T')[0]}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      required
                    />
                    <InputError message={errors.currentservice_appointed_date} className="mt-2" />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Subjects Taught (Most & Second Most) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={data.subjects_taught_most_and_second_most}
                      onChange={(e) => setData('subjects_taught_most_and_second_most', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      placeholder="Enter Subjects Taught"
                      required
                    />
                    <InputError message={errors.subjects_taught_most_and_second_most} className="mt-2" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Position in School <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={data.position_in_the_school}
                      onChange={(e) => setData('position_in_the_school', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      placeholder="Enter Position"
                      required
                    />
                    <InputError message={errors.position_in_the_school} className="mt-2" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      School Assign Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      value={data.assign_date_for_the_school}
                      onChange={(e) => setData('assign_date_for_the_school', e.target.value)}
                      max={new Date().toISOString().split('T')[0]}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      required
                    />
                    <InputError message={errors.assign_date_for_the_school} className="mt-2" />
                  </div>
                </div>
                
              </div>
            </div>
          )}

          {step === 5 && (
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-800">Additional Information</h2>
                <p className="text-gray-600 mt-2">Please provide additional responsibilities and memberships</p>
              </div>

              {/* Additional Information Card */}
              <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
                <div className="flex items-center mb-4">
                  <div className="bg-blue-100 p-2 rounded-lg mr-3">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800">Additional Details</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Other School Responsibilities
                    </label>
                    <input
                      type="text"
                      value={data.other_responsibilities_in_school}
                      onChange={(e) => setData('other_responsibilities_in_school', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      placeholder="Enter Other Responsibilities"
                    />
                    <InputError message={errors.other_responsibilities_in_school} className="mt-2" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      EDCS Membership
                    </label>
                    <select 
                      value={data.EDCS_membership}
                      onChange={(e) => setData('EDCS_membership', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    >
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                    <InputError message={errors.EDCS_membership} className="mt-2" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      WSOP Number
                    </label>
                    <input
                      type="number"
                      value={data.WSOP_Number || ''}
                      onChange={(e) => setData('WSOP_Number', e.target.value ? parseFloat(e.target.value) : null)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      placeholder="Enter WSOP Number"
                    />
                    <InputError message={errors.WSOP_Number} className="mt-2" />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Agrahara Insurance Membership
                    </label>
                    <select 
                      value={data.Agrahara_insuarence_membership}
                      onChange={(e) => setData('Agrahara_insuarence_membership', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    >
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                    <InputError message={errors.Agrahara_insuarence_membership} className="mt-2" />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Navigation */}
        <div className="border-t border-gray-200 p-4 sticky bottom-0 bg-white">
          <div className="flex justify-between">
            {step > 1 ? (
              <button
              type="button"
              onClick={handlePrevStep}
              className="cursor-pointer flex items-center px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-300 transition"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
              Previous
            </button>
          ) : (
            <div></div>
            )}

            {step < 5 ? (
              <button
              type="button"
              onClick={handleNextStep}
              className="cursor-pointer flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Next
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          ) : (
            <button
              type="submit"
              disabled={processing}
              className="cursor-pointer flex items-center px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition disabled:opacity-50"
            >
              {processing ? (
                <>
                <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className='opacity-25' cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"> </circle> 
               <path className ="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V4a4 4 0 00-4 4H4z"></path>
               </svg>Submitting....
               </>
              ):(
                <>
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              Submit Application
              </>
              )}
            </button>
            )}
          </div>
        </div>
      </form>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </>
  );
}