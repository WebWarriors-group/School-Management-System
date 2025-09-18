import AppLayout from '@/layouts/app-layout';
import { Head, Link, usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { PageProps as InertiaPageProps } from '@inertiajs/core';
import RealTimeChatBot from './RealTimeChatBot';
import {
  Facebook, Mail, MapPin, Menu, X,
  User, Book, Users, Award, CalendarCheck,
  FileText, Home, ClipboardList, BarChart2,
  Bell, MessageSquare, Settings, LogOut, Sun, Moon, Search,
  Component
} from 'lucide-react';
import { NavUser } from '@/components/nav-user';
import StudentOverallPerformanceChart from "./StudentOverallPerformanceChart";
import StudentPerformanceChart from './OneStudentPerformanceChart';
import SummaryCard from './SummaryCard';
import CalendarView from './CalenderView';
import { Dialog } from '@headlessui/react';
import DailyQuote from './DailyQuote';

const breadcrumbs = [
  { title: 'Student Dashboard', href: '/dashboard' },
];

// Add new interfaces for academic features
interface GradeRecord {
  id: string;
  subject: string;
  assessment_type: 'assignment' | 'quiz' | 'exam' | 'project';
  title: string;
  marks_obtained: number;
  max_marks: number;
  grade: string;
  date: string;
  teacher_comments?: string;
}

interface TeacherFeedback {
  id: string;
  assessment_id: string;
  assessment_title: string;
  subject: string;
  teacher_name: string;
  feedback: string;
  date: string;
}

interface AttendanceData {
  overall_percentage: number;
  monthly_data: {
    month: string;
    present_days: number;
    total_days: number;
    percentage: number;
  }[];
  recent_absences: {
    date: string;
    reason?: string;
  }[];
}

interface DashboardPageProps extends InertiaPageProps {
  auth: {
    user: any;
  };
  student: any;
  errors?: any;
  deferred?: Record<string, string[] | undefined> | undefined;
}

interface DashboardData {
  classes: any[];
  upcomingExams: any[];
  latestGrades: { marks_obtained: number }[];
  feeStatus?: { status: string };
  scholarship?: { status: string };
  monthlyMarks: { month: number; avg_marks: number }[];
  // Add new properties for academic features
  grades?: GradeRecord[];
  attendance?: AttendanceData;
  teacherFeedback?: TeacherFeedback[];
}

export default function StudentDashboard() {
  const user = usePage().props.auth.user;
  const { student } = usePage().props as DashboardPageProps;
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("theme");
      if (stored === "dark") {
        setDarkMode(true);
      }
    } catch { }
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  // Update initial data with new features
  const [data, setData] = useState<DashboardData | null>({
    classes: [{ name: "10A" }],
    upcomingExams: [],
    latestGrades: [{ marks_obtained: 88 }],
    feeStatus: { status: "Paid" },
    scholarship: { status: "Eligible" },
    monthlyMarks: [
      { month: 1, avg_marks: 85 },
      { month: 2, avg_marks: 88 },
      { month: 3, avg_marks: 82 }
    ],
    // Add mock data for new features
    grades: [
      {
        id: '1',
        subject: 'Mathematics',
        assessment_type: 'exam',
        title: 'Midterm Exam',
        marks_obtained: 85,
        max_marks: 100,
        grade: 'B',
        date: '2023-06-15',
        teacher_comments: 'Good understanding of concepts, but need to improve problem-solving speed.'
      },
      {
        id: '2',
        subject: 'Science',
        assessment_type: 'project',
        title: 'Science Project',
        marks_obtained: 92,
        max_marks: 100,
        grade: 'A',
        date: '2023-06-10',
        teacher_comments: 'Excellent research and presentation skills.'
      },
      {
        id: '3',
        subject: 'English',
        assessment_type: 'assignment',
        title: 'Essay Writing',
        marks_obtained: 78,
        max_marks: 100,
        grade: 'C',
        date: '2023-06-05',
        teacher_comments: 'Good content, but needs improvement in grammar and structure.'
      }
    ],
    attendance: {
      overall_percentage: 96,
      monthly_data: [
        { month: 'January', present_days: 20, total_days: 22, percentage: 91 },
        { month: 'February', present_days: 18, total_days: 20, percentage: 90 },
        { month: 'March', present_days: 22, total_days: 22, percentage: 100 }
      ],
      recent_absences: [
        { date: '2023-03-15', reason: 'Medical' },
        { date: '2023-02-10', reason: 'Family event' }
      ]
    },
    teacherFeedback: [
      {
        id: '1',
        assessment_id: 'a1',
        assessment_title: 'Science Project',
        subject: 'Science',
        teacher_name: 'Ms. Silva',
        feedback: 'Excellent work on the research component. Your presentation was clear and well-organized.',
        date: '2023-06-15'
      },
      {
        id: '2',
        assessment_id: 'a2',
        assessment_title: 'Math Quiz 3',
        subject: 'Mathematics',
        teacher_name: 'Mr. Perera',
        feedback: 'Good understanding of concepts, but need to work on showing your work step-by-step.',
        date: '2023-06-10'
      }
    ]
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [attendanceModalOpen, setAttendanceModalOpen] = useState(false);

  // Filters for performance chart
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedExamType, setSelectedExamType] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [coursesOpen, setCoursesOpen] = useState(false);
  const [subjects, setSubjects] = useState<any[]>([]);
  const [subjectsLoading, setSubjectsLoading] = useState(false);
  const [subjectsError, setSubjectsError] = useState<string | null>(null);
  const [subjectsQuery, setSubjectsQuery] = useState("");

  // State for grade tracking
  const [gradeFilter, setGradeFilter] = useState<string>('all');
  const [subjectFilter, setSubjectFilter] = useState<string>('all');

  const notifications = [
    { id: 1, title: 'Science Assignment', description: 'Due tomorrow at 9:00 AM', time: '2 hours ago' },
    { id: 2, title: 'Parent Meeting', description: 'Scheduled for Friday 10 AM', time: '1 day ago' },
    { id: 3, title: 'Sports Day', description: 'Annual sports event next week', time: '3 days ago' },
  ];

  const handleSearch = (query: string) => {
    setSearchTerm(query);
    if (!query) return setSearchResults([]);
    // Mock search (replace with API fetch)
    const searchData = [
      { label: "Math Class - Grade 10", link: "/classes/10" },
      { label: "English Assignment 2", link: "/assignments/2" },
      { label: "Teacher: Mr. Perera", link: "/teachers/5" },
    ];
    setSearchResults(searchData.filter(item => item.label.toLowerCase().includes(query.toLowerCase())));
  };

  const getAverageGrade = (marks: any[]) => {
    if (!marks?.length) return 'N/A';
    const gradeToPoints: Record<string, number> = {
      A: 4, B: 3, C: 2, D: 1, F: 0,
    };
    const points = marks.map(m => gradeToPoints[m.grade] ?? null).filter(p => p !== null);
    if (!points.length) return 'N/A';
    const avg = points.reduce((a, b) => a + b, 0) / points.length;
    if (avg >= 3.5) return 'A';
    if (avg >= 2.5) return 'B';
    if (avg >= 1.5) return 'C';
    if (avg >= 0.5) return 'D';
    return 'F';
  };

  if (!data) return <div className="flex justify-center items-center h-screen">Loading...</div>;

  const infoCards = [
    { id: 1, label: 'Class Enrolled', value: student.class?.class_name ?? 'N/A', icon: <Users size={24} />, color: 'bg-blue-100 text-blue-600' },
    { id: 2, label: 'Scholarship', value: student?.scholarship_status ?? 'N/A', icon: <Award size={24} />, color: 'bg-amber-100 text-amber-600' },
    { id: 3, label: 'Attendance', value: `${data.attendance?.overall_percentage ?? 96}%`, icon: <CalendarCheck size={24} />, color: 'bg-emerald-100 text-emerald-600' },
    { id: 4, label: 'Avg Grade', value: getAverageGrade(student.marks), icon: <BarChart2 size={24} />, color: 'bg-purple-100 text-purple-600' },
  ];

  const [currentDateTime, setCurrentDateTime] = useState('');
  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const formattedDate = now.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
      const formattedTime = now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit'
      });
      setCurrentDateTime(`${formattedDate}  ,  ${formattedTime}`);
    };
    updateDateTime();
    const intervalId = setInterval(updateDateTime, 60000);
    return () => clearInterval(intervalId);
  }, []);

  // Teachers state and functions
  const [teachers, setTeachers] = useState<any[]>([]);
  const [teachersModalOpen, setTeachersModalOpen] = useState(false);
  const [teachersLoading, setTeachersLoading] = useState(false);
  const [teachersError, setTeachersError] = useState<string | null>(null);

  const fetchTeachers = async () => {
    setTeachersLoading(true);
    setTeachersError(null);
    try {
      const response = await fetch('/api/teachers', {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
      });
      if (!response.ok) {
        throw new Error(`Failed to fetch teachers: ${response.status} ${response.statusText}`);
      }
      const teachersData = await response.json();
      console.log('Teachers data structure:', teachersData);
      setTeachers(teachersData);
    } catch (error) {
      if (error instanceof Error) {
        setTeachersError(error.message);
      } else {
        setTeachersError('An unknown error occurred while fetching teachers');
      }
    } finally {
      setTeachersLoading(false);
    }
  };

  useEffect(() => {
    if (teachersModalOpen && teachers.length === 0) {
      fetchTeachers();
    }
  }, [teachersModalOpen]);

  const formatPhoneNumberForWhatsApp = (phoneNumber: string): string => {
    let cleaned = phoneNumber.replace(/\D/g, '');
    if (cleaned.startsWith('0')) {
      cleaned = `94${cleaned.substring(1)}`;
    }
    if (!cleaned.startsWith('+')) {
      cleaned = `+${cleaned}`;
    }
    return cleaned;
  };

  const [copiedItem, setCopiedItem] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('Profile');
  const [marks, setMarks] = useState<any[]>([]);
  const [marksLoading, setMarksLoading] = useState(false);
  const [marksError, setMarksError] = useState<string | null>(null);

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedItem(type);
    setTimeout(() => setCopiedItem(null), 2000);
  };

  const fetchMarks = async () => {
    if (!student?.reg_no) {
      setMarksError('Student registration number not found');
      return;
    }
    setMarksLoading(true);
    setMarksError(null);
    try {
      const response = await fetch(`/api/student/${student.reg_no}/marks`, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
      });
      if (!response.ok) {
        throw new Error(`Failed to fetch marks: ${response.status} ${response.statusText}`);
      }
      const marksData = await response.json();
      setMarks(marksData);
    } catch (error) {
      if (error instanceof Error) {
        setMarksError(error.message);
      } else {
        setMarksError('An unknown error occurred while fetching marks');
      }
    } finally {
      setMarksLoading(false);
    }
  };

  // GPA Calculator Component
  const GPACalculator = () => {
    const gradePoints: Record<string, number> = {
      'A': 4.0,
      'B': 3.0,
      'C': 2.0,
      'D': 1.0,
      'F': 0.0
    };

    const calculateGPA = (grades: GradeRecord[]) => {
      if (!grades.length) return 0;

      let totalPoints = 0;
      let totalCredits = 0;

      grades.forEach(grade => {
        totalPoints += gradePoints[grade.grade] || 0;
        totalCredits += 1;
      });

      return totalPoints / totalCredits;
    };

    const currentGPA = calculateGPA(data?.grades || []);
    const projectedGPA = currentGPA + 0.2; // Simplified for demo

    return (
      <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm mt-6">
        <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-4 flex items-center">
          <Award className="mr-2 text-amber-600" size={20} />
          GPA Calculator
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-r from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-800/20 p-5 rounded-lg border border-amber-200 dark:border-amber-800">
            <h3 className="text-lg font-semibold text-amber-800 dark:text-amber-200 mb-2">Current GPA</h3>
            <div className="text-4xl font-bold text-amber-700 dark:text-amber-300">
              {currentGPA.toFixed(2)}
            </div>
            <div className="mt-2 text-sm text-amber-600 dark:text-amber-400">
              Based on {data?.grades?.length || 0} assessments
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 p-5 rounded-lg border border-blue-200 dark:border-blue-800">
            <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-2">Projected GPA</h3>
            <div className="text-4xl font-bold text-blue-700 dark:text-blue-300">
              {projectedGPA.toFixed(2)}
            </div>
            <div className="mt-2 text-sm text-blue-600 dark:text-blue-400">
              Based on current performance trend
            </div>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="font-medium text-gray-700 dark:text-gray-300 mb-3">GPA Scale</h3>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {Object.entries(gradePoints).map(([grade, points]) => (
              <div key={grade} className="text-center p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="font-bold">{grade}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">{points.toFixed(1)}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // Grade Tracker Component
  const GradeTracker = () => {
    const filteredGrades = data?.grades?.filter(grade => {
      const typeMatch = gradeFilter === 'all' || grade.assessment_type === gradeFilter;
      const subjectMatch = subjectFilter === 'all' || grade.subject === subjectFilter;
      return typeMatch && subjectMatch;
    }) || [];

    return (
      <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm mt-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 flex items-center">
            <BarChart2 className="mr-2 text-amber-600" size={20} />
            Grade Tracker
          </h2>
          <div className="flex space-x-2">
            <select
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-lg text-sm"
              value={gradeFilter}
              onChange={(e) => setGradeFilter(e.target.value)}
            >
              <option value="all">All Types</option>
              <option value="assignment">Assignments</option>
              <option value="quiz">Quizzes</option>
              <option value="exam">Exams</option>
              <option value="project">Projects</option>
            </select>
            <select
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-lg text-sm"
              value={subjectFilter}
              onChange={(e) => setSubjectFilter(e.target.value)}
            >
              <option value="all">All Subjects</option>
              {Array.from(new Set(data?.grades?.map(g => g.subject) || [])).map(subject => (
                <option key={subject} value={subject}>{subject}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border">
            <thead className="bg-amber-50 dark:bg-gray-700">
              <tr>
                <th className="p-3 text-sm font-medium">Date</th>
                <th className="p-3 text-sm font-medium">Subject</th>
                <th className="p-3 text-sm font-medium">Type</th>
                <th className="p-3 text-sm font-medium">Title</th>
                <th className="p-3 text-sm font-medium">Score</th>
                <th className="p-3 text-sm font-medium">Grade</th>
                <th className="p-3 text-sm font-medium">Comments</th>
              </tr>
            </thead>
            <tbody>
              {filteredGrades.map((grade) => (
                <tr key={grade.id} className="border-b hover:bg-amber-50 dark:hover:bg-gray-700">
                  <td className="p-3 text-sm">{new Date(grade.date).toLocaleDateString()}</td>
                  <td className="p-3 text-sm font-medium">{grade.subject}</td>
                  <td className="p-3 text-sm capitalize">{grade.assessment_type}</td>
                  <td className="p-3 text-sm">{grade.title}</td>
                  <td className="p-3 text-sm">
                    <span className="font-medium">{grade.marks_obtained}</span>/{grade.max_marks}
                  </td>
                  <td className="p-3 text-sm">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${grade.grade === 'A' ? 'bg-green-100 text-green-800' :
                        grade.grade === 'B' ? 'bg-blue-100 text-blue-800' :
                          grade.grade === 'C' ? 'bg-yellow-100 text-yellow-800' :
                            grade.grade === 'D' ? 'bg-orange-100 text-orange-800' :
                              'bg-red-100 text-red-800'
                      }`}>
                      {grade.grade}
                    </span>
                  </td>
                  <td className="p-3 text-sm text-gray-600 dark:text-gray-300">
                    {grade.teacher_comments || '-'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredGrades.length === 0 && (
            <div className="text-center py-8 text-gray-500">No grades found with selected filters</div>
          )}
        </div>
      </div>
    );
  };

  // Subject Progress Component
  const SubjectProgress = () => {
    const subjectGroups = data?.grades?.reduce((acc, grade) => {
      if (!acc[grade.subject]) {
        acc[grade.subject] = [];
      }
      acc[grade.subject].push(grade);
      return acc;
    }, {} as Record<string, GradeRecord[]>) || {};

    const subjectAverages = Object.entries(subjectGroups).map(([subject, grades]) => {
      const totalMarks = grades.reduce((sum, grade) => sum + grade.marks_obtained, 0);
      const maxMarks = grades.reduce((sum, grade) => sum + grade.max_marks, 0);
      const average = maxMarks > 0 ? (totalMarks / maxMarks) * 100 : 0;

      return {
        subject,
        average,
        count: grades.length,
        latestGrade: grades[grades.length - 1]?.grade || 'N/A'
      };
    });

    return (
      <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm mt-6">
        <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-4 flex items-center">
          <BarChart2 className="mr-2 text-amber-600" size={20} />
          Subject-wise Progress
        </h2>

        <div className="space-y-5">
          {subjectAverages.map(({ subject, average, count, latestGrade }) => (
            <div key={subject}>
              <div className="flex justify-between mb-1">
                <span className="font-medium text-gray-700 dark:text-gray-300">{subject}</span>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium">{average.toFixed(1)}%</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${latestGrade === 'A' ? 'bg-green-100 text-green-800' :
                      latestGrade === 'B' ? 'bg-blue-100 text-blue-800' :
                        latestGrade === 'C' ? 'bg-yellow-100 text-yellow-800' :
                          latestGrade === 'D' ? 'bg-orange-100 text-orange-800' :
                            'bg-red-100 text-red-800'
                    }`}>
                    {latestGrade}
                  </span>
                </div>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                <div
                  className="bg-amber-600 h-2.5 rounded-full"
                  style={{ width: `${average}%` }}
                ></div>
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Based on {count} assessments
              </div>
            </div>
          ))}
        </div>

        {subjectAverages.length === 0 && (
          <div className="text-center py-8 text-gray-500">No progress data available</div>
        )}
      </div>
    );
  };

  // Enhanced Attendance Summary Component
  const AttendanceSummary = () => {
    const attendanceData = data?.attendance || {
      overall_percentage: 96,
      monthly_data: [
        { month: 'January', present_days: 20, total_days: 22, percentage: 91 },
        { month: 'February', present_days: 18, total_days: 20, percentage: 90 },
        { month: 'March', present_days: 22, total_days: 22, percentage: 100 }
      ],
      recent_absences: [
        { date: '2023-03-15', reason: 'Medical' },
        { date: '2023-02-10', reason: 'Family event' }
      ]
    };

    const isLowAttendance = attendanceData.overall_percentage < 85;

    return (
      <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm mt-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 flex items-center">
            <CalendarCheck className="mr-2 text-amber-600" size={20} />
            Attendance Summary
          </h2>
          <button
            onClick={() => setAttendanceModalOpen(true)}
            className="px-3 py-1 bg-amber-500 text-white rounded-lg text-sm hover:bg-amber-600"
          >
            View Details
          </button>
        </div>

        {isLowAttendance && (
          <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-start">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800 dark:text-red-200">Low Attendance Alert</h3>
              <div className="mt-2 text-sm text-red-700 dark:text-red-300">
                Your attendance is below the required 85%. Please improve your attendance.
              </div>
            </div>
          </div>
        )}

        <div className="mb-4">
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Overall Attendance</span>
            <span className="text-sm font-medium">{attendanceData.overall_percentage}%</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
            <div
              className={`h-2.5 rounded-full ${attendanceData.overall_percentage >= 90 ? 'bg-green-600' :
                  attendanceData.overall_percentage >= 75 ? 'bg-amber-600' : 'bg-red-600'
                }`}
              style={{ width: `${attendanceData.overall_percentage}%` }}
            ></div>
          </div>
        </div>

        <div>
          <h3 className="font-medium text-gray-700 dark:text-gray-300 mb-3">Monthly Attendance</h3>
          <div className="space-y-3">
            {attendanceData.monthly_data.map((month, index) => (
              <div key={index}>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{month.month}</span>
                  <span className="text-sm font-medium">{month.percentage}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${month.percentage >= 90 ? 'bg-green-600' :
                        month.percentage >= 75 ? 'bg-amber-600' : 'bg-red-600'
                      }`}
                    style={{ width: `${month.percentage}%` }}
                  ></div>
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {month.present_days} of {month.total_days} days
                </div>
              </div>
            ))}
          </div>
        </div>

        {attendanceData.recent_absences.length > 0 && (
          <div className="mt-6">
            <h3 className="font-medium text-gray-700 dark:text-gray-300 mb-3">Recent Absences</h3>
            <div className="space-y-2">
              {attendanceData.recent_absences.map((absence, index) => (
                <div key={index} className="flex justify-between items-center p-2 bg-red-50 dark:bg-red-900/20 rounded-lg">
                  <span className="text-sm">{new Date(absence.date).toLocaleDateString()}</span>
                  <span className="text-sm text-red-700 dark:text-red-300">{absence.reason || 'No reason provided'}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  // Teacher Feedback Hub Component
  const TeacherFeedbackHub = () => {
    const feedbackData = data?.teacherFeedback || [
      {
        id: '1',
        assessment_id: 'a1',
        assessment_title: 'Science Project',
        subject: 'Science',
        teacher_name: 'Ms. Silva',
        feedback: 'Excellent work on the research component. Your presentation was clear and well-organized.',
        date: '2023-06-15'
      },
      {
        id: '2',
        assessment_id: 'a2',
        assessment_title: 'Math Quiz 3',
        subject: 'Mathematics',
        teacher_name: 'Mr. Perera',
        feedback: 'Good understanding of concepts, but need to work on showing your work step-by-step.',
        date: '2023-06-10'
      }
    ];

    return (
      <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm mt-6">
        <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-4 flex items-center">
          <MessageSquare className="mr-2 text-amber-600" size={20} />
          Teacher Feedback Hub
        </h2>

        {feedbackData.length === 0 ? (
          <div className="text-center py-8 text-gray-500">No feedback available at this time</div>
        ) : (
          <div className="space-y-4">
            {feedbackData.map((feedback) => (
              <div key={feedback.id} className="border-l-4 border-amber-500 pl-4 py-3 bg-amber-50 dark:bg-amber-900/10 rounded-r-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gray-800 dark:text-gray-100">{feedback.assessment_title}</h3>
                    <div className="flex items-center mt-1 text-sm text-gray-600 dark:text-gray-300">
                      <span className="mr-3">{feedback.subject}</span>
                      <span>•</span>
                      <span className="ml-3">{feedback.teacher_name}</span>
                    </div>
                  </div>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {new Date(feedback.date).toLocaleDateString()}
                  </span>
                </div>
                <p className="mt-3 text-gray-700 dark:text-gray-300">{feedback.feedback}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs} auth={usePage().props.auth}>
      <Head title="Student Dashboard" />

      {/* Existing header and navigation code remains unchanged */}
      <div className="bg-gradient-to-r from-amber-500 to-amber-600 text-white py-3 px-6 flex flex-col md:flex-row justify-between items-center">
        <div className="font-medium text-center md:text-left">
          <span className="hidden sm:inline">Welcome to</span> Mahadivulwewa National School
        </div>
        <div className="flex space-x-5 mt-2 md:mt-0">
          <a href="https://www.facebook.com/ttnmmv" target="_blank" rel="noopener noreferrer"
            className="hover:text-white transition-colors">
            <Facebook size={20} />
          </a>
          <a href="mailto:ttnmahadivulwewamv@gmail.com"
            className="hover:text-white transition-colors">
            <Mail size={20} />
          </a>
          <a href="https://maps.google.com?q=Mahadivulwewa School" target="_blank" rel="noopener noreferrer"
            className="hover:text-white transition-colors">
            <MapPin size={20} />
          </a>
        </div>
      </div>

      <nav className="bg-gradient-to-r from-[#7a0000] to-[#650000] text-white py-3 px-6 shadow-lg sticky top-0 z-50">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <img src="/images/School.jpg" alt="Logo" className="h-10 w-10 rounded-full" />
            <span className="font-orbitron text-lg font-bold truncate">
              T / Tn/ Mahadivulwewa Maha Vidyalaya(National School)
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <NavUser />
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full hover:bg-amber-600 dark:hover:bg-gray-700 transition"
              aria-label="Toggle dark mode"
              aria-pressed={darkMode}
              title="Toggle theme"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden text-amber-300 bg-[#7a0000] p-2 rounded-lg hover:bg-[#5a0000] transition-colors"
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {menuOpen && (
        <div className="bg-white dark:bg-gray-800 text-black px-4 py-3 md:hidden shadow-lg">
          <div className="grid grid-cols-3 gap-2 mb-3">
            <a href="https://www.facebook.com/ttnmmv" className="flex flex-col items-center p-2 hover:bg-gray-100 rounded">
              <Facebook size={20} />
              <span className="text-xs mt-1">Facebook</span>
            </a>
            <a href="mailto:ttnmahadivulwewamv@gmail.com" className="flex flex-col items-center p-2 hover:bg-gray-100 rounded">
              <Mail size={20} />
              <span className="text-xs mt-1">Email</span>
            </a>
            <a href="https://maps.google.com?q=Mahadivulwewa School" className="flex flex-col items-center p-2 hover:bg-gray-100 rounded">
              <MapPin size={20} />
              <span className="text-xs mt-1">Location</span>
            </a>
          </div>
        </div>
      )}

      <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50 dark:bg-gray-900 dark:text-gray-100">
        <div className="w-full lg:w-64 p-4 bg-white dark:bg-gray-800 shadow-lg lg:sticky lg:top-0 lg:h-screen lg:overflow-y-auto">
          <h2 className="text-lg font-bold text-amber-700 mb-4 flex items-center">
            <User className="mr-2" size={20} /> Student Menu
          </h2>
          <div className="space-y-1">
            {[
              { name: 'Dashboard', icon: <Home size={18} />, onClick: () => { } },
              { name: 'Courses', icon: <Book size={18} />, onClick: () => setCoursesOpen(true) },
              // { name: 'Assignments', icon: <ClipboardList size={18} />, onClick: () => { } },
              // { name: 'Grades', icon: <BarChart2 size={18} />, link: '/grades' },
              // { name: 'Attendance', icon: <CalendarCheck size={18} />, link: '/attendance' },
              { name: 'Study Materials', icon: <Book size={18} />, link: '/student/studyMaterial' },
              // { name: 'Messages', icon: <MessageSquare size={18} />, link: '/messages' },
              // { name: 'Notifications', icon: <Bell size={18} />, link: '/notifications' },
              { name: 'Settings', icon: <Settings size={18} />, link: '/settings' },

            ].map((item, index) =>
              item.link ? (
                <Link
                  key={index}
                  href={item.link}
                  className={`w-full flex items-center px-4 py-3 rounded-lg transition-all ${index === 0
                      ? 'bg-amber-100 text-amber-700 font-medium'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-amber-50 hover:text-amber-600 dark:hover:bg-gray-700 dark:hover:text-amber-400'
                    }`}


                >
                  <span className="mr-3">{item.icon}</span>
                  {item.name}
                </Link>
              ) : (
                <button key={index} onClick={item.onClick}
                  className={`w-full flex items-center px-4 py-3 rounded-lg transition-all ${index === 0
                      ? 'bg-amber-100 text-amber-700 font-medium'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-amber-50 hover:text-amber-600 dark:hover:bg-gray-700 dark:hover:text-amber-400'
                    }`}
                >
                  <span className="mr-3">{item.icon}</span>
                  {item.name}

                </button>
              ))}
          </div>
        </div>

        <main className="flex-1 p-4 md:p-6 max-w-7xl mx-auto w-full">
          <div className="
            bg-gradient-to-r from-amber-400 to-amber-500 
            dark:from-amber-700 dark:to-amber-800
            text-white p-6 rounded-xl shadow-md mb-6
            hover:shadow-lg hover:from-amber-500 hover:to-amber-600 
            dark:hover:from-amber-600 dark:hover:to-amber-700
          ">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <div className="mb-4 md:mb-0">
                <h1 className="text-2xl md:text-3xl font-bold mb-2">Good Morning,  {student.personal?.full_name_with_initial}
                  !</h1>
                <p className="opacity-90 max-w-2xl">
                  You have 3 assignments to complete this week. Your next class is Mathematics at 10:30 AM.
                </p>
              </div>
              <div className="bg-white/20 dark:bg-gray-800 backdrop-blur-sm rounded-full px-4 py-2 inline-flex items-center">
                <CalendarCheck className="mr-2" size={18} />
                <span>{currentDateTime}</span>
              </div>
            </div>
          </div>

          <DailyQuote />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
            {[
              { name: 'View Timetable', icon: <CalendarCheck size={20} />, link: '/timetable' },
              { name: 'Submit Assignment', icon: <ClipboardList size={20} />, link: '/assignments' },
              { name: 'View Grades', icon: <BarChart2 size={20} />, link: '/grades' },
              { name: 'Ask a Teacher', icon: <MessageSquare size={20} />, onClick: () => setTeachersModalOpen(true) },
            ].map((action, idx) => (
              action.link ? (
                <Link key={idx} href={action.link}
                  className="p-4 bg-white dark:bg-gray-700 rounded-lg shadow hover:bg-amber-50 dark:hover:bg-gray-600 flex flex-col items-center text-center transition">
                  {action.icon}
                  <span className="mt-2 text-sm font-medium">{action.name}</span>
                </Link>
              ) : (
                <button key={idx} onClick={action.onClick}
                  className="p-4 bg-white dark:bg-gray-700 rounded-lg shadow hover:bg-amber-50 dark:hover:bg-gray-600 flex flex-col items-center text-center transition">
                  {action.icon}
                  <span className="mt-2 text-sm font-medium">{action.name}</span>
                </button>
              )
            ))}
          </div>

          <div className="mb-6 mt-8">
            <h2 className="text-lg font-bold text-gray-800 flex items-center">
              <Search className="mr-2 text-amber-600" size={20} />
              Quick Search
            </h2>
            <input
              type="text"
              placeholder="Search classes, grades, assignments, teachers, or events..."
              aria-label="Quick search"
              className="mb-3 mt-2 w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-amber-400"
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
            />
            {searchResults.length > 0 && (
              <div className="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 mt-2 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                {searchResults.map((item, idx) => (
                  <Link key={idx} href={item.link} className="block px-4 py-2 hover:bg-amber-50 dark:hover:bg-gray-600">{item.label}</Link>
                ))}
              </div>
            )}
          </div>

          {/* Updated tabs to include new features */}
          <div className="flex space-x-4 border-b border-gray-200 mb-6 pb-2">
            {['Profile', 'Marks',  'Progress', 'Feedback'].map((tab, idx) => (
              <button
                key={idx}
                className={`pb-2 px-4 font-medium ${activeTab === tab ? 'text-amber-600 border-b-2 border-amber-600' : 'text-gray-500 hover:text-amber-600'}`}
                onClick={() => {
                  setActiveTab(tab);
                  if (tab === 'Marks' && marks.length === 0) {
                    fetchMarks();
                  }
                }}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {infoCards.map((card) => (
              <div
                key={card.id}
                className={`p-5 rounded-xl shadow-sm transition-all hover:shadow-md cursor-pointer ${card.color}`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium">{card.label}</p>
                    <p className="text-2xl font-bold mt-1">{card.value}</p>
                  </div>
                  <div className={`p-3 rounded-full ${card.color.replace('text', 'bg').split(' ')[0]} bg-opacity-30`}>
                    {card.icon}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Teachers Modal */}
          <Dialog open={teachersModalOpen} onClose={() => setTeachersModalOpen(false)} className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="fixed inset-0 bg-black/50" aria-hidden="true" />
            <Dialog.Panel className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-xl max-w-2xl w-full relative z-10">
              <Dialog.Title className="text-xl font-bold mb-4 flex items-center">
                <MessageSquare className="mr-2 text-amber-600" size={20} />
                Teacher Contacts
              </Dialog.Title>

              {teachersError && (
                <div className="mb-3 p-3 rounded-lg bg-red-50 text-red-700 border border-red-200 dark:bg-red-900/30 dark:text-red-200 dark:border-red-800">
                  {teachersError}
                </div>
              )}

              {teachersLoading ? (
                <div className="py-8 text-center text-gray-500">Loading teachers...</div>
              ) : (
                <div className="max-h-96 overflow-y-auto divide-y divide-gray-100 dark:divide-gray-700">
                  {teachers.map((teacher, idx) => (
                    <div key={idx} className="py-3 px-2 hover:bg-amber-50 dark:hover:bg-gray-700 rounded">
                      <div className="font-medium text-gray-900 dark:text-gray-100">{teacher.personal?.Full_name_with_initial || teacher.personal?.Full_name || 'Unknown Teacher'}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        ID: {teacher.teacher_NIC}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                        {teacher.personal?.Email_address && (
                          <div className="flex items-center mt-1">
                            <Mail size={14} className="mr-2" />
                            <a
                              href={`mailto:${teacher.personal.Email_address}`}
                              className="text-amber-600 hover:text-amber-800 dark:text-amber-400 dark:hover:text-amber-300 underline"
                              onClick={(e) => e.stopPropagation()}
                              target="_blank"
                              rel='noopener noreferrer'
                            >
                              {teacher.personal.Email_address}
                            </a>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                copyToClipboard(teacher.personal.Email_address, 'email');
                              }}
                              className="ml-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                              title="Copy email"
                            >
                              {copiedItem === 'email' ? '✓ Copied!' : '📋'}
                            </button>
                          </div>
                        )}

                        {teacher.personal?.Mobile_number && (
                          <div className="flex items-center mt-1">
                            <span className="mr-2">📱</span>
                            <div className="flex flex-wrap gap-2">
                              <a
                                href={`https://wa.me/${formatPhoneNumberForWhatsApp(teacher.personal.Mobile_number)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-amber-600 hover:text-amber-800 dark:text-amber-400 dark:hover:text-amber-300 underline"
                                onClick={(e) => e.stopPropagation()}
                              >
                                WhatsApp
                              </a>
                              <a
                                href={`tel:${teacher.personal.Mobile_number}`}
                                className="text-amber-600 hover:text-amber-800 dark:text-amber-400 dark:hover:text-amber-300 underline"
                                onClick={(e) => e.stopPropagation()}
                              >
                                Call
                              </a>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  copyToClipboard(teacher.personal.Mobile_number, 'mobile');
                                }}
                                className="ml-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                                title="Copy phone number"
                              >
                                {copiedItem === 'mobile' ? '✓ Copied!' : '📋'}
                              </button>
                            </div>
                          </div>
                        )}
                        {teacher.personal?.Fixed_telephone_number && (
                          <div className="flex items-center mt-1">
                            <span className="mr-2">📞</span>
                            <a
                              href={`tel:${teacher.personal.Fixed_telephone_number}`}
                              className="text-amber-600 hover:text-amber-800 dark:text-amber-400 dark:hover:text-amber-300 underline"
                              onClick={(e) => e.stopPropagation()}
                            >
                              {teacher.personal.Fixed_telephone_number} (Call)
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                  {teachers.length === 0 && (
                    <div className="py-8 text-center text-gray-500">No teachers found.</div>
                  )}
                </div>
              )}

              <div className="mt-4 text-right">
                <button
                  onClick={() => setTeachersModalOpen(false)}
                  className="px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600"
                >
                  Close
                </button>
              </div>
            </Dialog.Panel>
          </Dialog>

          {/* Marks Tab */}
          {activeTab === 'Marks' && (
            <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm mt-6">
              <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-4 flex items-center">
                <BarChart2 className="mr-2 text-amber-600" size={20} />
                Your Marks
              </h2>

              {marksLoading && (
                <div className="text-center py-8">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-amber-500"></div>
                  <p className="mt-2 text-gray-600 dark:text-gray-300">Loading marks...</p>
                </div>
              )}

              {marksError && (
                <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-red-700">
                        {marksError}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {!marksLoading && !marksError && (
                <>
                  <div className="flex justify-end mb-4">
                    <button
                      onClick={fetchMarks}
                      className="px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 flex items-center"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                      </svg>
                      Refresh
                    </button>
                  </div>
                  {marks.length > 0 ? (
                    <>
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-300">Total Subjects</h3>
                          <p className="text-2xl font-bold text-gray-900 dark:text-white">
                            {[...new Set(marks.map(m => m.subject_id))].length}
                          </p>
                        </div>
                        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-300">Average Marks</h3>
                          <p className="text-2xl font-bold text-gray-900 dark:text-white">
                            {(marks.reduce((sum, m) => sum + (m.marks_obtained || 0), 0) / marks.length).toFixed(1)}
                          </p>
                        </div>
                        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-300">Highest Grade</h3>
                          <p className="text-2xl font-bold text-gray-900 dark:text-white">
                            {(() => {
                              const gradeOrder: Record<string, number> = {
                                'A': 4,
                                'B': 3,
                                'C': 2,
                                'S': 1,
                                'F': 0
                              };
                              return marks.reduce((highest, m) => {
                                const currentGrade = m.grade;
                                if (currentGrade in gradeOrder) {
                                  const highestValue = gradeOrder[highest] || 0;
                                  const currentValue = gradeOrder[currentGrade];
                                  return currentValue > highestValue ? currentGrade : highest;
                                }
                                return highest;
                              }, 'F');
                            })()}
                          </p>
                        </div>
                        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-300">Pass Rate</h3>
                          <p className="text-2xl font-bold text-gray-900 dark:text-white">
                            {((marks.filter(m => m.grade !== 'F').length / marks.length) * 100).toFixed(1)}%
                          </p>
                        </div>
                      </div>
                      <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                          <thead className="bg-gray-50 dark:bg-gray-700">
                            <tr>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                Subject
                              </th>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                Term
                              </th>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                Year
                              </th>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                Marks Obtained
                              </th>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                Grade
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                            {marks.map((mark, index) => (
                              <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                                  {mark.subject_id || 'Unknown Subject'}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                                  {mark.term || 'Unknown'}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                                  {mark.year || 'N/A'}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                                  {mark.marks_obtained || 'N/A'}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${mark.grade === 'A' ? 'bg-green-100 text-green-800' :
                                      mark.grade === 'B' ? 'bg-blue-100 text-blue-800' :
                                        mark.grade === 'C' ? 'bg-yellow-100 text-yellow-800' :
                                          mark.grade === 'S' ? 'bg-orange-100 text-orange-800' :
                                            'bg-red-100 text-red-800'
                                    }`}>
                                    {mark.grade || 'N/A'}
                                  </span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-gray-500 dark:text-gray-300">No marks records found</p>
                    </div>
                  )}
                </>
              )}
            </div>
          )}

          {/* Progress Tab */}
          {activeTab === 'Progress' && (
            <>
              <GPACalculator />
              <GradeTracker />
              <SubjectProgress />
            </>
          )}

          {/* Feedback Tab */}
          {activeTab === 'Feedback' && (
            <TeacherFeedbackHub />
          )}

          {/* Attendance Modal */}
          <Dialog open={attendanceModalOpen} onClose={() => setAttendanceModalOpen(false)} className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="fixed inset-0 bg-black opacity-50" aria-hidden="true"></div>
            <Dialog.Panel className="bg-white dark:bg-gray-800 p-6 rounded-lg max-w-lg w-full z-50">
              <Dialog.Title className="text-xl font-bold mb-4">Attendance History</Dialog.Title>
              <div className="overflow-y-auto max-h-64">
                <table className="w-full text-left border">
                  <thead className="bg-amber-50">
                    <tr>
                      <th className="p-2 border">Date</th>
                      <th className="p-2 border">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {['2025-07-01', '2025-07-02', '2025-07-03'].map((d, i) => (
                      <tr key={i} className="hover:bg-amber-50">
                        <td className="p-2 border">{d}</td>
                        <td className="p-2 border">Present</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <button onClick={() => setAttendanceModalOpen(false)} className="mt-4 px-4 py-2 bg-amber-500 text-white rounded-lg">Close</button>
            </Dialog.Panel>
          </Dialog>

          {/* Courses Modal */}
          <Dialog open={coursesOpen} onClose={() => setCoursesOpen(false)} className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="fixed inset-0 bg-black/50" aria-hidden="true" />
            <Dialog.Panel className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-xl max-w-2xl w-full relative z-10">
              <Dialog.Title className="text-xl font-bold mb-4 flex items-center">
                <Book className="mr-2 text-amber-600" size={20} />
                All Subjects
              </Dialog.Title>
              <div className="flex items-center gap-3 mb-4">
                <input
                  type="text"
                  value={subjectsQuery}
                  onChange={(e) => setSubjectsQuery(e.target.value)}
                  placeholder="Search subjects..."
                  className="flex-1 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
                <button
                  className="px-3 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600"
                  onClick={() => {
                    setSubjectsLoading(true);
                    setSubjectsError(null);

                    fetch(`/api/student/${student.reg_no}/subjects`)
                      .then(async (res) => {
                        if (!res.ok) {
                          const text = await res.text();
                          console.log("Subjects", text);
                          throw new Error(`HTTP ${res.status}: ${text?.slice(0, 200)}`);
                        }
                        return res.json();
                      })
                      .then((data) => setSubjects(Array.isArray(data) ? data : []))
                      .catch((err) => setSubjectsError((err as any)?.message ?? 'Failed to load subjects'))
                      .finally(() => setSubjectsLoading(false));
                  }}
                >
                  Refresh
                </button>
              </div>

              {coursesOpen && subjects.length === 0 && !subjectsLoading && !subjectsError && (
                <script dangerouslySetInnerHTML={{ __html: `setTimeout(() => { document.querySelector('[data-load-subjects]')?.click(); }, 0);` }} />
              )}

              <button data-load-subjects className="hidden" onClick={() => {
                setSubjectsLoading(true);
                setSubjectsError(null);
                fetch('/api/subjects')
                  .then(async (res) => {
                    if (!res.ok) {
                      const text = await res.text();
                      throw new Error(`HTTP ${res.status}: ${text?.slice(0, 200)}`);
                    }
                    return res.json();
                  })
                  .then((data) => setSubjects(Array.isArray(data) ? data : []))
                  .catch((err) => setSubjectsError((err as any)?.message ?? 'Failed to load subjects'))
                  .finally(() => setSubjectsLoading(false));
              }} />

              {subjectsError && (
                <div className="mb-3 p-3 rounded-lg bg-red-50 text-red-700 border border-red-200 dark:bg-red-900/30 dark:text-red-200 dark:border-red-800">
                  {subjectsError}
                </div>
              )}

              {subjectsLoading ? (
                <div className="py-8 text-center text-gray-500">Loading subjects...</div>
              ) : (
                <div className="max-h-96 overflow-y-auto divide-y divide-gray-100 dark:divide-gray-700">
                  {subjects
                    .filter((s) =>
                      subjectsQuery
                        ? (s.name || s.subject_name || '').toLowerCase().includes(subjectsQuery.toLowerCase())
                        : true
                    )
                    .map((s, idx) => (
                      <div key={idx} className="py-3 px-2 hover:bg-amber-50 dark:hover:bg-gray-700 rounded flex items-start justify-between">
                        <div>
                          <div className="font-medium text-gray-900 dark:text-gray-100">{s.name || s.subject_name || 'Untitled Subject'}</div>
                          {s.code && <div className="text-xs text-gray-500">Code: {s.code}</div>}
                          {s.description && <div className="text-sm text-gray-600 dark:text-gray-300 mt-1">{s.description}</div>}
                        </div>
                        {s.status && (
                          <span className={`text-xs px-2 py-1 rounded-full ${s.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-700'}`}>{s.status}</span>
                        )}
                      </div>
                    ))}
                  {subjects.length === 0 && (
                    <div className="py-8 text-center text-gray-500">No subjects found.</div>
                  )}
                </div>
              )}

              <div className="mt-4 text-right">
                <button onClick={() => setCoursesOpen(false)} className="px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600">Close</button>
              </div>
            </Dialog.Panel>
          </Dialog>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 flex items-center">
                    <ClipboardList className="mr-2 text-amber-600" size={20} />
                    Academic Updates
                  </h2>
                  <Link href="#" className="text-sm text-amber-600 font-medium hover:underline">
                    View All
                  </Link>
                </div>
                <div className="space-y-3">
                  {notifications.map((item) => (
                    <div key={item.id} className="border-l-4 border-amber-500 pl-4 py-2 
                      hover:bg-amber-50 dark:hover:bg-amber-700 rounded-r transition-colors">
                      <div className="flex justify-between">
                        <h3 className="font-semibold text-gray-800 dark:text-gray-100">{item.title}</h3>
                        <span className="text-xs text-gray-500 dark:text-gray-300">{item.time}</span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center space-x-4 mb-4">
                <select className="px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg" value={selectedSubject} onChange={(e) => setSelectedSubject(e.target.value)}>
                  <option value="">All Subjects</option>
                {subjects.map((s) => (
  <div key={s.subject_id}>
    {s.subject_name}  {/* <-- Access the name property */}
  </div>
))}

                </select>
                <select className="px-3 py-2 border border-gray-300 rounded-lg" value={selectedExamType} onChange={(e) => setSelectedExamType(e.target.value)}>
                  <option value="">All Exams</option>
                  <option value="midterm">Midterm</option>
                  <option value="final">Final</option>
                </select>
                <input type="date" className="px-3 py-2 border border-gray-300 rounded-lg" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                <input type="date" className="px-3 py-2 border border-gray-300 rounded-lg" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
              </div>

              <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm">
                <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-4 flex items-center">
                  <BarChart2 className="mr-2 text-amber-600" size={20} />
                  Academic Performance
                </h2>
                <StudentOverallPerformanceChart regNo={student?.reg_no ?? String(user.id)} darkMode={darkMode} />
              </div>

              <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm">
                <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-4 flex items-center">
                  <CalendarCheck className="mr-2 text-amber-600" size={20} />
                  Today's Schedule
                </h2>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-amber-50 dark:bg-gray-800 text-left">
                        <th className="p-3 text-sm font-medium">Time</th>
                        <th className="p-3 text-sm font-medium">Subject</th>
                        <th className="p-3 text-sm font-medium">Teacher</th>
                        <th className="p-3 text-sm font-medium">Room</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { time: '8:30 - 9:30', subject: 'Mathematics', teacher: 'Mr. Perera', room: 'B12' },
                        { time: '9:30 - 10:30', subject: 'Science', teacher: 'Ms. Silva', room: 'Lab 2' },
                        { time: '11:00 - 12:00', subject: 'History', teacher: 'Mr. Fernando', room: 'A07' },
                        { time: '1:30 - 2:30', subject: 'English', teacher: 'Ms. Herath', room: 'C03' },
                      ].map((cls, index) => (
                        <tr key={index} className="border-b hover:bg-amber-50 dark:hover:bg-amber-700 transition-colors">
                          <td className="p-3 font-medium text-sm text-gray-800 dark:text-gray-100">{cls.time}</td>
                          <td className="p-3 text-sm text-gray-800 dark:text-gray-100">{cls.subject}</td>
                          <td className="p-3 text-sm text-gray-600 dark:text-gray-300">{cls.teacher}</td>
                          <td className="p-3 text-sm text-gray-800 dark:text-gray-100">{cls.room}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm">
                <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-4 flex items-center">
                  <CalendarCheck className="mr-2 text-amber-600" size={20} />
                  Academic Calendar
                </h2>
                <CalendarView darkMode={darkMode} />
              </div>

              {/* Enhanced Attendance Summary */}
              <AttendanceSummary />

              <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm">
                <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-4 flex items-center">
                  <FileText className="mr-2 text-amber-600" size={20} />
                  Quick Summary
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <SummaryCard title="Classes Enrolled" value={data.classes.length} />
                  <SummaryCard title="Upcoming Exams" value={data.upcomingExams.length} />
                  <SummaryCard title="Latest Grades" value={data.latestGrades[0]?.marks_obtained || 'N/A'} />
                  <SummaryCard title="Fee Due Status" value={data.feeStatus?.status || 'Paid'} />
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm">
                <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-4 flex items-center">
                  <BarChart2 className="mr-2 text-amber-600" size={20} />
                  Monthly Performance
                </h2>
                <StudentPerformanceChart marksData={data.monthlyMarks ?? []} darkMode={darkMode} />
              </div>

              <RealTimeChatBot darkMode={darkMode} />
            </div>
          </div>
        </main>
      </div>
    </AppLayout>
  );
}