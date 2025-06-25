import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faPlus } from '@fortawesome/free-solid-svg-icons';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { router, usePage } from '@inertiajs/react';
import React, { useEffect, useState } from 'react';
import ImportStudent from "./ImportStudent";
import AddTeacherForm from '@/pages/Teacher/teacherForm';
import StudentAdmissionForm from '@/pages/Student/StudentAdmissionForm';
import StudentAdmissionChart from '@/pages/Student/StudentAdmissionChart';
import ViewAllStudents from '@/pages/Student/ViewAllStudents';
import AssignClassTeachers from '@/pages/Admin/Classpage';
import AssignTeachersPage from '@/pages/Admin/teacher_sub';
import ClassIndex from '@/pages/Admin/ClassCrud';
import { Button } from '@headlessui/react';
import Gallery from '@/pages/Admin/imagegallery';
import CalendarPage from '@/pages/Admin/CalendarPage';

import SubjectIndex from '@/pages/Admin/subject';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: '📊 Dashboard Overview',
    href: '/',
  },
];

interface StudentPersonal {
  full_name_with_initial: string;
  gender: string;
  
  // add any other needed fields
}

interface Student {
  reg_no: string;
  studentpersonal?: StudentPersonal;
}

interface Class {
  class_id: number;
  class_name: string;
  grade: number;
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
  section: string;
  class_name: string;
  teacher_NIC: string;
}

interface Teacher {
  teacher_NIC: string;
}

interface Image{
   title?: string;
        path: string;
        id: number;
}


interface Subject{
   subject_id: number;
        subject_name: string;
       
        
}

interface Grade{
  id:number;
        grade: number;
        subject_id:number;
        subject_type:string;
        
}

interface Props {
  
  filters: {
    grade?: string;
    section?: string;
    class_name?: string;
  };
  teachers:number,
  students:number,
  class1:number,
  subject:number,
  grades:Grade[],
  classfooter:string,
  teacherfooter:string,
  studentfooter:string,
teacher12:Teacher[],

 classData: {
      data: Class[];
    };

    img: {
      data: {
        title?: string;
        path: string;
        id: number;
      }[];
    };


    classes: {
      [class_name: string]: {
        [grade: number]: ClassItem[];
      };
    };

    subjects:Subject[];
   
}

export default function StatsOverviewPage({grades,subjects,classes: classesGrouped,img,classData,teacher12,classfooter,teacherfooter,studentfooter,subject,class1,students ,teachers, filters: initialFilters }: Props) {
  
  const [showForm, setShowForm] = useState(false);
  const [showclass, setClass] = useState(false);
  const [showSub, setSub] = useState(false);
  const [addteacher, setteacher] = useState(false);
   const [showCalendar, setshowCalendar] = useState(false);
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);
  const [showStudentForm, setShowStudentForm] = useState(false);
  const [showImportForm, setImportForm] = useState(false);

  const [Fetchedstudents, setFetchedStudents] = useState<Student[]>([]);
 
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

  const handleCardClick = (card: Card) => {
    setSelectedCard(card); // This will trigger AddForm to be shown
  
  const [filters, setFilters] = useState<{ grade?: string; section?: string; class_name?: string }>(initialFilters || {});

  
  const [filteredClasses, setFilteredClasses] = useState<Class[]>([]);

  
 
 
  const cards = [
    {
      id: 1,
      color: 'bg-yellow-500',
      icon: faUsers,
      title: 'Total Subjects',
      value: subject,
      footer: 'Total count of overall subjects',
      footerColor: 'text-blue-500',
    },
    {
      id: 2,
      color: 'bg-stone-800',
      icon: faUsers,
      title: 'Classes',
      value: class1,
      footer: classfooter,
      footerColor: 'text-blue-500',
    },
    {
      id: 3,
      color: 'bg-stone-500',
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

  
  useEffect(() => {
    setFilteredClasses(classData.data);
  }, [classData.data]);

 
  const handleFilter = () => {
    let filtered = classData.data;

    if (filters.grade && filters.grade !== '') {
      const gradeNumber = Number(filters.grade);
      filtered = filtered.filter(c => c.grade === gradeNumber);
    }

    if (filters.section && filters.section !== '') {
      filtered = filtered.filter(c => c.section === filters.section);
    }

    if (filters.class_name && filters.class_name !== '') {
      filtered = filtered.filter(c => c.class_name === filters.class_name);
    }

    setFilteredClasses(filtered);
  };

  
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
  };
  const CloseClick8 = () => {
    setSub(false);
  };

  const CloseClick2 = () => {
    setteacher(true);
  };

  const back1 = () => {
    setteacher(false);
  }
  const back3 = () => {
    setSelectedCard(null);
  }
  const close4=()=>{
    setshowCalendar(false);
  }
  


  const {
    teachers,
    students,
    class1,
    classfooter,
    teacherfooter,
    studentfooter,
    subject,
    classData,
    teacher12,
    classes,
    classstudent

  } = usePage<{
    teachers: number;
    students: number;
    class1: number;
    classfooter: string;
    teacherfooter: string;
    studentfooter: string;
    subject: number;
    classData: {
      data: {
        class_id: number;
        class_name: string;
        grade: number;
        section: string;
        studentacademics_count: number;
        teacher_NIC: string;
        studentacademics?: Student[];
      }[];
    };

    teacher12: {
      teacher_NIC: string;

    }[];
    classes: {
      [class_name: string]: {
        [grade: number]: ClassItem[]; // sections only
      }
    };
  }>().props;



  const cards = [
    {
      id: 1,
      color: 'bg-yellow-500',
      icon: faUsers,
      title: 'Total Subjects',
      value: subject,
      footer: 'Total count of overall subjects',
      footerColor: 'text-gray-400',
    },
    {
      id: 2,
      color: 'bg-stone-800',
      icon: faUsers,
      title: 'Classes',
      value: class1,
      footer: classfooter,
      footerColor: 'text-gray-400',
    },
    {
      id: 3,
      color: 'bg-stone-500',
      icon: faUsers,
      title: 'Staffs',
      value: teachers,
      footer: teacherfooter,
      footerColor: 'text-gray-400',
    },
    {
      id: 4,
      color: 'bg-sky-900',
      icon: faUsers,
      title: 'Students',
      value: students,
      footer: studentfooter,
      footerColor: 'text-gray-400',
    },

  ];

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <header className="sticky top-1 flex w-full items-center border-b bg-white p-4 shadow-sm ">
        {/* <h5 className="text-maroon text-xl ">Admin dashboard</h5> */}
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
        ) :

          selectedCard && selectedCard.id === 2 ? (
            <> <Button className="text-[black] justify-right bg-yellow-500 w-40 h-10 mt-10 text-lg shadow-sm cursor-[pointer] transition-transform duration-900 hover:scale-100  transform scale-90 z-40" onClick={back3}>Back</Button>

              <ClassIndex
                classes={classData.data.map(c => ({
                  ...c,
                  studentacademics: c.studentacademics ?? [],  // default empty array
                }))}
              />
            </>
          ) :
            showclass ? (

              addteacher ? (
                <>
                  <Button className="text-[black] justify-right bg-yellow-500 w-40 h-10 mt-10 text-lg shadow-sm cursor-[pointer] transition-transform duration-900 hover:scale-100  transform scale-90 z-40" onClick={back1}>Back</Button>
                  <div className="mt-[-100px]">


                    <AssignClassTeachers teachers={teacher12} classes={classes} /></div> </>
              ) : (


                <>
                  <div className="flex ">
                    <Button className="bg-yellow-500 w-40 h-10 mt-10 text-lg shadow-sm cursor-[pointer] transition-transform duration-900 hover:scale-100  transform scale-90 z-40" onClick={CloseClick1}>Back</Button>

                    <Button className="text-[white] justify-right bg-sky-700 w-40 h-10 mt-10 ml-170 text-lg shadow-sm cursor-[pointer] transition-transform duration-900 hover:scale-100  transform scale-90 z-40" onClick={CloseClick2}>Add teacher</Button>
                    <Button className="text-[white] justify-right bg-amber-700 w-40 h-10 mt-10 text-lg shadow-sm cursor-[pointer] transition-transform duration-900 hover:scale-100  transform scale-90 z-40" onClick={CloseClick2}>Filter</Button>
                  </div>
                  <div className="p-6">




                    <div className="overflow-x-auto">
                      <table className="min-w-full border border-sky-900 text-left ">
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
                              <tr key={c1.class_id} className=" bg-white hover:bg-yellow-100">
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
                              <td colSpan={5} className="py-4 text-center text-gray-500">
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
            ) :

              showForm ? (
                <div className="mt-4">

                  <Button className="bg-yellow-500 w-40 h-10 text-lg shadow-sm cursor-[pointer] transition-transform duration-900 hover:scale-100  transform scale-90 z-40" onClick={CloseClick}>Back</Button>
                  <span className="ml-212 ">Total Teachers</span>
                  <div className="mt- ml-250 absolute bg-yellow-500 rounded-full w-30 h-30 flex items-center justify-center text-[#152238] text-2xl font-bold border-14 border-[#152238]">
                    {teachers}
                  </div>

                  <AddTeacherForm />
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
                        setImportForm(true)
                      }}
                      className="bg-green-700 w-40 h-10 text-lg shadow-sm cursor-pointer transform scale-90 z-40"
                    >
                      Import Students
                    </Button>



                    <StudentAdmissionForm setShowForm={setShowStudentForm} /> </div>
                </>
              ) : (
                <>
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4 bg-gray-200">

                    <div className="relative mt-10  h-18 w-80 bg-white p-4 shadow-sm transition-transform duration-900 hover:scale-100 hover:shadow-md text-white flex items-center justify-between transform scale-90 z-40 cursor-pointer" onClick={handleAddTeacherClick}>

                      <span className="text-[20px] font-semibold text-yellow-700" >Add New Teachers</span>
                      <FontAwesomeIcon icon={faPlus} className="text-3xl text-yellow-700" />
                    </div>

                    <div className="relative mt-10  h-18 w-80 bg-white p-4 shadow-sm transition-transform duration-900 hover:scale-100 hover:shadow-md text-white flex items-center justify-between transform scale-90 z-40 cursor-pointer" onClick={handleAddStudentClick}>
                      <span className="text-[20px] font-semibold text-blue-900">Add New Students</span>
                      <FontAwesomeIcon icon={faPlus} className="text-3xl text-blue-900" />
                    </div>

                    <div className="relative mt-10  h-18 w-80 bg-white p-4 shadow-sm transition transition-transform duration-900 hover:scale-100 hover:shadow-md text-white flex items-center justify-between transform scale-90 z-40 cursor-pointer">
                      <span className="text-[20px] font-semibold text-green-700" onClick={handle2}> Teachers  &  Classes</span>
                      <FontAwesomeIcon icon={faPlus} className="text-3xl text-[green]" />
                    </div>

                    <div className="relative mt-10  h-16 w-80 bg-white p-4 shadow-sm transition-transform duration-900 hover:scale-100 hover:shadow-md text-white flex items-center justify-between transform scale-90 z-40 cursor-pointer">
                      <span className="text-[20px] font-semibold text-[maroon]">Add Study Materials</span>
                      <FontAwesomeIcon icon={faPlus} className="text-3xl text-[maroon]" />
                    </div>


                  </div>


        

                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4 bg-gray-200">



                    {cards.map((card, index) => (
                      <div key={index} className="relative mt-10 ml-5 h-35 w-78 border bg-white p-6 ml-[-10px] shadow-sm transition-transform duration-900 hover:scale-100 hover:shadow-md  flex items-center justify-between transform scale-90 z-40 cursor-pointer"
                        onClick={() => handleCardClick(card)}>
                        {/* Colored square icon */}
                        <div
                          className={`absolute z-0 -top-10 left-4 flex h-28 w-28 items-center justify-center text-white shadow-lg ${card.color}`}
                        >
                          <FontAwesomeIcon icon={card.icon} className="text-3xl" />
                        </div>

                        {/* Push content down to make space for the icon box */}
                        <div className="mt-[-55px] ml-30 pt-8 text-">
                          <p className="text-[16px] text-gray-500">{card.title}</p>
                          <h2 className="mt-1 text-2xl font-bold">{card.value}</h2>
                          <p className={`mt-3 text-[14px] ${card.footerColor}`}>{card.footer}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}




      </main>
            

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
 <div className="p-6">
        <StudentAdmissionChart />
       
      </div>

        ):selectedCard && selectedCard.id === 2 ? (
          <>
            <Button
              className="text-[black] justify-right bg-yellow-500 w-40 h-10 mt-10 text-lg shadow-sm cursor-[pointer] transition-transform duration-900 hover:scale-100  transform scale-90 z-40"
              onClick={back3}
            >
              Back
            </Button>

            <ClassIndex
              classes={classData.data.map(c => ({
                ...c,
                studentacademics: c.studentacademics ?? [], // default empty array
              }))}
            />
          </>
        ) : showclass ? addteacher ? (
          <>
            <Button
              className="text-[black] justify-right bg-yellow-500 w-40 h-10 mt-10 text-lg shadow-sm cursor-[pointer] transition-transform duration-900 hover:scale-100  transform scale-90 z-40"
              onClick={back1}
            >
              Back
            </Button>
            <div className="mt-[-100px]">
              <AssignClassTeachers teachers={teacher12} classes={classesGrouped} />
            </div>
          </>
        ) : (
          <>
            <div className="">
              <Button
                className="bg-yellow-500 w-40 h-10 mt-10 text-lg shadow-sm cursor-[pointer] transition-transform duration-900 hover:scale-100  transform scale-90 z-40"
                onClick={CloseClick1}
              >
                Back
              </Button>

              <Button
                className="text-[white] justify-right bg-sky-700 w-40 h-10 mt-10 ml-190 text-lg shadow-sm cursor-[pointer] transition-transform duration-900 hover:scale-100  transform scale-90 z-40"
                onClick={CloseClick2}
              >
                Add teacher
              </Button>
              <div className=" flex flex-wrap gap-3 mb-6 ml-60 bg-white w-140 py-10 justify-center">
                <select
                  className="border px-3 py-2 rounded bg-white"
                  value={filters.grade}
                  onChange={e => setFilters({ ...filters, grade: e.target.value })}
                >
                  <option value="">All Grades</option>
                  {[...Array(8)].map((_, i) => {
                    const grade = i + 6;
                    return (
                      <option key={grade} value={grade}>
                        {grade}
                      </option>
                    );
                  })}
                </select>

                <select
                  className="border px-3 py-2 rounded bg-white"
                  value={filters.section}
                  onChange={e => setFilters({ ...filters, section: e.target.value })}
                >
                  <option value="">All Sections</option>
                  <option value="A">A</option>
                  <option value="B">B</option>
                </select>

                <select
                  className="border px-3 py-2 rounded bg-white"
                  value={filters.class_name}
                  onChange={e => setFilters({ ...filters, class_name: e.target.value })}
                >
                  <option value="">All Class Types</option>
                  <option value="junior">Junior</option>
                  <option value="O/L">O/L</option>
                  <option value="A/L">A/L</option>
                </select>

                <button
                  onClick={handleFilter}
                  className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                  Filter
                </button>
              </div>
              <div className="p-8 bg-white">
                <div className="overflow-x-auto bg-white">
                  <table className="min-w-full border border-sky-900 text-left py-10 bg-white">
                    <thead className="bg-sky-900 text-[white]">
                      <tr>
                        <th className="border px-4 py-2">Class ID</th>
                        <th className="border px-4 py-2">Class Name</th>
                        <th className="border px-4 py-2">Grade</th>
                        <th className="border px-4 py-2">Section</th>
                        <th className="border px-4 py-2">TeacherNIC</th>
                        <th className="border px-4 py-2">Student</th>
                      </tr>
                    </thead>

                    <tbody className="bg-white py-10">
                      {filteredClasses.map(c1 => (
                        <tr
                          key={c1.class_id}
                          className="border-t hover:bg-gray-50 cursor-pointer bg-white"
                        >
                          <td className="p-2 border">{c1.class_id}</td>
                          <td className="p-2 border">{c1.class_name}</td>
                          <td className="p-2 border">{c1.grade}</td>
                          <td className="p-2 border">{c1.section}</td>
                          <td className="p-2 border">{c1.teacher_NIC || '-'}</td>
                          <td className="p-2 border">{c1.studentacademics_count}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </>
        ) : showForm ? (
          <div className="mt-4">
            <Button
              className="bg-yellow-500 w-40 h-10 text-lg shadow-sm cursor-[pointer] transition-transform duration-900 hover:scale-100  transform scale-90 z-40"
              onClick={CloseClick}
            >
              Back
            </Button>
            <span className="ml-212 ">Total Teachers</span>
            <div className="mt- ml-250 absolute bg-yellow-500 rounded-full w-30 h-30 flex items-center justify-center text-[#152238] text-2xl font-bold border-14 border-[#152238]">
              {teachers}
            </div>

            <AddTeacherForm />
          </div>


) : showSub ? (
  <>
  <div className="mt-4">
 <Button
              className="bg-yellow-500 w-40 h-10 text-lg shadow-sm cursor-[pointer] transition-transform duration-900 hover:scale-100  transform scale-90 z-40"
              onClick={CloseClick8}
            >
              Back
            </Button>

  <AssignTeachersPage/>
  </div>
  </>
)

        : (
          <>
          
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4 bg-gray-1g00">
              <div
                className="relative mt-5 h-20 w-77 bg-white p-4 shadow-xl transition-transform duration-900 hover:scale-100 hover:shadow-md text-white flex items-center justify-between transform scale-90 z-40 cursor-pointer"
                onClick={handleAddTeacherClick}
              >
                <span className="text-[20px] font-semibold text-yellow-700">
                  Add New Teachers
                </span>
                <FontAwesomeIcon icon={faPlus} className="text-3xl text-yellow-700 " />
              </div>

              <div className="relative mt-5  h-20 w-77 bg-white p-4 shadow-xl transition-transform duration-900 hover:scale-100 hover:shadow-md text-white flex items-center justify-between transform scale-90 z-40 cursor-pointer">
                <span className="text-[20px] font-semibold text-blue-900">Add New Students</span>
                <FontAwesomeIcon icon={faPlus} className="text-3xl text-blue-900" />
              </div>

              <div
                className="relative mt-5  h-20 w-77 bg-white p-4 shadow-xl transition transition-transform duration-900 hover:scale-100 hover:shadow-md text-white flex items-center justify-between transform scale-90 z-40 cursor-pointer"
                onClick={handle2}
              >
                <span className="text-[20px] font-semibold text-green-700"> Teachers  &  Classes</span>
                <FontAwesomeIcon icon={faPlus} className="text-3xl text-[green]" />
              </div>

              <div className="relative mt-5  h-20 w-77 bg-white p-4 shadow-xl transition-transform duration-900 hover:scale-100 hover:shadow-md text-white flex items-center justify-between transform scale-90 z-40 cursor-pointer"
              onClick={handle4}>
                <span className="text-[20px] font-semibold text-[maroon]">Teacher & Subjects</span>
                <FontAwesomeIcon icon={faPlus} className="text-3xl text-[maroon]" />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4 bg-gray-100 ">
              {cards.map((card, index) => (
                <div
                  key={index}
                  className="relative mt-14 ml-5 h-35 w-78 border bg-white p-6 ml-[-10px] shadow-sm transition-transform duration-900 hover:scale-100 hover:shadow-md  flex items-center justify-between transform scale-90 z-40 cursor-pointer  shadow-xl"
                  onClick={() => handleCardClick(card)}
                >
                 
                  <div
                    className={`absolute z-0 -top-10 left-4 flex h-28 w-28 items-center justify-center text-white shadow-lg ${card.color}`}
                  >
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
      </main>
    </AppLayout>

  );
}
