
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers,faPlus } from '@fortawesome/free-solid-svg-icons';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { usePage } from '@inertiajs/react';
import React, { useState } from 'react';
import AddTeacherForm from '@/pages/Teacher/teacherForm';
import AssignClassTeachers from '@/pages/Admin/Classpage';
import ClassIndex from '@/pages/Admin/ClassCrud';
import { Button } from '@headlessui/react';
import { useForm } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';



const breadcrumbs: BreadcrumbItem[] = [
  {
    title: '📊 Dashboard Overview',
    href: '/',
  },
];
interface Student {
  reg_no: string;
}

interface StudentAcademic {
  student: Student;
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

interface ImageForm {
  id?: number; // optional
  title: string;
  image: File | null;
  [key: string]: any; // make it flexible
}

interface Props {
  images: {
    data: ImageForm[];
  };
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
  grade:number;
  section: string;
  class_name: string;
  teacher_NIC: string;
}

interface Teacher {
  teacher_NIC: string;
}




export default function StatsOverviewPage() {
  const [showForm, setShowForm] = useState(false);
  const [showclass, setClass] = useState(false);
  const [addteacher, setteacher] = useState(false);
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);


 const [title, setTitle] = useState('');
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState('');
  const [preview, setPreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      setPreview(URL.createObjectURL(file));
    } else {
      setPreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !image) {
      setMessage('Please provide a title and select an image.');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('image', image);

    try {
      const response = await fetch('/images', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setMessage('Image uploaded successfully!');
        setTitle('');
        setImage(null);
        setPreview(null);
      } else {
        const errorData = await response.json();
        setMessage('Upload failed: ' + (errorData.message || 'Unknown error'));
      }
    } 
  };

const handleCardClick = (card:Card) => {
  setSelectedCard(card); // This will trigger AddForm to be shown
};

  const handleAddTeacherClick = () => {
    setShowForm(true);
  };
    const CloseClick = () => {
    setShowForm(false);
  };

  const handle2=()=>{
    setClass(true);
  }
  const CloseClick1=()=>{
    setClass(false);
  }

  const CloseClick2=()=>{
    setteacher(true);
  }

  const back1=()=>{
    setteacher(false);
  }
  const back3=()=>{
    setSelectedCard(null);
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
  img,
  
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
      studentacademics_count:number;
      teacher_NIC: string;
      studentacademics?: Student[];
    }[];
  };
  
  teacher12: {
    teacher_NIC: string;
    
  }[];

  img:{
data:{
  title:string,
  path:string,
  id:number
}[]
  }
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

  {selectedCard && selectedCard.id === 2 ? (
    <> <Button className="text-[black] justify-right bg-yellow-500 w-40 h-10 mt-10 text-lg shadow-sm cursor-[pointer] transition-transform duration-900 hover:scale-100  transform scale-90 z-40" onClick={back3}>Back</Button>
    
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
):
  showForm ?  (
        <div className="mt-4">
         
         <Button className="bg-yellow-500 w-40 h-10 text-lg shadow-sm cursor-[pointer] transition-transform duration-900 hover:scale-100  transform scale-90 z-40" onClick={CloseClick}>Back</Button>
         <span className="ml-212 ">Total Teachers</span>
        <div className="mt- ml-250 absolute bg-yellow-500 rounded-full w-30 h-30 flex items-center justify-center text-[#152238] text-2xl font-bold border-14 border-[#152238]">
  {teachers}
</div>

          <AddTeacherForm />
        </div>

  ) : (
      <>
   <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4 bg-gray-200">

   <div className="relative mt-10  h-18 w-80 bg-white p-4 shadow-sm transition-transform duration-900 hover:scale-100 hover:shadow-md text-white flex items-center justify-between transform scale-90 z-40 cursor-pointer" onClick={ handleAddTeacherClick}>
  
  <span className="text-[20px] font-semibold text-yellow-700" >Add New Teachers</span>
  <FontAwesomeIcon icon={faPlus} className="text-3xl text-yellow-700" />
</div>
           
                                     <div className="relative mt-10  h-18 w-80 bg-white p-4 shadow-sm transition-transform duration-900 hover:scale-100 hover:shadow-md text-white flex items-center justify-between transform scale-90 z-40 cursor-pointer">
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



 <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Upload Image</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <label className="block mb-2 font-medium" htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          className="w-full border rounded px-3 py-2 mb-4"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        />

        <label className="block mb-2 font-medium" htmlFor="image">Select Image</label>
        <input
          id="image"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          required
        />

        {preview && (
          <img src={preview} alt="Preview" className="mt-4 mb-4 max-h-48 object-contain" />
        )}

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mt-2"
        >
          Upload
        </button>
      </form>

      {message && (
        <p className="mt-4 text-center text-red-600">{message}</p>
      )}
    </div>



    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 p-4 bg-white rounded-lg shadow-md">
  {img.data.map((image) => (
  <div key={image.id} className="...">
    <img src={`/storage/${image.path}`} alt={image.title || 'Gallery image'} />
    {image.title && <p>{image.title}</p>}
  </div>
))}
</div>
    
                        </main>

    </AppLayout>
  );
}
