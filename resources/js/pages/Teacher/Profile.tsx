import React from 'react';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';

type Props = {
  teacher: any;
};

export default function Profile({ teacher }: Props) {
  return (
    <AppLayout>
      <Head title="My Profile" />
      <div className="max-w-4xl mx-auto py-8">
        <h1 className="text-3xl font-bold mb-6 text-blue-700">👤 My Profile</h1>
        <div className="bg-white p-6 rounded-lg shadow space-y-3 text-lg text-gray-800">
          <p><strong>NIC:</strong> {teacher.teacher_NIC}</p>
          <p><strong>Full Name:</strong> {teacher.personal?.Full_name}</p>
          <p><strong>Email:</strong> {teacher.personal?.Email_address}</p>
          <p><strong>Gender:</strong> {teacher.personal?.Gender}</p>
          <p><strong>Mobile:</strong> {teacher.personal?.Mobile_number}</p>
          <p><strong>Region:</strong> {teacher.personal?.Region}</p>
        </div>
      </div>
    </AppLayout>
  );
}
