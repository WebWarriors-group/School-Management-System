
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers,faPlus } from '@fortawesome/free-solid-svg-icons';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { usePage } from '@inertiajs/react';


const breadcrumbs: BreadcrumbItem[] = [
  {
    title: '📊 Dashboard Overview',
    href: '/',
  },
];

export default function StatsOverviewPage() {


   const {  teachers, students, class1,classfooter,teacherfooter,studentfooter,subject } = usePage<{
         
          
  
        teachers: number;
          students: number;
          class1: number;
          classfooter:string;
          teacherfooter:string;
          studentfooter:string;
          subject:number
      }>().props;


      const cards = [
  {
    color: 'bg-yellow-500',
    icon: faUsers,
    title: 'Total Subjects',
    value: subject,
    footer: 'Total count of overall subjects',
    footerColor: 'text-gray-400',
  },
  {
    color: 'bg-stone-800',
    icon: faUsers,
    title: 'Classes',
    value: class1,
    footer: classfooter,
    footerColor: 'text-gray-400',
  },
  {
    color: 'bg-stone-500',
    icon: faUsers,
    title: 'Staffs',
    value: teachers,
    footer: teacherfooter,
    footerColor: 'text-gray-400',
  },
  {
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
  
   <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4 bg-gray-200">

   <div className="relative mt-10  h-18 w-80 bg-white p-4 shadow-sm transition-transform duration-900 hover:scale-100 hover:shadow-md text-white flex items-center justify-between transform scale-90 z-40 cursor-pointer">
  
  <span className="text-[20px] font-semibold text-yellow-700">Add New Teachers</span>
  <FontAwesomeIcon icon={faPlus} className="text-3xl text-yellow-700" />
</div>
           
                                     <div className="relative mt-10  h-18 w-80 bg-white p-4 shadow-sm transition-transform duration-900 hover:scale-100 hover:shadow-md text-white flex items-center justify-between transform scale-90 z-40 cursor-pointer">
  <span className="text-[20px] font-semibold text-blue-900">Add New Students</span>
  <FontAwesomeIcon icon={faPlus} className="text-3xl text-blue-900" />
</div>

                                  <div className="relative mt-10  h-18 w-80 bg-white p-4 shadow-sm transition transition-transform duration-900 hover:scale-100 hover:shadow-md text-white flex items-center justify-between transform scale-90 z-40 cursor-pointer">
  <span className="text-[20px] font-semibold text-green-700"> Teachers  &  Classes</span>
  <FontAwesomeIcon icon={faPlus} className="text-3xl text-[green]" />
</div>

 <div className="relative mt-10  h-16 w-80 bg-white p-4 shadow-sm transition-transform duration-900 hover:scale-100 hover:shadow-md text-white flex items-center justify-between transform scale-90 z-40 cursor-pointer">
  <span className="text-[20px] font-semibold text-[maroon]">Add Study Materials</span>
  <FontAwesomeIcon icon={faPlus} className="text-3xl text-[maroon]" />
</div>


 </div>

                                   
                                  
                                
       <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4 bg-gray-200">

 

                            {cards.map((card, index) => (
                                <div key={index} className="relative mt-10 ml-5 h-35 w-78 border bg-white p-6 ml-[-10px] shadow-sm transition-transform duration-900 hover:scale-100 hover:shadow-md  flex items-center justify-between transform scale-90 z-40 cursor-pointer">
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
                        </main>

    </AppLayout>
  );
}
