
import { type BreadcrumbItem } from '@/types';
import { usePage, router,Link } from '@inertiajs/react';
import { useEffect ,useState} from 'react';
import AppLayout from "@/layouts/app-layout";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type FormData={
   teacher_NIC: string;
   user_id:number;
  personal:{
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
  },
  teachersaddress : {
  permanent_address: string;
  permanent_residential_address: string;
  grama_niladari_division: string;
  grama_niladari_division_number: string;
  election_division: string;
  election_division_number: string;
  },
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
  qualifications:{
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
  },
  teacherotherservice:{
  other_responsibilities_in_school: string;
  EDCS_membership: string;
  WSOP_Number: string;
  Agrahara_insuarence_membership: string;
  },

}
type TeacherRequest = {
  id: number;
  form_data: FormData; // ✅ use correct key matching backend
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
};


type PageProps = {
  requests: TeacherRequest[];
  count:number;
};

const breadcrumbs: BreadcrumbItem[] = [
    {
      title: '👩‍🏫 Teacher Management',
      href: '/dashboard',
    },
];

export default function TeacherRequests()  {
  
  const { props } = usePage<PageProps>();
  console.log("Page Props:", props);
   const { count } = usePage<PageProps>().props;
 console.log("count:", count);

  const requests = props?.requests ?? [];
  console.log("Teacher Requests:", requests);

  // Separate requests into pending and rejected
  const pendingRequests = requests.filter(req => req.status === 'pending');
  const rejectedRequests = requests.filter(req => req.status === 'rejected');
  const [expanded, setExpanded] = useState(false);


  
  const handleApprove = (id: number) => {
  if (confirm("Are you sure you want to approve this request?")) {
    router.post(`/admin/teacher-requests/${id}/approve`, {}, {
      onSuccess: () => {
        toast.success("Request approved successfully!");
      },
      onError: () => {
        toast.error("Failed to approve the request.");
      }
    });
  }
};

const handleReject = (id: number) => {
  if (confirm("Are you sure you want to reject this request?")) {
    router.post(`/admin/teacher-requests/${id}/reject`, {}, {
      onSuccess: () => {
        toast.success("Request rejected.");
      },
      onError: () => {
        toast.error("Failed to reject the request.");
      }
    });
  }
};

  useEffect(() => {
    if(count!=0){
      
      router.visit('/admin/teacher-requests');
    }
   // router.visit('/admin/reset');
    // If there is some condition or a form has been successfully submitted, redirect
    // router.visit('/admin/teacher-requests');
}, []);


  return (
    <AppLayout breadcrumbs={breadcrumbs}>
    <div className="p-8">
       
 
      <h1 className="text-2xl font-bold mb-6">Teacher Form Requests</h1>
      
      {pendingRequests.length === 0 ? (
        <p>No pending requests.</p>
      ) : (
        <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Pending Requests</h2>

        <div className="grid gap-4">
          {pendingRequests.map((req) => (
            <div key={req.id} className="border rounded-lg shadow p-4 bg-white">
              
              <h2 className="text-lg font-semibold">NIC: {req.form_data?.teacher_NIC ?? 'N/A'}</h2>
              <button
                  onClick={() => setExpanded(!expanded)}
                  className="flex items-center gap-2 text-blue-600 hover:underline"
                >
                  <span>{expanded ? "▼" : "▶"}</span>
                  View Teacher Details
                </button>

      {expanded && (
          <div className="mt-6 border border-gray-300 rounded-lg bg-gray-200 p-8 shadow-inner  bg-cover bg-center ">
            
                    <div className="grid grid-cols-1 lg:grid-cols-1 gap-8 text-m text-gray-800 ">
        {/* Personal Info */}
       <div className="bg-white text-gray-800 shadow-2xl    p-10">
  <h3 className="font-bold text-lg text-white mb-6 text-center rounded-md bg-gradient-to-br from-indigo-900 to-purple-700 py-3 shadow-md">
    PERSONAL INFORMATION
  </h3>

  <div className=" grid grid-cols-2 text-lg text-purple-900 text-left  space-y-4 space-x-3">
    <p><strong className="text-gray-600">Full Name:</strong> {req.form_data?.personal?.Full_name ?? "N/A"}</p>
    <p><strong className="text-gray-600">Name with Initial:</strong> {req.form_data?.personal?.Full_name_with_initial ?? "N/A"}</p>
    <p><strong className="text-gray-600">Gender:</strong> {req.form_data?.personal?.Gender ?? "N/A"}</p>
    <p><strong className="text-gray-600">Birthdate:</strong> {req.form_data?.personal?.Birthdate ?? "N/A"}</p>
    <p><strong className="text-gray-600">Region:</strong> {req.form_data?.personal?.Region ?? "N/A"}</p>
    <p><strong className="text-gray-600">Ethnicity:</strong> {req.form_data?.personal?.Ethnicity ?? "N/A"}</p>
    <p><strong className="text-gray-600">Title:</strong> {req.form_data?.personal?.Title ?? "N/A"}</p>
    <p><strong className="text-gray-600">Marital Status:</strong> {req.form_data?.personal?.Marital_status ?? "N/A"}</p>
    <p><strong className="text-gray-600">Email:</strong> {req.form_data?.personal?.Email_address ?? "N/A"}</p>
    <p><strong className="text-gray-600">Mobile:</strong> {req.form_data?.personal?.Mobile_number ?? "N/A"}</p>
    <p><strong className="text-gray-600">Whatsapp:</strong> {req.form_data?.personal?.Whatsapp_number ?? "N/A"}</p>
    <p><strong className="text-gray-600">Fixed Tel:</strong> {req.form_data?.personal?.Fixed_telephone_number ?? "N/A"}</p>
    <p><strong className="text-gray-600">Emergency Tel:</strong> {req.form_data?.personal?.Emergency_telephone_number ?? "N/A"}</p>
    <p><strong className="text-gray-600">Family Details:</strong> {req.form_data?.personal?.Details_about_family_members ?? "N/A"}</p>
  </div>
</div>

<div className="bg-white text-gray-800 shadow-2xl w-full   p-10">
                       <h3 className="font-bold text-lg text-white mb-6 text-center rounded-md bg-gradient-to-br from-indigo-900 to-purple-700 py-3 shadow-md">
        QUALIFICATIONS INFORMATIONS
  </h3>
   <div className=" grid grid-cols-2 text-lg  text-left  space-y-4 space-x-3 text-gray-600">
     
                  <p><strong>AL Subject Stream:</strong> {req.form_data?.qualifications?.gce_al_subject_stream ?? "N/A"}</p>
          <p><strong>Type of Service:</strong> {req.form_data?.qualifications?.type_of_service_in_school ?? "N/A"}</p>
          <p><strong>Highest Education Qualification:</strong> {req.form_data?.qualifications?.highest_education_qualification ?? "N/A"}</p>
          <p><strong>Basic Degree Stream:</strong> {req.form_data?.qualifications?.basic_degree_stream ?? "N/A"}</p>
          <p><strong>Highest Professional Qualification:</strong> {req.form_data?.qualifications?.highest_professional_qualification ?? "N/A"}</p>
          <p><strong>Present Class:</strong> {req.form_data?.qualifications?.present_class ?? "N/A"}</p>
          <p><strong>Present Grade:</strong> {req.form_data?.qualifications?.present_grade ?? "N/A"}</p>
          <p><strong>Appointment Date (Class):</strong> {req.form_data?.qualifications?.appointment_date_for_current_class ?? "N/A"}</p>
          <p><strong>Appointment Date (Grade):</strong> {req.form_data?.qualifications?.appointment_date_for_current_grade ?? "N/A"}</p>
          <p><strong>Service Medium:</strong> {req.form_data?.qualifications?.current_appointment_service_medium ?? "N/A"}</p>
          <p><strong>Subject Section:</strong> {req.form_data?.qualifications?.appointed_subject_section ?? "N/A"}</p>
          <p><strong>Appointed Subject:</strong> {req.form_data?.qualifications?.subject_appointed ?? "N/A"}</p>
          <p><strong>Current Appointment Date:</strong> {req.form_data?.qualifications?.currentservice_appointed_date ?? "N/A"}</p>
          <p><strong>Subjects Taught:</strong> {req.form_data?.qualifications?.subjects_taught_most_and_second_most ?? "N/A"}</p>
          <p><strong>Position in School:</strong> {req.form_data?.qualifications?.position_in_the_school ?? "N/A"}</p>
          <p><strong>Assign Date for School:</strong> {req.form_data?.qualifications?.assign_date_for_the_school ?? "N/A"}</p>
          </div>
          </div>

          {/* Address Info */}

         

<div className="bg-white text-gray-800 shadow-2xl w-full   p-10">
                       <h3 className="font-bold text-lg text-white mb-6 text-center rounded-md bg-gradient-to-br from-indigo-900 to-purple-700 py-3 shadow-md">
        WORK INFORMATIONS
  </h3>
   <div className=" grid grid-cols-2 text-lg  text-left  space-y-4 space-x-3 text-gray-600">
                           <p><strong>Appointed Date:</strong> {req.form_data?.appointed_date ?? "N/A"}</p>
                            <p><strong>User id:</strong> {req.form_data?.user_id ?? "N/A"}</p>
          <p><strong>Work Acceptance Date:</strong> {req.form_data?.work_acceptance_date ?? "N/A"}</p>
          <p><strong>Appointment Type:</strong> {req.form_data?.appointment_type ?? "N/A"}</p>
          <p><strong>Salary Increment Date:</strong> {req.form_data?.salary_increment_date ?? "N/A"}</p>
          <p><strong>Current Grade of Service:</strong> {req.form_data?.current_grade_of_teaching_service ?? "N/A"}</p>
          <p><strong>School Acceptance Date:</strong> {req.form_data?.work_acceptance_date_school ?? "N/A"}</p>
          <p><strong>Attached School/Institute:</strong> {req.form_data?.temporary_attachedschool_or_institute_name ?? "N/A"}</p>
          <p><strong>Appointed Subject:</strong> {req.form_data?.appointed_subject ?? "N/A"}</p>
          <p><strong>Grades Teaching:</strong> {req.form_data?.which_grades_teaching_done ?? "N/A"}</p>
          <p><strong>Current Subject:</strong> {req.form_data?.current_teaching_subject ?? "N/A"}</p>
          <p><strong>Other Subjects:</strong> {req.form_data?.other_subjects_taught ?? "N/A"}</p>
          <p><strong>Assigned Class:</strong> {req.form_data?.assigned_class ?? "N/A"}</p>
          <p><strong>Responsibilities:</strong> {req.form_data?.other_responsibilities_assigned ?? "N/A"}</p>
          <p><strong>150 Hours Tamil Course:</strong> {req.form_data?.is_150_hrs_tamil_course_completed ? "Yes" : "No"}</p>
          <p><strong>Commuting From:</strong> {req.form_data?.commuting_from_school ?? "N/A"}</p>
          <p><strong>Distance From School:</strong> {req.form_data?.distance_from_school ?? "N/A"} km</p>
          <p><strong>Method of Commute:</strong> {req.form_data?.commuting_method_to_school ?? "N/A"}</p>
          <p><strong>Sign Sheet No:</strong> {req.form_data?.number_in_sign_sheet ?? "N/A"}</p>
          <p><strong>Salary Sheet No:</strong> {req.form_data?.number_in_salary_sheet ?? "N/A"}</p>
         </div>
         </div>
          {/* Qualifications */}

          {/* Other Service Info */}
 <div className="bg-white text-gray-800 shadow-2xl w-full   p-10">
                       <h3 className="font-bold text-lg text-white mb-6 text-center rounded-md bg-gradient-to-br from-indigo-900 to-purple-700 py-3 shadow-md">
        OTHER SERVICES INFORMATIONS
  </h3>
   <div className=" grid grid-cols-2 text-lg  text-left  space-y-4 space-x-3 text-gray-600">
                       
              <p><strong>Other Responsibilities in School:</strong> {req.form_data?.teacherotherservice?.other_responsibilities_in_school ?? "N/A"}</p>
          <p><strong>EDCS Membership:</strong> {req.form_data?.teacherotherservice?.EDCS_membership ?? "N/A"}</p>
          <p><strong>WSOP Number:</strong> {req.form_data?.teacherotherservice?.WSOP_Number ?? "N/A"}</p>
          <p><strong>Agrahara Insurance:</strong> {req.form_data?.teacherotherservice?.Agrahara_insuarence_membership ?? "N/A"}</p>
</div>
</div>

<div className="bg-white text-gray-800 shadow-2xl w-full   p-10">
                       <h3 className="font-bold text-lg text-white mb-6 text-center rounded-md bg-gradient-to-br from-indigo-900 to-purple-700 py-3 shadow-md">
    ADDRESS INFORMATIONS
  </h3>
  <div className=" grid grid-cols-2 text-lg  text-left  space-y-4 space-x-3 text-gray-600">
          <p><strong>Permanent Address:</strong> {req.form_data?.teachersaddress?.permanent_address ?? "N/A"}</p>
          <p><strong>Residential Address:</strong> {req.form_data?.teachersaddress?.permanent_residential_address ?? "N/A"}</p>
          <p><strong>Grama Niladari Division:</strong> {req.form_data?.teachersaddress?.grama_niladari_division ?? "N/A"}</p>
          <p><strong>GN Division No:</strong> {req.form_data?.teachersaddress?.grama_niladari_division_number ?? "N/A"}</p>
          <p><strong>Election Division:</strong> {req.form_data?.teachersaddress?.election_division ?? "N/A"}</p>
          <p><strong>Election Division No:</strong> {req.form_data?.teachersaddress?.election_division_number ?? "N/A"}</p>
           </div>
</div>
         
        </div>
        </div>
      )}
    

              
              <p><strong>Submitted on:</strong> {new Date(req.created_at).toLocaleString()}</p>

              {/* You can show more fields from req.data if needed */}
              <div className="mt-2 space-x-2">
                <button
                  onClick={() => handleApprove(req.id)}
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleReject(req.id)}
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
        </div>
      )}
      {/* Rejected Requests */}
      {rejectedRequests.length === 0 ? (
        <p>No rejected requests.</p>
      ) : (
        <div className="grid gap-4 mt-6">
          <h2 className="text-xl font-semibold mb-4">Rejected Requests</h2>
          {rejectedRequests.map((req) => (
            <div key={req.id} className="border rounded-lg shadow p-4 bg-white">
              <h2 className="text-lg font-semibold">NIC: {req.form_data.teacher_NIC}</h2>
              <p><strong>Submitted on:</strong> {new Date(req.created_at).toLocaleString()}</p>
              <div className="mt-2 space-x-2">
                <button
                  onClick={() => handleApprove(req.id)}
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  Approve
                </button>
                {/* Optionally you can remove the reject button here */}
              </div>
            </div>
          ))}
        </div>
      )}

      
    </div>
    <ToastContainer position="top-right" autoClose={3000} hideProgressBar />

    </AppLayout>
  );
}


