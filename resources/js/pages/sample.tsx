import { router } from '@inertiajs/react'; // Import Inertia.js router for making API requests.
import { useEffect, useState } from 'react'; // Import React hooks for managing component state and effects.
import {Toaster ,toast } from 'sonner';

interface Post {
    id?: number; 
    
    file?: File; // Optional picture URL.
}

interface Props {
   
    post?: Post | null; 
}

export default function PostFormModel({  post }: Props) {
    // State to manage form data
    const [formData, setFormData] = useState<Post>({  });
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
 const [preview, setPreview] = useState<string>('');

    
    

    // Function to handle image file selection
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setSelectedFile(file); // Set the selected file
            setPreview(URL.createObjectURL(file)); // Generate preview URL
        }
    };

    // Function to handle form submission
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const data = new FormData();
        if (selectedFile) {
            data.append('file', selectedFile); // <-- match this with Laravel field name
        }
    
        router.post('/admin/import', data, {
            onSuccess: () => {
                toast.success('Users created successfully!');
                router.reload();
            },
            onError: (errors: any) => {
                console.error(errors);
                toast.error('Failed to submit post.');
            },
        });
    };

   

    return (
        <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black">
            {/* Modal wrapper with background overlay */}
            <div className="w-full max-w-xl rounded-lg bg-white p-6 shadow-lg">
                
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                   
                    <div className="mb-3">
                        <label className="block text-sm font-medium text-gray-700">Picture (optional)</label>
                        <input type="file" name="file" onChange={handleFileChange} className="w-full text-gray-700" accept=".xlsx,.xls" />
                    </div>
                    {/* Display image preview if an image is selected */}
                    {preview && (
                        <div className="mb-3">
                            <p className="mb-1 text-sm">Image Preview:</p>
                            <img src={preview} alt="Preview" className="h-32 w-32 rounded object-cover" />
                        </div>
                    )}
                    {/* Action buttons */}
                    <div className="flex justify-end gap-2">
                      
                        <button type="submit" className="rounded bg-blue-600 px-4 py-2 text-white">
                            {post ? 'Update' : 'Create'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
