
import { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { router } from '@inertiajs/react';

export default function TeacherLeaveRequest() {
  const [formData, setFormData] = useState({
    leave_type: '',
    leave_start_date: '',
    leave_end_date: '',
    reason: '',
    requires_substitute: false,
    substitute_teacher_name: '',
    substitute_teacher_contact: '',
    comments: '',
    supporting_document: null as File | null,
  });
type Teacher = {
    teacher_NIC: string;
    user_id:number;
};
  const calculateLeaveDays = () => {
    const start = new Date(formData.leave_start_date);
    const end = new Date(formData.leave_end_date);
    const diff = (end.getTime() - start.getTime()) / (1000 * 3600 * 24) + 1;
    return diff > 0 ? diff : 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;

    setFormData((prev) => ({
      ...prev,
      [name]: val,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      supporting_document: e.target.files?.[0] ?? null,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null) {
        payload.append(key, value as any);
      }
    });

Inertia.post('/teacher/leave/request', payload, {
  forceFormData: true,
});
  };

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white rounded-lg shadow-md">
      

<button
  onClick={() => router.visit('/teacher/dashboard')}
  className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 mb-4"
>
  ← Dashboard
</button>

      <h2 className="text-2xl font-bold mb-6 text-gray-800">📝 Leave Request Form</h2>
     
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Leave Type */}
        <div>
          <label className="block mb-2 font-medium text-gray-700">Leave Type</label>
          <select
            name="leave_type"
            value={formData.leave_type}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-md px-4 py-2"
          >
            <option value="">Select Leave Type</option>
            <option value="Casual">Casual</option>
            <option value="Medical">Medical</option>
            <option value="Emergency">Emergency</option>
            <option value="Duty">Duty</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  {/* Start Date */}
  <div>
    <label className="block mb-2 font-medium text-gray-700">Start Date</label>
    <input
      type="date"
      name="leave_start_date"
      value={formData.leave_start_date}
      onChange={handleChange}
      required
      className="w-full border border-gray-300 rounded-md px-4 py-2"
    />
  </div>

  {/* End Date (with min attribute set to start date) */}
  <div>
    <label className="block mb-2 font-medium text-gray-700">End Date</label>
    <input
      type="date"
      name="leave_end_date"
      value={formData.leave_end_date}
      onChange={handleChange}
      min={formData.leave_start_date} // 🔐 disables all dates before start date
      required
      className="w-full border border-gray-300 rounded-md px-4 py-2"
    />
  </div>
</div>


        {/* Total Leave Days */}
        {formData.leave_start_date && formData.leave_end_date && (
          <p className="text-sm text-gray-600">
            📅 Total Leave Days: <span className="font-semibold">{calculateLeaveDays()}</span>
          </p>
        )}

        {/* Reason */}
        <div>
          <label className="block mb-2 font-medium text-gray-700">Reason for Leave</label>
          <textarea
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-md px-4 py-2 min-h-[100px]"
          />
        </div>

        {/* Supporting Document */}
        <div>
          <label className="block mb-2 font-medium text-gray-700">Upload Document (optional)</label>
          <input
            type="file"
            name="supporting_document"
            onChange={handleFileChange}
            className="w-full"
          />
        </div>

        {/* Requires Substitute */}
        <div>
          <label className="flex items-center gap-3 text-gray-700 font-medium">
            <input
              type="checkbox"
              name="requires_substitute"
              checked={formData.requires_substitute}
              onChange={handleChange}
              className="h-4 w-4"
            />
            Requires Substitute?
          </label>
        </div>

        {/* Substitute Details */}
        {formData.requires_substitute && (
          <div className="p-4 bg-gray-100 rounded-md shadow-inner">
            <h4 className="text-lg font-semibold mb-4">Substitute Details</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block mb-2 font-medium text-gray-700">Substitute Name</label>
                <input
                  type="text"
                  name="substitute_teacher_name"
                  value={formData.substitute_teacher_name}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-4 py-2"
                />
              </div>
              <div>
                <label className="block mb-2 font-medium text-gray-700">Substitute Contact</label>
                <input
                  type="text"
                  name="substitute_teacher_contact"
                  value={formData.substitute_teacher_contact}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-4 py-2"
                />
              </div>
            </div>
          </div>
        )}

        {/* Comments */}
        <div>
          <label className="block mb-2 font-medium text-gray-700">Additional Comments (Optional)</label>
          <textarea
            name="comments"
            value={formData.comments}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-4 py-2 min-h-[80px]"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-md transition"
        >
          Submit Leave Request
        </button>
      </form>
    </div>
  );
}



