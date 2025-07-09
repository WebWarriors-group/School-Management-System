import { Link, usePage } from '@inertiajs/react';
import { User, Book, Users, Award, CalendarCheck, FileText } from 'lucide-react';

export default function StudentSidebar() {
  const { url } = usePage(); // For active link logic if needed

  const navLinks = [
    { label: 'Personal Info', href: '/student/personal', icon: <User size={16} /> },
    { label: 'Academic Info', href: '/student/academic', icon: <Book size={16} /> },
    { label: 'Family Info', href: '/student/family', icon: <Users size={16} /> },
    { label: 'Siblings Info', href: '/student/siblings', icon: <Users size={16} /> },
    { label: 'Scholarships', href: '/student/scholarships', icon: <Award size={16} /> },
    { label: 'Attendance', href: '/student/attendance', icon: <CalendarCheck size={16} /> },
    { label: 'Marks', href: '/student/marks', icon: <FileText size={16} /> },
  ];

  return (
    <nav className="space-y-2">
      {navLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="flex items-center space-x-3 px-4 py-2 rounded hover:bg-yellow-100 transition"
        >
          <div className="text-yellow-600">{link.icon}</div>
          <span className="text-brown-800 font-medium">{link.label}</span>
        </Link>
      ))}
    </nav>
  );
}
