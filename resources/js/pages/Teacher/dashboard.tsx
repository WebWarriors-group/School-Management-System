import React, { useState } from 'react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { FiLogOut, FiChevronRight, FiArrowRight } from 'react-icons/fi';
import { FiMail, FiCalendar, FiBook } from 'react-icons/fi';
import { FiUser, FiUsers, FiBarChart2, FiEdit, FiClock } from 'react-icons/fi';
import { FaChalkboardTeacher, FaUserGraduate } from 'react-icons/fa';
import { MdAssignment, MdClass } from 'react-icons/md';
import { Avatar, Card, Modal } from 'antd';
import { motion } from "framer-motion";

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: '📊 Dashboard',
    href: '/',
  },
];

type Teacher = {
    teacher_NIC: string;

    personal: {
        Full_name: string;
        Full_name_with_initial: string;
        Photo: string | null;
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
    };

    teachersaddress: {
        permanent_address: string;
        residential_address: string;
        grama_niladari_division: string;
        grama_niladari_division_number: string;
        election_division: string;
        election_division_number: string;
    };

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
    other_responsibilities_assigned: string;
    is_150_hrs_tamil_course_completed: boolean;
    commuting_from_school: "Home" | "Boarding" | "Hostel" | "Other";
    distance_from_school: number;
    commuting_method_to_school: "Bicycle" | "MotorBike" | "Car" | "Bus" | "Threewheeler" | "Walk" | "Other";
    number_in_sign_sheet: string;
    number_in_salary_sheet: string;

    qualifications: {
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
    };
    teacherotherservice: {
        other_responsibilities_in_school: string;
        EDCS_membership: string;
        WSOP_Number: number | null;
        Agrahara_insuarence_membership: string;
    };

    class: {
        class_name: string;
        grade: string;
        section: string;
        number_of_students: number;
        studentacademics: {
            reg_no: string;
            studentpersonal: {
                full_name: string;
            };
        }[];
    };
};

const TeacherDashboard = ({ teacher }: { teacher: Teacher }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'students' | 'classes' | 'marks'>('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [isProfileVisible, setIsProfileVisible] = useState(false);

  const getAvatarSrc = (photo: string | null) => {
    if (!photo) return undefined;
    if (photo.startsWith('http') || photo.startsWith('/')) return photo;
    if (photo.startsWith('data:image')) return photo;
    return undefined;
  };

  const showProfile = () => setIsProfileVisible(true);
  const hideProfile = () => setIsProfileVisible(false);

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      {/* Header */}
      <header className="sticky top-0 z-10 flex w-full items-center justify-between border-b border-gray-200 bg-white/80 backdrop-blur-sm p-4 shadow-sm">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Teacher Dashboard</h1>
        <div 
          className="flex items-center gap-3 cursor-pointer group"
          onClick={showProfile}
        >
          <Avatar 
            size={40}
            src={getAvatarSrc(teacher.personal.Photo)}
            className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white ring-2 ring-white shadow-md group-hover:ring-blue-300 transition-all"
          >
            {teacher.personal.Full_name.charAt(0)}
          </Avatar>
          <div className="text-right">
            <p className="font-medium text-gray-800 group-hover:text-blue-600 transition-colors">{teacher.personal.Full_name}</p>
            <p className="text-xs text-gray-500">{teacher.personal.Title}</p>
          </div>
        </div>
      </header>

      {/* Profile Modal */}
      <Modal
        title={<span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Teacher Profile</span>}
        visible={isProfileVisible}
        onCancel={hideProfile}
        footer={[
          <button
            key="logout"
            className="flex items-center px-4 py-2.5 text-red-500 hover:bg-red-50 rounded-lg border border-red-100 hover:border-red-200 transition-all font-medium"
          >
            <FiLogOut className="mr-2" />
            Log Out
          </button>,
          <button
            key="close"
            onClick={hideProfile}
            className="px-4 py-2.5 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-lg hover:from-blue-600 hover:to-indigo-600 transition-all shadow-md hover:shadow-lg font-medium"
          >
            Close
          </button>
        ]}
        className="rounded-xl max-w-2xl"
        bodyStyle={{ padding: '24px' }}
      >
        <div className="flex flex-col items-center space-y-6">
          <Avatar 
            size={96} 
            src={getAvatarSrc(teacher.personal.Photo)} 
            className="bg-gradient-to-br from-blue-100 to-indigo-100 text-blue-600 border-4 border-white shadow-xl"
            icon={<FiUser size={40} className="text-blue-400" />}
          >
            {teacher.personal.Full_name.charAt(0)}
          </Avatar>
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-800">{teacher.personal.Title} {teacher.personal.Full_name}</h3>
            <p className="text-blue-500 font-medium">{teacher.qualifications.highest_education_qualification}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
            <InfoCard 
              icon={<FiUser className="text-blue-500" />} 
              title="Personal Information" 
              data={[
                ['NIC', teacher.teacher_NIC],
                ['Gender', teacher.personal.Gender],
                ['Birthdate', teacher.personal.Birthdate]
              ]} 
            />
            <InfoCard 
              icon={<FiMail className="text-indigo-500" />} 
              title="Contact Information" 
              data={[
                ['Email', teacher.personal.Email_address],
                ['Mobile', teacher.personal.Mobile_number]
              ]} 
            />
            <InfoCard 
              icon={<FiBook className="text-purple-500" />} 
              title="Qualifications" 
              data={[
                ['Highest Education', teacher.qualifications.highest_education_qualification],
                ['Degree', teacher.qualifications.basic_degree_stream]
              ]} 
            />
            <InfoCard 
              icon={<FaChalkboardTeacher className="text-green-500" />} 
              title="Class Information" 
              data={[
                ['Class', teacher.class?.class_name ?? '—']
              ]} 
            />
          </div>
        </div>
      </Modal>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-gradient-to-b from-gray-50 to-gray-100 p-6">
        {/* Quick Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <DashboardCard
            title="Students"
            subtitle={`${teacher.class.number_of_students} Students`}
            icon={<FaUserGraduate className="text-3xl text-white/90" />}
            colorFrom="from-blue-500"
            colorTo="to-indigo-600"
            onClick={() => setActiveTab('students')}
          />
          <DashboardCard
            title="My Class"
            subtitle={teacher.class.class_name}
            icon={<MdClass className="text-3xl text-white/90" />}
            colorFrom="from-purple-500"
            colorTo="to-violet-600"
            onClick={() => setActiveTab('classes')}
          />
          <DashboardCard
            title="Marks"
            subtitle="Enter/View Marks"
            icon={<FiEdit className="text-3xl text-white/90" />}
            colorFrom="from-emerald-500"
            colorTo="to-teal-600"
            onClick={() => setActiveTab('marks')}
          />
        </div>

        {/* Class & Performance */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card 
            title="Class Information" 
            className="shadow-lg border-0 rounded-xl overflow-hidden"
            headStyle={{ 
              background: 'linear-gradient(90deg, #3B82F6 0%, #6366F1 100%)',
              color: 'white',
              fontSize: '1.125rem',
              fontWeight: 600,
              padding: '16px 24px',
              border: 'none'
            }}
            bodyStyle={{ padding: '24px' }}
          >
            <ClassInfo teacherClass={teacher.class} />
          </Card>
          <Card 
            title="Student Performance" 
            className="shadow-lg border-0 rounded-xl overflow-hidden"
            headStyle={{ 
              background: 'linear-gradient(90deg, #3B82F6 0%, #6366F1 100%)',
              color: 'white',
              fontSize: '1.125rem',
              fontWeight: 600,
              padding: '16px 24px',
              border: 'none'
            }}
            bodyStyle={{ padding: '24px' }}
          >
            {teacher.class.studentacademics?.length > 0 ? (
              <>
                <div className="space-y-4">
                  {teacher.class.studentacademics.map(student => (
                    <div key={student.reg_no} className="flex items-center space-x-4 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                      <Avatar 
                        src={getAvatarSrc(teacher.personal.Photo)}
                        size={40}
                        className="bg-gradient-to-br from-blue-100 to-indigo-100 text-blue-600 border border-gray-200 shadow-sm"
                      >
                        {student.studentpersonal.full_name.charAt(0)}
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-800 truncate">{student.studentpersonal.full_name}</p>
                        <p className="text-sm text-gray-500">Reg: {student.reg_no}</p>
                      </div>
                      <div className="w-16 text-right">
                        <span className="inline-block px-2 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-medium">
                          85%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="text-center mt-6">
                  <button 
                    className="px-4 py-2 text-blue-600 hover:text-white hover:bg-blue-500 rounded-lg border border-blue-200 hover:border-blue-500 transition-all font-medium"
                    onClick={() => console.log('View all clicked')}
                  >
                    View All Students
                  </button>
                </div>
              </>
            ) : (
              <div className="py-8 text-center">
                <FiUsers className="mx-auto text-4xl text-gray-300 mb-3" />
                <p className="text-gray-500 font-medium">No students available</p>
              </div>
            )}
          </Card>
        </div>

        {/* Activities */}
        <Card 
          title="Recent Activities" 
          className="mt-8 shadow-lg border-0 rounded-xl overflow-hidden"
          headStyle={{ 
            background: 'linear-gradient(90deg, #3B82F6 0%, #6366F1 100%)',
            color: 'white',
            fontSize: '1.125rem',
            fontWeight: 600,
            padding: '16px 24px',
            border: 'none'
          }}
          bodyStyle={{ padding: '24px' }}
        >
          <div className="space-y-4">
            {[
              { id: 1, action: 'Updated marks for Math Quiz', time: '2 hours ago', icon: <FiBarChart2 className="text-blue-500" /> },
              { id: 2, action: 'Added new assignment', time: 'Yesterday', icon: <MdAssignment className="text-indigo-500" /> },
              { id: 3, action: 'Recorded attendance', time: '2 days ago', icon: <FiCalendar className="text-purple-500" /> },
              { id: 4, action: 'Posted lecture materials', time: '3 days ago', icon: <FiBook className="text-green-500" /> },
            ].map(activity => (
              <div 
                key={activity.id} 
                className="flex items-start space-x-4 p-3 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <div className="p-2.5 rounded-full bg-gray-100 text-gray-600 mt-0.5">
                  {activity.icon}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-800">{activity.action}</p>
                  <p className="text-sm text-gray-500 flex items-center">
                    <FiClock className="mr-1.5" /> {activity.time}
                  </p>
                </div>
                <button className="text-blue-500 hover:text-blue-700 p-1">
                  <FiChevronRight />
                </button>
              </div>
            ))}
          </div>
          <div className="mt-6 text-center">
            <button className="text-blue-600 hover:text-blue-800 font-medium flex items-center justify-center mx-auto">
              View All Activities <FiArrowRight className="ml-1.5" />
            </button>
          </div>
        </Card>
      </main>
    </AppLayout>
  );
};

// Reusable components (keep exactly the same but with enhanced styling)
const InfoCard = ({ icon, title, data }: { icon: React.ReactNode, title: string, data: [string, string | undefined][] }) => (
  <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
    <h4 className="font-semibold mb-4 flex items-center text-gray-800">
      <span className="mr-3 p-2 rounded-full bg-gray-100">{icon}</span> 
      <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">{title}</span>
    </h4>
    <div className="space-y-3 text-gray-700">
      {data.map(([label, value]) => (
        <div key={label} className="flex justify-between">
          <span className="text-gray-500 font-medium">{label}</span>
          <span className="font-medium text-gray-800">{value ?? '—'}</span>
        </div>
      ))}
    </div>
  </div>
);

const DashboardCard = ({ title, subtitle, icon, colorFrom, colorTo, onClick }: {
  title: string, subtitle: string, icon: React.ReactNode, colorFrom: string, colorTo: string, onClick: () => void
}) => (
  <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} transition={{ type: "spring", stiffness: 300 }}>
    <Card 
      hoverable 
      onClick={onClick}
      className={`bg-gradient-to-r ${colorFrom} ${colorTo} text-white shadow-xl cursor-pointer border-0 rounded-xl overflow-hidden`}
      bodyStyle={{ padding: '24px' }}
    >
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold">{title}</h3>
          <p className="text-sm opacity-90">{subtitle}</p>
        </div>
        <div className="p-3 rounded-full bg-white/20 backdrop-blur-sm">
          {icon}
        </div>
      </div>
    </Card>
  </motion.div>
);

const ClassInfo = ({ teacherClass }: { teacherClass: Teacher['class'] }) => (
  <div className="space-y-4 text-gray-700">
    <div className="flex items-center space-x-5 mb-5">
      <div className="p-3.5 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 text-blue-600 shadow-sm">
        <MdClass className="text-2.5xl" />
      </div>
      <div>
        <h3 className="text-xl font-bold text-gray-800">{teacherClass.class_name}</h3>
        <p className="text-gray-600 font-medium">Grade {teacherClass.grade} - Section {teacherClass.section}</p>
      </div>
    </div>
    <div className="space-y-3">
      <div className="flex justify-between items-center py-2 border-b border-gray-100">
        <span className="text-gray-600 font-medium">Students:</span>
        <span className="font-bold text-blue-600">{teacherClass.number_of_students}</span>
      </div>
      <div className="flex justify-between items-center py-2 border-b border-gray-100">
        <span className="text-gray-600 font-medium">Class Teacher:</span>
        <span className="font-bold text-green-500">Yes</span>
      </div>
      <div className="flex justify-between items-center py-2">
        <span className="text-gray-600 font-medium">Subjects:</span>
        <span className="font-bold text-purple-600">5</span>
      </div>
    </div>
  </div>
);

export default TeacherDashboard;