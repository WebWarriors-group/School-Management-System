import { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';

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
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        Inertia.post('/teacher/leave/request', formData);
    };

    return (
        <div style={{ maxWidth: '800px', margin: '20px auto', padding: '30px', backgroundColor: '#f9f9f9', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
            <h3 style={{ fontSize: '24px', color: '#333', marginBottom: '20px' }}>Teacher Leave Request</h3>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '15px' }}>
                    <label style={{ fontSize: '16px', color: '#444', display: 'block', marginBottom: '8px' }}>Leave Type</label>
                    <input
                        type="text"
                        name="leave_type"
                        value={formData.leave_type}
                        onChange={handleChange}
                        required
                        style={{ width: '100%', padding: '12px', marginBottom: '15px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '14px', boxSizing: 'border-box' }}
                    />
                </div>

                <div style={{ marginBottom: '15px' }}>
                    <label style={{ fontSize: '16px', color: '#444', display: 'block', marginBottom: '8px' }}>Leave Start Date</label>
                    <input
                        type="date"
                        name="leave_start_date"
                        value={formData.leave_start_date}
                        onChange={handleChange}
                        required
                        style={{ width: '100%', padding: '12px', marginBottom: '15px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '14px', boxSizing: 'border-box' }}
                    />
                </div>

                <div style={{ marginBottom: '15px' }}>
                    <label style={{ fontSize: '16px', color: '#444', display: 'block', marginBottom: '8px' }}>Leave End Date</label>
                    <input
                        type="date"
                        name="leave_end_date"
                        value={formData.leave_end_date}
                        onChange={handleChange}
                        required
                        style={{ width: '100%', padding: '12px', marginBottom: '15px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '14px', boxSizing: 'border-box' }}
                    />
                </div>

                <div style={{ marginBottom: '15px' }}>
                    <label style={{ fontSize: '16px', color: '#444', display: 'block', marginBottom: '8px' }}>Reason for Leave</label>
                    <textarea
                        name="reason"
                        value={formData.reason}
                        onChange={handleChange}
                        required
                        style={{ width: '100%', padding: '12px', marginBottom: '15px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '14px', boxSizing: 'border-box', minHeight: '100px' }}
                    />
                </div>

                <div style={{ marginBottom: '15px' }}>
                    <label style={{ fontSize: '16px', color: '#444', display: 'block', marginBottom: '8px' }}>Requires Substitute?</label>
                    <input
                        type="checkbox"
                        name="requires_substitute"
                        checked={formData.requires_substitute}
                        onChange={(e) =>
                            setFormData({ ...formData, requires_substitute: e.target.checked })
                        }
                        style={{ marginRight: '8px' }}
                    />
                </div>

                {formData.requires_substitute && (
                    <div style={{ padding: '20px', backgroundColor: '#f0f0f0', borderRadius: '4px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', marginBottom: '15px' }}>
                        <h4 style={{ fontSize: '20px', fontWeight: 'bold' }}>Substitute Details</h4>
                        <div style={{ marginBottom: '15px' }}>
                            <label style={{ fontSize: '16px', color: '#444', display: 'block', marginBottom: '8px' }}>Substitute Teacher's Name</label>
                            <input
                                type="text"
                                name="substitute_teacher_name"
                                value={formData.substitute_teacher_name}
                                onChange={handleChange}
                                style={{ width: '100%', padding: '12px', marginBottom: '15px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '14px', boxSizing: 'border-box' }}
                            />
                        </div>

                        <div style={{ marginBottom: '15px' }}>
                            <label style={{ fontSize: '16px', color: '#444', display: 'block', marginBottom: '8px' }}>Substitute Teacher's Contact</label>
                            <input
                                type="text"
                                name="substitute_teacher_contact"
                                value={formData.substitute_teacher_contact}
                                onChange={handleChange}
                                style={{ width: '100%', padding: '12px', marginBottom: '15px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '14px', boxSizing: 'border-box' }}
                            />
                        </div>
                    </div>
                )}

                <div style={{ marginBottom: '15px' }}>
                    <label style={{ fontSize: '16px', color: '#444', display: 'block', marginBottom: '8px' }}>Comments (Optional)</label>
                    <textarea
                        name="comments"
                        value={formData.comments}
                        onChange={handleChange}
                        style={{ width: '100%', padding: '12px', marginBottom: '15px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '14px', boxSizing: 'border-box', minHeight: '100px' }}
                    />
                </div>

                <button
                    type="submit"
                    style={{
                        padding: '12px 20px',
                        backgroundColor: '#007bff',
                        color: 'white',
                        fontSize: '16px',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        width: '100%',
                        transition: 'background-color 0.3s',
                    }}
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#0056b3'}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#007bff'}
                >
                    Submit Leave Request
                </button>
            </form>
        </div>
    );
}
