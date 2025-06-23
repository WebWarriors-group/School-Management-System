
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
import { router } from '@inertiajs/react'
import { useForm } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';



const breadcrumbs: BreadcrumbItem[] = [
  {
    title: '📊 Dashboard Overview',
    href: '/',
  },
];
interface Image {
  id: number;
  title?: string;
  path: string;
}

interface GalleryProps {
  img: { data: Image[] };
}














export default function Gallery() {
  


 const [title, setTitle] = useState('');
  const [image, setImage] = useState<File | null>(null);

  // Submit handler for image upload
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !image) {
      alert("Please provide a title and select an image.");
      return;
    }
    const formData = new FormData();
    formData.append('title', title);
    formData.append('image', image);

    // Send POST request to your Laravel route (adjust URL if needed)
    Inertia.post('/image', formData, {
      onSuccess: () => {
        setTitle('');
        setImage(null);
      },
      onError: (errors) => {
        console.log(errors);
      },
    });
  };



  



  



      
  
  return (
    <>
         

     
         
     
                                  


<div className="max-w-md mx-auto bg-white p-6 mt-10 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Upload Image</h2>
      <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-10">
        <div className="mb-4">
          <label className="block mb-1 text-gray-700">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 text-gray-700">Image</label>
          <input
            type="file"
            onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
            accept="image/*"
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Upload
        </button>
      </form>
    </div>




    
    
                       </>

   
  );
}
