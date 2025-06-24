import { useState } from 'react';

interface Grade {
  id: number;
  name: string;
}

interface Section {
  id: number;
  name: string;
  gradeId: number;
}

interface Subject {
  id: number;
  name: string;
  sectionId: number;
}

interface Teacher {
  id: number;
  name: string;
}

export default function AssignTeachersPage() {
  const grades: Grade[] = [
    { id: 1, name: 'Grade 6' },
    { id: 2, name: 'Grade 7' },
  ];

  const sections: Section[] = [
    { id: 1, name: 'A', gradeId: 1 },
    { id: 2, name: 'B', gradeId: 1 },
    { id: 3, name: 'A', gradeId: 2 },
  ];

  const subjects: Subject[] = [
    { id: 1, name: 'Math', sectionId: 1 },
    { id: 2, name: 'Science', sectionId: 1 },
    { id: 3, name: 'English', sectionId: 2 },
  ];

  const teachers: Teacher[] = [
    { id: 1, name: 'Mr. Silva' },
    { id: 2, name: 'Ms. Perera' },
    { id: 3, name: 'Mr. Fernando' },
  ];

  const [selectedGrade, setSelectedGrade] = useState<number | null>(null);
  const [selectedSection, setSelectedSection] = useState<number | null>(null);
  const [assignments, setAssignments] = useState<{ [subjectId: number]: number }>({});

  const handleTeacherChange = (subjectId: number, teacherId: number) => {
    setAssignments(prev => ({ ...prev, [subjectId]: teacherId }));
  };

  const handleSubmit = () => {
    console.log('Submitting:', assignments);
    // You can send `assignments` to backend with Inertia or Axios
  };

  const filteredSections = sections.filter(s => s.gradeId === selectedGrade);
  const filteredSubjects = subjects.filter(s => s.sectionId === selectedSection);

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-2xl shadow-lg space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Assign Teachers to Subjects</h1>

      <div className="flex gap-4">
        <div className="w-1/2">
          <label className="block mb-1 font-medium">Select Grade</label>
          <select
            className="w-full border rounded-lg px-4 py-2"
            value={selectedGrade ?? ''}
            onChange={(e) => {
              setSelectedGrade(Number(e.target.value));
              setSelectedSection(null); // Reset section
            }}
          >
            <option value="">-- Select Grade --</option>
            {grades.map(g => (
              <option key={g.id} value={g.id}>{g.name}</option>
            ))}
          </select>
        </div>

        {selectedGrade && (
          <div className="w-1/2">
            <label className="block mb-1 font-medium">Select Section</label>
            <select
              className="w-full border rounded-lg px-4 py-2"
              value={selectedSection ?? ''}
              onChange={(e) => setSelectedSection(Number(e.target.value))}
            >
              <option value="">-- Select Section --</option>
              {filteredSections.map(s => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </select>
          </div>
        )}
      </div>

      {selectedSection && (
        <div className="mt-6 space-y-4">
          <h2 className="text-lg font-semibold text-gray-700">Subjects in Section</h2>
          {filteredSubjects.map(subject => (
            <div key={subject.id} className="flex items-center justify-between border rounded-lg p-4">
              <span className="font-medium text-gray-800">{subject.name}</span>
              <select
                className="border rounded-md px-3 py-1"
                value={assignments[subject.id] ?? ''}
                onChange={(e) => handleTeacherChange(subject.id, Number(e.target.value))}
              >
                <option value="">-- Select Teacher --</option>
                {teachers.map(t => (
                  <option key={t.id} value={t.id}>{t.name}</option>
                ))}
              </select>
            </div>
          ))}
        </div>
      )}

      {selectedSection && (
        <button
          onClick={handleSubmit}
          className="mt-6 w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition"
        >
          Submit Assignments
        </button>
      )}
    </div>
  );
}
