import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faPlus } from '@fortawesome/free-solid-svg-icons';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { usePage, router } from '@inertiajs/react';
import React, { useState, useEffect } from 'react';
import AddTeacherForm from '@/pages/Teacher/teacherForm';
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
  const [showSubjects, setShowSubjects] = useState(false);
 // const backSubjects = () => setShowSubjects(false);


  
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

const handleCardClick = (card:Card) => {
 if (card.id === 1) {
    setShowSubjects(true); // instead of router.visit
  } else {
    setSelectedCard(card);
  }
};
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

  const CloseClick = () => {
    setShowForm(false);
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
  const back3=()=>{
    setSelectedCard(null);
  }

   const back4=()=>{
    setShowSubjects(false);
  }


   
  
  

 

  const handle10=()=>{
    setshowCalendar(true);
  }
  

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <header className="sticky top-1 flex w-full items-center border-b bg-white p-4 shadow-sm ">
                {/* <h5 className="text-maroon text-xl ">Admin dashboard</h5> */}

                
                   
                <p>1</p>
            </header>
 <main className="flex h-full flex-1 flex-col gap-6 p-5 mt-[-20px] bg-gray-200">
  {/* ✅ SubjectIndex View */}
        {showSubjects ? (
          <>
            <Button className="text-[black] justify-right bg-yellow-500 w-40 h-10 mt-10 text-lg shadow-sm cursor-[pointer] transition-transform duration-900 hover:scale-100  transform scale-90 z-40" onClick={back4}>Back</Button>
    
            <SubjectIndex subjects={subjects} />

          </>

         ) : selectedCard && selectedCard.id === 2 ? (
    <> 
    <Button className="text-[black] justify-right bg-yellow-500 w-40 h-10 mt-10 text-lg shadow-sm cursor-[pointer] transition-transform duration-900 hover:scale-100  transform scale-90 z-40" onClick={back3}>Back</Button>
    
      <ClassIndex
  classes={classData.data.map(c => ({
    ...c,
    studentacademics: c.studentacademics ?? [],  // default empty array
  }))}
/>
      </>
    ) : 
showclass ?  (

  addteacher ? (
    <>
     <Button className="text-[black] justify-right bg-yellow-500 w-40 h-10 mt-10 text-lg shadow-sm cursor-[pointer] transition-transform duration-900 hover:scale-100  transform scale-90 z-40" onClick={back1}>Back</Button>
      <div className="mt-[-100px]">
       
       
       <p className="bg-white text-white"> ghdopgkb</p>
      </header>
      <main className="flex h-full flex-1 flex-col gap-6 p-5 mt-[-20px] bg-gray-100">
        {selectedCard && selectedCard.id === 1?(

<div>
   <Button
              className="text-[black] justify-right bg-yellow-500 w-40 h-10 mt-10 text-lg shadow-sm cursor-[pointer] transition-transform duration-900 hover:scale-100  transform scale-90 z-40"
              onClick={back3}
            >
              Back
            </Button>
  <SubjectIndex subjects={subjects} grades={grades}/> 
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
) : showCalendar? (

<>
  <div className="mt-4 bg">
 <Button
              className="bg-yellow-500 w-40 h-10 text-lg shadow-sm cursor-[pointer] transition-transform duration-900 hover:scale-100  transform scale-90 z-40"
              onClick={CloseClick8}
            >
              Back
            </Button>

<CalendarPage/>
  </div>
  </>

        ) : (
          <>
          <Button
              className="text-[black] justify-right bg-yellow-500 w-45 h-10 mt-10  text-lg shadow-sm cursor-[pointer] transition-transform duration-900 hover:scale-100  transform scale-90 z-40"
              onClick={handle10}
            >
              Events' Calendar
            </Button>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4 bg-gray-1g00">
              <div
                className="relative mt-5 h-18 w-80 bg-white p-4 shadow-xl transition-transform duration-900 hover:scale-100 hover:shadow-md text-white flex items-center justify-between transform scale-90 z-40 cursor-pointer"
                onClick={handleAddTeacherClick}
              >
                <span className="text-[20px] font-semibold text-yellow-700">
                  Add New Teachers
                </span>
                <FontAwesomeIcon icon={faPlus} className="text-3xl text-yellow-700 " />
              </div>

              <div className="relative mt-5  h-18 w-80 bg-white p-4 shadow-xl transition-transform duration-900 hover:scale-100 hover:shadow-md text-white flex items-center justify-between transform scale-90 z-40 cursor-pointer">
                <span className="text-[20px] font-semibold text-blue-900">Add New Students</span>
                <FontAwesomeIcon icon={faPlus} className="text-3xl text-blue-900" />
              </div>

              <div
                className="relative mt-5  h-18 w-80 bg-white p-4 shadow-xl transition transition-transform duration-900 hover:scale-100 hover:shadow-md text-white flex items-center justify-between transform scale-90 z-40 cursor-pointer"
                onClick={handle2}
              >
                <span className="text-[20px] font-semibold text-green-700"> Teachers  &  Classes</span>
                <FontAwesomeIcon icon={faPlus} className="text-3xl text-[green]" />
              </div>

              <div className="relative mt-5  h-16 w-80 bg-white p-4 shadow-xl transition-transform duration-900 hover:scale-100 hover:shadow-md text-white flex items-center justify-between transform scale-90 z-40 cursor-pointer"
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
