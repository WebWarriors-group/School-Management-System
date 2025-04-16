
import { type BreadcrumbItem } from '@/types';
import { usePage, router } from '@inertiajs/react';
import { useEffect ,} from 'react';
import AppLayout from "@/layouts/app-layout";
type FormData={
  teacher_NIC:string;
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
  

  
  const handleApprove = (id: number) => {
    if (confirm("Are you sure you want to approve this request?")) {
      router.post(`/admin/teacher-requests/${id}/approve`);
    }
  };

  const handleReject = (id: number) => {
    if (confirm("Are you sure you want to reject this request?")) {
      router.post(`/admin/teacher-requests/${id}/reject`);
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
    </AppLayout>
  );
}


