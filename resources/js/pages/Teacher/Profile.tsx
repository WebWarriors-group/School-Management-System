import React from 'react';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { router } from '@inertiajs/react';

type Props = {
  teacher: any;
};

export default function Profile({ teacher }: Props) {
  return (
    <AppLayout>
  <Head title="My Profile" />

  <div className="p-4">
    <button
      onClick={() => router.visit('/teacher/dashboard')}
      className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
    >
      ← Dashboard
    </button>
  </div>

  <div className="max-w-7xl mx-auto py-8 px-4">
  <h1 className="text-3xl font-bold mb-8 text-blue-700">👤 My Profile</h1>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    {/* Personal Info */}
    <div className="bg-gray-100 p-6 rounded-lg shadow text-gray-800 space-y-2 text-lg">
      <p><strong className="text-blue-700">NIC:</strong> {teacher.teacher_NIC}</p>
      <p><strong className="text-blue-700">Full Name:</strong> {teacher.personal?.Full_name || 'Not provided'}</p>
      <p><strong className="text-blue-700">Full Name with Initial:</strong> {teacher.personal?.Full_name_with_initial || 'Not provided'}</p>
      <p><strong className="text-blue-700">Gender:</strong> {teacher.personal?.Gender || 'Not provided'}</p>
      <p><strong className="text-blue-700">Birthdate:</strong> {teacher.personal?.Birthdate || 'Not provided'}</p>
      <p><strong className="text-blue-700">Marital Status:</strong> {teacher.personal?.Marital_status || 'Not provided'}</p>
      <p><strong className="text-blue-700">Mobile Number:</strong> {teacher.personal?.Mobile_number || 'Not provided'}</p>
      <p><strong className="text-blue-700">Email:</strong> {teacher.personal?.Email_address || 'Not provided'}</p>
      <p><strong className="text-blue-700">Region:</strong> {teacher.personal?.Region || 'Not provided'}</p>
      <p><strong className="text-blue-700">Ethnicity:</strong> {teacher.personal?.Ethnicity || 'Not provided'}</p>
      <p><strong className="text-blue-700">Title:</strong> {teacher.personal?.Title || 'Not provided'}</p>
      <p><strong className="text-blue-700">Emergency Contact No:</strong> {teacher.personal?.Emergency_telephone_number || 'Not provided'}</p>
      <p><strong className="text-blue-700">Fixed Phone No:</strong> {teacher.personal?.Fixed_telephone_number || 'Not provided'}</p>
      <p><strong className="text-blue-700">WhatsApp No:</strong> {teacher.personal?.Whatsapp_number || 'Not provided'}</p>
      <p><strong className="text-blue-700">Family Details:</strong> {teacher.personal?.Details_about_family_members || 'Not provided'}</p>
    </div>

    {/* Address Info */}
    <div className="bg-gray-100 p-6 rounded-lg shadow text-gray-800 space-y-2 text-lg">
      <p><strong className="text-green-700">Permanent Address:</strong> {teacher.teachersaddress?.permanent_address || 'Not provided'}</p>
      <p><strong className="text-green-700">Residential Address:</strong> {teacher.teachersaddress?.permanent_residential_address || 'Not provided'}</p>
      <p><strong className="text-green-700">Grama Niladari Division:</strong> {teacher.teachersaddress?.grama_niladari_division || 'Not provided'}</p>
      <p><strong className="text-green-700">Grama Niladari Division No:</strong> {teacher.teachersaddress?.grama_niladari_division_number ?? 'Not provided'}</p>
      <p><strong className="text-green-700">Election Division:</strong> {teacher.teachersaddress?.election_division || 'Not provided'}</p>
      <p><strong className="text-green-700">Election Division No:</strong> {teacher.teachersaddress?.election_division_number ?? 'Not provided'}</p>
    </div>

    {/* Work Info */}
    <div className="bg-gray-100 p-6 rounded-lg shadow text-gray-800 space-y-2 text-lg">
      <p><strong className="text-purple-700">Appointed Date:</strong> {teacher.appointed_date || 'Not provided'}</p>
      <p><strong className="text-purple-700">Work Acceptance Date:</strong> {teacher.work_acceptance_date || 'Not provided'}</p>
      <p><strong className="text-purple-700">Appointment Type:</strong> {teacher.appointment_type || 'Not provided'}</p>
      <p><strong className="text-purple-700">Salary Increment Date:</strong> {teacher.salary_increment_date || 'Not provided'}</p>
      <p><strong className="text-purple-700">Current Grade of Teaching Service:</strong> {teacher.current_grade_of_teaching_service || 'Not provided'}</p>
      <p><strong className="text-purple-700">Work Acceptance Date at School:</strong> {teacher.work_acceptance_date_school || 'Not provided'}</p>
      <p><strong className="text-purple-700">Temporary Attached School/Institute:</strong> {teacher.temporary_attachedschool_or_institute_name || 'Not provided'}</p>
      <p><strong className="text-purple-700">Appointed Subject:</strong> {teacher.appointed_subject || 'Not provided'}</p>
      <p><strong className="text-purple-700">Which Grades Teaching Done:</strong> {teacher.which_grades_teaching_done || 'Not provided'}</p>
      <p><strong className="text-purple-700">Current Teaching Subject:</strong> {teacher.current_teaching_subject || 'Not provided'}</p>
      <p><strong className="text-purple-700">Other Subjects Taught:</strong> {teacher.other_subjects_taught || 'Not provided'}</p>
      <p><strong className="text-purple-700">Assigned Class:</strong> {teacher.assigned_class || 'Not provided'}</p>
      <p><strong className="text-purple-700">Other Responsibilities:</strong> {teacher.other_responsibilities_assigned || 'Not provided'}</p>
      <p><strong className="text-purple-700">150 Hrs Tamil Course Completed:</strong> {teacher.is_150_hrs_tamil_course_completed ? 'Yes' : 'No'}</p>
      <p><strong className="text-purple-700">Commuting From School:</strong> {teacher.commuting_from_school || 'Not provided'}</p>
      <p><strong className="text-purple-700">Distance From School (km):</strong> {teacher.distance_from_school || 'Not provided'}</p>
      <p><strong className="text-purple-700">Commuting Method:</strong> {teacher.commuting_method_to_school || 'Not provided'}</p>
      <p><strong className="text-purple-700">Sign Sheet No:</strong> {teacher.number_in_sign_sheet || 'Not provided'}</p>
      <p><strong className="text-purple-700">Salary Sheet No:</strong> {teacher.number_in_salary_sheet || 'Not provided'}</p>
    </div>

    {/* Qualifications */}
    <div className="bg-gray-100 p-6 rounded-lg shadow text-gray-800 space-y-2 text-lg">
      <p><strong className="text-yellow-800">AL Subject Stream:</strong> {teacher.qualifications?.gce_al_subject_stream || 'Not provided'}</p>
      <p><strong className="text-yellow-800">Service Type:</strong> {teacher.qualifications?.type_of_service_in_school || 'Not provided'}</p>
      <p><strong className="text-yellow-800">Highest Edu Qualification:</strong> {teacher.qualifications?.highest_education_qualification || 'Not provided'}</p>
      <p><strong className="text-yellow-800">Basic Degree Stream:</strong> {teacher.qualifications?.basic_degree_stream || 'Not provided'}</p>
      <p><strong className="text-yellow-800">Highest Prof Qualification:</strong> {teacher.qualifications?.highest_professional_qualification || 'Not provided'}</p>
      <p><strong className="text-yellow-800">Present Class:</strong> {teacher.qualifications?.present_class || 'Not provided'}</p>
      <p><strong className="text-yellow-800">Present Grade:</strong> {teacher.qualifications?.present_grade || 'Not provided'}</p>
      <p><strong className="text-yellow-800">Date for Current Class:</strong> {teacher.qualifications?.appointment_date_for_current_class || 'Not provided'}</p>
      <p><strong className="text-yellow-800">Date for Current Grade:</strong> {teacher.qualifications?.appointment_date_for_current_grade || 'Not provided'}</p>
      <p><strong className="text-yellow-800">Service Medium:</strong> {teacher.qualifications?.current_appointment_service_medium || 'Not provided'}</p>
      <p><strong className="text-yellow-800">Subject Section:</strong> {teacher.qualifications?.appointed_subject_section || 'Not provided'}</p>
      <p><strong className="text-yellow-800">Subject Appointed:</strong> {teacher.qualifications?.subject_appointed || 'Not provided'}</p>
      <p><strong className="text-yellow-800">Appointed Date:</strong> {teacher.qualifications?.currentservice_appointed_date || 'Not provided'}</p>
      <p><strong className="text-yellow-800">Subjects Taught:</strong> {teacher.qualifications?.subjects_taught_most_and_second_most || 'Not provided'}</p>
      <p><strong className="text-yellow-800">Position in School:</strong> {teacher.qualifications?.position_in_the_school || 'Not provided'}</p>
      <p><strong className="text-yellow-800">Assign Date for School:</strong> {teacher.qualifications?.assign_date_for_the_school || 'Not provided'}</p>
    </div>

    {/* Other Services */}
    <div className="bg-gray-100 p-6 rounded-lg shadow text-gray-800 space-y-2 text-lg">
      <p><strong className="text-red-700">Other Responsibilities:</strong> {teacher.teacherotherservice?.other_responsibilities_in_school || 'Not provided'}</p>
      <p><strong className="text-red-700">EDCS Member:</strong> {teacher.teacherotherservice?.EDCS_membership || 'Not provided'}</p>
      <p><strong className="text-red-700">WSOP Number:</strong> {teacher.teacherotherservice?.WSOP_Number || 'Not provided'}</p>
      <p><strong className="text-red-700">Agrahara Insurance:</strong> {teacher.teacherotherservice?.Agrahara_insuarence_membership || 'Not provided'}</p>
    </div>
  </div>
</div>

</AppLayout>

  );
}
