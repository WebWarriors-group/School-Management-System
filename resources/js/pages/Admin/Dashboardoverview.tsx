import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faPlus } from '@fortawesome/free-solid-svg-icons';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Inertia } from '@inertiajs/inertia';
import { InertiaProgress } from '@inertiajs/progress';
import { usePage } from '@inertiajs/react';
import { Pointer } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import AddTeacherForm from '@/pages/Teacher/teacherForm';
import StudentAdmissionForm from '@/pages/Student/StudentAdmissionForm';
import StudentAdmissionChart from '@/pages/Student/StudentAdmissionChart';
import StudentPerformanceLineChart from '../Student/StudentPerformanceChart';
import ViewAllStudents from '@/pages/Student/ViewAllStudents';
import AssignClassTeachers from '@/pages/Admin/Classpage';
import AssignTeachersPage from '@/pages/Admin/AssignTeachersPage';
import ClassIndex from '@/pages/Admin/ClassCrud';
import { Button } from '@headlessui/react';
import Gallery from '@/pages/Admin/imagegallery';
import CalendarPage from '@/pages/Admin/CalendarPage';
import SubjectIndex from '@/pages/Admin/subject';
import ImportStudent from '@/pages/Admin/ImportStudent';

 import { router } from '@inertiajs/react';


const breadcrumbs: BreadcrumbItem[] = [
  {
    title: '📊 Dashboard Overview',
    href: '/',
  },
];

interface StudentPersonal {
  full_name_with_initial: string;
  gender: string;
}

interface Student {
  reg_no: string;
  studentpersonal?: StudentPersonal;
}

interface Class {
  class_id: number;
  class_name: string;
  grade: number;
  year: number;
  section: string;
  studentacademics_count: number;
  teacher_NIC: string;
  studentacademics?: Student[];
}

interface Card {
  id: number;
  title: string;
  value: string | number;
  footer: string;
  footerColor: string;
  icon: any;
  color: string;
}

interface ClassItem {
  class_id: number;
  grade: number;
  year: number;
  section: string;
  class_name: string;
  teacher_NIC: string;
}

interface qualification{

  current_appointment_service_medium:string;
  appointed_subject_section:string;
  subject_appointed:string;
  subjects_taught_most_and_second_most:string;
  highest_education_qualification:string;
  basic_degree_stream:string;
  highest_professional_qualification:string;

}

interface personal{
  Full_name_with_initial:string;
  Gender:string;
  Photo?: string | null;
}

interface Teacher {
  teacher_NIC: string;

  qualifications?:qualification;
   personal?:personal;
}

interface Image {
  title?: string;
  path: string;
  id: number;
}

interface Subject {
  subject_id: number;
  subject_name: string;
}

interface Grade {
  id: number;
  grade: number;
  subject_id: number;
  subject_type: string;
}



interface Props {
  filters: {
    grade?: number;
    section?: number;
    class_name?: string;
  };
  teachers: number;
  students: number;
  class1: number;
  subject: number;
  grades: Grade[];
  classfooter: string;
  teacherfooter: string;
  studentfooter: string;
  teacher12: Teacher[];
  classData: {
    data: Class[];
  };
  img: {
    data: Image[];
  };
  classes: {
    [class_name: string]: {
      [grade: number]: ClassItem[];
    };
  };
  subjects: Subject[];
}



export default function StatsOverviewPage({ grades, subjects, classes: classesGrouped, img, classData, teacher12, classfooter, teacherfooter, studentfooter, subject, class1, students, teachers ,filters}: Props) {
  const [showForm, setShowForm] = useState(false);
  const [showclass, setClass] = useState(false);
  const [showSub, setSub] = useState(false);
  const [addteacher, setteacher] = useState(false);
  const [showCalendar, setshowCalendar] = useState(false);
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);
  const [showStudentForm, setShowStudentForm] = useState(false);
  const [showImportForm, setImportForm] = useState(false);
  const [Fetchedstudents, setFetchedStudents] = useState<Student[]>([]);


  InertiaProgress.init({
   // Optional: hide spinner if enabled
  delay: 999999,    
    // A huge delay so it never shows
});





  
 const [grade, setGrade] = useState<number | ''>('');


 const [section, setSection] = React.useState<string | number>('');

  const [classname,setClassName]=React.useState<string | number>('');

 const handleFilterSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
setClass(true);
  Inertia.get('/admin/dashboardoverview', {
    grade,
    section,
    class_name: classname,
  }, {
    preserveState: true,
    replace: true,
  });

   // Keep class table visible
};


  const [filters, setFilters] = useState<{ grade?: string; section?: string; class_name?: string }>(initialFilters || {});
  const [filteredClasses, setFilteredClasses] = useState<Class[]>([]);


  const fetchStudents = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/students");
      if (!response.ok) throw new Error("Error fetching students");
      const data = await response.json();
      setFetchedStudents(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  useEffect(() => {
  const hasFilter = filters.grade || filters.section || filters.class_name;

  if (hasFilter) {
    setClass(true); // Show class table if filter applied
  } else {
    setClass(false); // Hide class table if no filter (e.g. after "Back")
  }

  // Optional: sync local state with filter props
  setGrade(filters.grade || '');
  setSection(filters.section || '');
  setClassName(filters.class_name || '');
}, [filters]);



  

  const handleCardClick = (card: Card) => {
    setSelectedCard(card);
  };

  const handleAddTeacherClick = () => {
    setShowForm(true);
  };

  const handleAddStudentClick = () => {
    setShowStudentForm(true);
  };

  const CloseClick = () => {
    setShowStudentForm(false);
  };

  const handle2 = () => {
    setClass(true);

   
  };

  const handle4 = () => {
    setSub(true);
  };

  const CloseClick1 = () => {
    setClass(false);
    setSelectedCard(null);
  };

  const CloseClick8 = () => {
    setSub(false);
  };

  const CloseClick2 = () => {
    setteacher(true);
  };

  const back1 = () => {
    setteacher(false);
  };

  const back3 = () => {
    setSelectedCard(null);
  };

  const handle10 = () => {
    setshowCalendar(true);
  }


 const handleBackClick1 = () => {
  const filtersApplied = grade || section || classname;

  setGrade('');
  setSection('');
  setClassName('');
  setClass(false);

  if (filtersApplied) {
    // Only reload if filters were applied
    Inertia.get('/admin/dashboardoverview', {}, {
      preserveState: false,
      replace: true,
    });
  }
  
     
  
};

  const close4=()=>{


    setshowCalendar(false);
  }
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimate(true);
      setTimeout(() => setAnimate(false), 2000);
    }, 9000);

    return () => clearInterval(interval);
  }, []);


  const cards = [
    {
      id: 1,
      color: 'bg-indigo-900',
      icon: faUsers,
      title: 'Total Subjects',
      value: subject,
      footer: 'Total count of overall subjects',
      footerColor: 'text-blue-500',
    },
    {
      id: 2,
      color: 'bg-green-800',
      icon: faUsers,
      title: 'Classes',
      value: class1,
      footer: classfooter,
      footerColor: 'text-blue-500',
    },
    {
      id: 3,
      color: 'bg-yellow-500',
      icon: faUsers,
      title: 'Staffs',
      value: teachers,
      footer: teacherfooter,
      footerColor: 'text-blue-500',
    },
    {
      id: 4,
      color: 'bg-sky-900',
      icon: faUsers,
      title: 'Students',
      value: students,
      footer: studentfooter,
      footerColor: 'text-blue-500',
    },
  ];





  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <header className="sticky top-1 flex w-full items-center border-b bg-white p-4 shadow-sm">
        <p>1</p>
      </header>
      <main className="flex h-full flex-1 flex-col gap-6 p-5 mt-[-20px] bg-gray-200">
        {selectedCard && selectedCard.id === 4 ? (
          <>
          <ViewAllStudents />


            <Button onClick={() => setSelectedCard(null)} className="bg-yellow-500 w-40 h-10 mt-4">
              Back
            </Button>
          </>
        ) : selectedCard && selectedCard.id === 2 ? (
          <>
            <Button className="text-[black] justify-right bg-yellow-500 w-40 h-10 mt-10 text-lg shadow-sm cursor-[pointer] transition-transform duration-900 hover:scale-100  transform scale-90 z-40" onClick={back3}>
              Back
            </Button>
            <ClassIndex
              classes={classData.data.map(c => ({
                ...c,
                studentacademics: c.studentacademics ?? [],
              }))}
            />
          </>
        ) : selectedCard && selectedCard.id === 4 ? (
          <>
            <ViewAllStudents />
            <Button onClick={() => setSelectedCard(null)} className="bg-yellow-500 w-40 h-10 mt-4">
              Back
            </Button>
          </>
        ) :

        selectedCard && selectedCard.id === 1 ? (
          <>
          <Button onClick={() => setSelectedCard(null)} className="bg-yellow-500 w-40 h-10 mt-4">
              Back
            </Button>
            <SubjectIndex subjects={subjects} grades={grades} />
            
          </>
        ) :
        
        
        
        
        showclass  ? (
          addteacher ? (
            <>
              <Button className="text-[black] justify-right bg-yellow-500 w-40 h-10 mt-10 text-lg shadow-sm cursor-[pointer] transition-transform duration-900 hover:scale-100  transform scale-90 z-40" onClick={back1}>
                Back
              </Button>
              <div className="mt-[-100px]">
                {/* <AssignClassTeachers teachers={teacher12} classes={classesGrouped} /> */}
              </div>
            </>
          ) :(
            <>
              <div className="flex">
                <Button className="bg-yellow-500 w-40 h-10 mt-10 text-lg shadow-sm cursor-[pointer] transition-transform duration-900 hover:scale-100  transform scale-90 z-40" onClick={handleBackClick1}>
                  Back
                </Button>
                <Button className="text-[white] justify-right bg-sky-700 w-40 h-10 mt-10 ml-170 text-lg shadow-sm cursor-[pointer] transition-transform duration-900 hover:scale-100  transform scale-90 z-40" onClick={CloseClick2}>
                  Add teacher
                </Button>
                <Button className="text-[white] justify-right bg-amber-700 w-40 h-10 mt-10 text-lg shadow-sm cursor-[pointer] transition-transform duration-900 hover:scale-100  transform scale-90 z-40" onClick={CloseClick2}>
                  Filter
                </Button>
              </div>
              <div className="p-6">
                <div className="overflow-x-auto">
                  <div>
      

      {/* Filter Form */}
      <form onSubmit={handleFilterSubmit} className="mb-4 space-x-4">
        {/* Grade Dropdown */}
        <select
  value={grade}
 onChange={(e) => {
  const val = e.target.value;
  setGrade(val === '' ? '' : parseInt(val, 10));
}}
  className="border p-2 rounded"
>
  <option value="">-- Select Grade --</option>
  {grades.map(g => (
    <option key={g.id} value={g.grade}>{g.grade}</option>
  ))}
</select>

        {/* Section Input */}
        <input
          type="text"
          placeholder="Section"
          value={section}
          onChange={(e) => setSection(e.target.value)}
          className="border p-2 rounded"
        />

        {/* Class Name Input */}
        <input
          type="text"
          placeholder="Class Name"
          value={classname}
          onChange={(e) => setClassName(e.target.value)}
          className="border p-2 rounded"
        />

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Filter
        </button>
      </form>

      {/* Display Filtered Classes */}
      <table className="min-w-full border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-4 py-2">Class ID</th>
            <th className="border px-4 py-2">Class Name</th>
            <th className="border px-4 py-2">Grade</th>
            <th className="border px-4 py-2">Section</th>
            <th className="border px-4 py-2">Teacher NIC</th>
            <th className="border px-4 py-2">Student Count</th>
          </tr>
        </thead>
        <tbody>
          {classData.data.length > 0 ? (
            classData.data.map(c => (
              <tr key={c.class_id} className="hover:bg-yellow-100">
                <td className="border px-4 py-2">{c.class_id}</td>
                <td className="border px-4 py-2">{c.class_name}</td>
                <td className="border px-4 py-2">{c.grade}</td>
                <td className="border px-4 py-2">{c.section}</td>
                <td className="border px-4 py-2">{c.teacher_NIC}</td>
                <td className="border px-4 py-2">{c.studentacademics_count}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} className="text-center py-4 text-gray-500">
                No classes found with the selected filters.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
                </div>
              </div>
            </>
          )
        ) : showForm ? (
          <div className="mt-4">
            <Button className="bg-yellow-500 w-40 h-10 text-lg shadow-sm cursor-[pointer] transition-transform duration-900 hover:scale-100  transform scale-90 z-40" onClick={CloseClick}>
              Back
            </Button>
            <span className="ml-212">Total Teachers</span>
            <div className="mt- ml-250 absolute bg-yellow-500 rounded-full w-30 h-30 flex items-center justify-center text-[#152238] text-2xl font-bold border-14 border-[#152238]">
              {teachers}
            </div>
            {/* <AddTeacherForm /> */}
          </div>
        ) : showStudentForm ? (
          <>
            <div className="jflex justify-left mb-4 mt-10 z-10">
              <Button
                className="bg-yellow-500 w-40 h-10 text-lg shadow-sm cursor-pointer transform scale-90 z-40"
                onClick={CloseClick}
              >
                Back
              </Button>
              <Button
                onClick={() => {
                  console.log("Import Clicked");
                  setImportForm(true);
                }}
                className="bg-green-700 w-40 h-10 text-lg shadow-sm cursor-pointer transform scale-90 z-40"
              >
                Import Students
              </Button>
              <StudentAdmissionForm setShowForm={setShowStudentForm} />
            </div>
          </>
        ) : showSub ? (
          <>





          showclass ? (
            addteacher ? (
              <>
                <Button className="text-[black] justify-right bg-yellow-500 w-40 h-10 mt-10 text-lg shadow-sm cursor-[pointer] transition-transform duration-900 hover:scale-100  transform scale-90 z-40" onClick={back1}>
                  Back
                </Button>
                <div className="mt-[-100px]">
                  <AssignClassTeachers teachers={teacher12} classes={classesGrouped} />
                </div>
              </>
            ) : (
              <>
                <div className="flex">
                  <Button className="bg-yellow-500 w-40 h-10 mt-10 text-lg shadow-sm cursor-[pointer] transition-transform duration-900 hover:scale-100  transform scale-90 z-40" onClick={CloseClick1}>
                    Back
                  </Button>
                  <Button className="text-[white] justify-right bg-sky-700 w-40 h-10 mt-10 ml-170 text-lg shadow-sm cursor-[pointer] transition-transform duration-900 hover:scale-100  transform scale-90 z-40" onClick={CloseClick2}>
                    Add teacher
                  </Button>
                  <Button className="text-[white] justify-right bg-amber-700 w-40 h-10 mt-10 text-lg shadow-sm cursor-[pointer] transition-transform duration-900 hover:scale-100  transform scale-90 z-40" onClick={CloseClick2}>
                    Filter
                  </Button>
                </div>
                <div className="p-6">
                  <div className="overflow-x-auto">
                    <table className="min-w-full border border-sky-900 text-left">
                      <thead className="bg-sky-900 text-[white]">
                        <tr>
                          <th className="border px-4 py-2">Class ID</th>
                          <th className="border px-4 py-2">Class Name</th>
                          <th className="border px-4 py-2">Grade</th>
                          <th className="border px-4 py-2">TeacherNIC</th>
                          <th className="border px-4 py-2">Section</th>
                          <th className="border px-4 py-2">Students</th>
                        </tr>
                      </thead>
                      <tbody>
                        {classData?.data?.length > 0 ? (
                          classData.data.map((c1) => (
                            <tr key={c1.class_id} className="bg-white hover:bg-yellow-100">
                              <td className="border px-4 py-2">{c1.class_id}</td>
                              <td className="border px-4 py-2">{c1.class_name}</td>
                              <td className="border px-4 py-2">{c1.grade}</td>
                              <td className="border px-4 py-2">{c1.teacher_NIC}</td>
                              <td className="border px-4 py-2">{c1.section}</td>
                              <td className="border px-4 py-2">{c1.studentacademics_count}</td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan={6} className="py-4 text-center text-gray-500">
                              No classes available.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </>
            )
          ) : showForm ? (

            <div className="mt-4">
              <Button className="bg-yellow-500 w-40 h-10 text-lg shadow-sm cursor-[pointer] transition-transform duration-900 hover:scale-100  transform scale-90 z-40" onClick={CloseClick}>
                Back
              </Button>
              <span className="ml-212">Total Teachers</span>
              <div className="mt- ml-250 absolute bg-yellow-500 rounded-full w-30 h-30 flex items-center justify-center text-[#152238] text-2xl font-bold border-14 border-[#152238]">
                {teachers}
              </div>
              <AddTeacherForm />
            </div>

          </>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4 bg-gray-200">
              <div className="relative mt-5 h-20 w-77 bg-white p-4 shadow-xl transition-transform duration-900 hover:scale-100 hover:shadow-md text-white flex items-center justify-between transform scale-90 z-40 cursor-pointer" onClick={handleAddTeacherClick}>
                <span className="text-[20px] font-semibold text-yellow-700">Add New Teachers</span>
                <FontAwesomeIcon icon={faPlus} className="text-3xl text-yellow-700" />

          ) : showStudentForm ? (
            <>
              <div className="jflex justify-left mb-4 mt-10 z-10">
                <Button
                  className="bg-yellow-500 w-40 h-10 text-lg shadow-sm cursor-pointer transform scale-90 z-40"
                  onClick={CloseClick}
                >
                  Back
                </Button>
                <Button
                  onClick={() => {
                    console.log("Import Clicked");
                    setImportForm(true);
                  }}
                  className="bg-green-700 w-40 h-10 text-lg shadow-sm cursor-pointer transform scale-90 z-40"
                >
                  Import Students
                </Button>
                <StudentAdmissionForm setShowForm={setShowStudentForm} />

              </div>
            </>
          ) : showSub ? (
            <>
              <div className="mt-4">
                <Button
                  className="bg-yellow-500 w-40 h-10 text-lg shadow-sm cursor-[pointer] transition-transform duration-900 hover:scale-100  transform scale-90 z-40"
                  onClick={CloseClick8}
                >
                  Back
                </Button>
                <AssignTeachersPage />
              </div>
            </>
          ) : (
            <>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4 bg-gray-100">
                <div className="relative mt-5 h-20 w-77 bg-white p-4 shadow-xl transition-transform duration-900 hover:scale-100 hover:shadow-md text-white flex items-center justify-between transform scale-90 z-40 cursor-pointer" onClick={handleAddTeacherClick}>
                  <span className="text-[20px] font-semibold text-yellow-700">Add New Teachers</span>
                  <FontAwesomeIcon icon={faPlus} className="text-3xl text-yellow-700" />
                </div>


              <div className="relative mt-5 h-20 w-77 bg-white p-4 shadow-xl transition transition-transform duration-900 hover:scale-100 hover:shadow-md text-white flex items-center justify-between transform scale-90 z-40 cursor-pointer" onClick={() => router.visit('/admin/dashboardoverview/classpage')}>
       
                <span className="text-[20px] font-semibold text-green-700">Teachers & Classes</span>
                <FontAwesomeIcon icon={faPlus} className="text-3xl text-[green]" />
              </div>

              <div className="relative mt-5 h-20 w-77 bg-white p-4 shadow-xl transition-transform duration-900 hover:scale-100 hover:shadow-md text-white flex items-center justify-between transform scale-90 z-40 cursor-pointer" onClick={() => router.visit('/admin/dashboardoverview/teacher')}>
       
                <span className="text-[20px] font-semibold text-[maroon]">Teacher & Subjects</span>
                <FontAwesomeIcon icon={faPlus} className="text-3xl text-[maroon]" />

                <div className="relative mt-5 h-20 w-77 bg-white p-4 shadow-xl transition-transform duration-900 hover:scale-100 hover:shadow-md text-white flex items-center justify-between transform scale-90 z-40 cursor-pointer" onClick={handleAddStudentClick}>
                  <span className="text-[20px] font-semibold text-blue-900">Add New Students</span>
                  <FontAwesomeIcon icon={faPlus} className="text-3xl text-blue-900" />
                </div>

                <div className="relative mt-5 h-20 w-77 bg-white p-4 shadow-xl transition transition-transform duration-900 hover:scale-100 hover:shadow-md text-white flex items-center justify-between transform scale-90 z-40 cursor-pointer" onClick={handle2}>
                  <span className="text-[20px] font-semibold text-green-700">Teachers & Classes</span>
                  <FontAwesomeIcon icon={faPlus} className="text-3xl text-[green]" />
                </div>

                <div className="relative mt-5 h-20 w-77 bg-white p-4 shadow-xl transition-transform duration-900 hover:scale-100 hover:shadow-md text-white flex items-center justify-between transform scale-90 z-40 cursor-pointer" onClick={handle4}>
                  <span className="text-[20px] font-semibold text-[maroon]">Teacher & Subjects</span>
                  <FontAwesomeIcon icon={faPlus} className="text-3xl text-[maroon]" />
                </div>

              </div>


            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4 bg-gray-200">
              {cards.map((card, index) => (
                <div
                  key={index}
                  className="relative mt-14 ml-5 h-35 w-78 border bg-white p-6 ml-[-10px] shadow-sm transition-transform duration-900 hover:scale-100 hover:shadow-md flex items-center justify-between transform scale-90 z-40 cursor-pointer shadow-xl"
                  onClick={() => handleCardClick(card)}
                >
                  <div className={`absolute z-0 -top-10 left-4 flex h-28 w-28 items-center justify-center text-white shadow-lg ${card.color}`}>
                    <FontAwesomeIcon icon={card.icon} className="text-3xl" />
                  </div>
                  <div className="mt-[-30px] ml-30 pt-8 text-">
                    <p className="text-[19px] text-gray-500">{card.title}</p>
                    <h2 className="mt-1 text-2xl font-bold">{card.value}</h2>
                    <p className={`mt-3 text-[14px] ${card.footerColor}`}>{card.footer}</p>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4 bg-gray-100">
                {cards.map((card, index) => (
                  <div
                    key={index}
                    className="relative mt-14 ml-5 h-35 w-78 border bg-white p-6 ml-[-10px] shadow-sm transition-transform duration-900 hover:scale-100 hover:shadow-md flex items-center justify-between transform scale-90 z-40 cursor-pointer shadow-xl"
                    onClick={() => handleCardClick(card)}
                  >
                    <div className={`absolute z-0 -top-10 left-4 flex h-28 w-28 items-center justify-center text-white shadow-lg ${card.color}`}>
                      <FontAwesomeIcon icon={card.icon} className="text-3xl" />
                    </div>
                    <div className="mt-[-30px] ml-30 pt-8 text-">
                      <p className="text-[16px] text-gray-500">{card.title}</p>
                      <h2 className="mt-1 text-2xl font-bold">{card.value}</h2>
                      <p className={`mt-3 text-[14px] ${card.footerColor}`}>{card.footer}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-6 flex">
                <StudentAdmissionChart />
               
                <div className="relative w-74 h-60 bg-white  shadow-xl ml-22 flex flex-col justify-center items-center p-6">
                  <h1 className="text-xl font-semibold text-gray-800">Yearly Updates</h1>
                  <p className="text-gray-500 text-sm mt-2 text-center">
                    Track and manage yearly academic changes here.
                  </p>

                  <div
                    className={`absolute top-10 right-2 flex items-center gap-1 bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full shadow-lg text-sm font-medium transition-all duration-300 ${animate ? 'animate-bounce' : ''
                      }`}
                  >
                    <Pointer size={50} className="animate-pulse text-xl py-2" />
                    Click here for yearly updates

                  </div>
                </div>
              </div>
               <br/>
                 <StudentPerformanceLineChart />
              <Gallery />
              

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 p-4 bg-white rounded-lg shadow-md">
                {img.data.map(image => (
                  <div key={image.id} className="...">
                    <img src={`/images/${image.path}`} alt={image.title || 'Gallery image'} />
                    {image.title && <p>{image.title}</p>}
                  </div>
                ))}
              </div>


            </>
          )}

        {showImportForm && (
          <div className="fixed top-50 left-80 z-50 flex items-center justify-center">
            <div className="bg-white rounded-lg p-6 shadow-2xl w-full max-w-2xl relative">
              <ImportStudent
                fetchStudents={fetchStudents}
                onClose={() => setImportForm(false)}
              />
            </div>
          </div>
        )}




      </main>
    </AppLayout>
  );
}