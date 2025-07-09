import React, { useState, useEffect } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { Head, usePage } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';
import AppLayout from '@/layouts/app-layout';
import { toast, ToastContainer } from 'react-toastify';


const breadcrumbs: BreadcrumbItem[] = [
  {
    title: '👩‍🏫 Teacher Management',
    href: '/dashboard',
  },
];

type LeaveRequest = {
  id: number;
  teacher_NIC: string;
  leave_type: string;
  leave_start_date: string;
  leave_end_date: string;
  reason: string;
  requires_substitute: boolean;
  status: string;
  created_at: string;
};

type TeacherStats = {
  leave_requests: number;
  total_leave_days: number;
  absents: number;
  present: number;
};

type PageProps = {
  leaveRequests: LeaveRequest[];
};


export default function AdminLeaveRequests() {
  const { leaveRequests } = usePage<PageProps>().props;

  const [searchNIC, setSearchNIC] = useState('');
  const [teacherStats, setTeacherStats] = useState<TeacherStats | null>(null);

  const filtered = leaveRequests.filter((req) =>
    req.teacher_NIC.toLowerCase().includes(searchNIC.toLowerCase())
  );
  const pendingRequests = filtered.filter((r) => r.status === 'Pending');
  const approvedRequests = filtered.filter((r) => r.status === 'Approved');
  const rejectedRequests = filtered.filter((r) => r.status === 'Rejected');

  const fetchTeacherStats = async (nic: string) => {
    try {
      const response = await fetch(`/api/teacher-stats/${nic}`);
      const data = await response.json();
      setTeacherStats(data);
    } catch (error) {
      console.error('Failed to fetch stats:', error);
      setTeacherStats(null);
    }
  };

  const handleApprove = (id: number) => {
    if (confirm("Are you sure you want to approve this request?")) {
    Inertia.post(`/admin/teacher-leave-requests/${id}/approve`, {}, {
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
    Inertia.post(`/admin/teacher-leave-requests/${id}/reject`, {}, {
          onSuccess: () => {
            toast.success("Request rejected.");
          },
          onError: () => {
            toast.error("Failed to reject the request.");
          }
        });
      }
  };

  const renderRequests = (
    requests: LeaveRequest[],
    title: string,
    color: string
  ) => (
    <div className="bg-white shadow p-4 rounded-lg border-t-4 flex-1 h-fit">
      <h2 className="text-xl font-bold mb-4 text-gray-800">{title}</h2>
{requests.map((req) => (
  <div
    key={req.id}
    className={`bg-gray-50 shadow-sm p-4 rounded border-l-4 ${color} mb-4`}
  >
    <h2 className="text-md font-semibold text-gray-800 mb-1">
      NIC: {req.teacher_NIC}
    </h2>

    <p className="text-sm text-gray-600 mb-2">
      <strong>Status:</strong> {req.status}
    </p>

    <p className="text-sm text-gray-700 mb-1">
      <strong>Leave Type:</strong> {req.leave_type}
    </p>
    <p className="text-sm text-gray-700 mb-1">
      <strong>Start Date:</strong> {req.leave_start_date}
    </p>
    <p className="text-sm text-gray-700 mb-1">
      <strong>End Date:</strong> {req.leave_end_date}
    </p>
    <p className="text-sm text-gray-700 mb-1">
      <strong>Reason:</strong> {req.reason}
    </p>

    {req.status === 'Pending' && (
      <div className="flex gap-2 mt-4">
        <button
          onClick={() => handleApprove(req.id)}
          className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700"
        >
          Approve
        </button>
        <button
          onClick={() => handleReject(req.id)}
          className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700"
        >
          Reject
        </button>
      </div>
    )}
  </div>
))}

    </div>
  );

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <div className="p-6 max-w-7xl mx-auto">
        <Head title="Leave Requests" />
        <h1 className="text-2xl font-bold mb-6">📋 Leave Requests</h1>

        <input
          type="text"
          placeholder="Search by Teacher NIC..."
          value={searchNIC}
          onChange={(e) => {
            setSearchNIC(e.target.value);
            const nic = e.target.value.trim();
            if (nic) fetchTeacherStats(nic);
            else setTeacherStats(null);
          }}
          className="w-full md:w-1/3 p-2 border rounded mb-4"
        />

        {teacherStats && (
          <div className="bg-white p-4 rounded shadow mb-6">
            <h3 className="text-lg font-semibold mb-2">
              📊 Attendance Stats
            </h3>
            <p>
              <strong>Leave Requests Taken:</strong>{' '}
              {teacherStats.leave_requests}
            </p>
            <p>
              <strong>Total Leave Days Taken:</strong>{' '}
              {teacherStats.total_leave_days}
            </p>
            <p>
              <strong>Absents:</strong> {teacherStats.absents}
            </p>
            <p>
              <strong>Present:</strong> {teacherStats.present}
            </p>
          </div>
        )}

        {/* Responsive 3-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {renderRequests(
            pendingRequests,
            '🟡 Pending Requests',
            'border-yellow-500'
          )}
          {renderRequests(
            approvedRequests,
            '✅ Approved Requests',
            'border-green-500'
          )}
          {renderRequests(
            rejectedRequests,
            '❌ Rejected Requests',
            'border-red-500'
          )}
        </div>
      </div>
    </AppLayout>
  );
}
