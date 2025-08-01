import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';

interface Image {
  id: number;
  title?: string;
  image_path: string;
}

interface Category {
  id: number;
  name: string;
  images: Image[];
}

interface PageProps {
  categories: Category[];
}

export default function Gallery({ categories }: PageProps) {
  const [title, setTitle] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [categoryId, setCategoryId] = useState<number | ''>('');
  const [newCategoryName, setNewCategoryName] = useState('');

  const handleCategorySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCategoryName.trim()) return;

    Inertia.post('/category', { name: newCategoryName }, {
      onSuccess: () => setNewCategoryName(''),
    });
  };

  const handleImageSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !image || !categoryId) {
      alert("Please fill all fields.");
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('image', image);
    formData.append('category_id', categoryId.toString());

    Inertia.post('/image', formData, {
      onSuccess: () => {
        setTitle('');
        setImage(null);
        setCategoryId('');
      },
    });
  };

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8">
      {/* Category Form */}
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-bold mb-4">🗂️ Add Category</h2>
        <form onSubmit={handleCategorySubmit} className="flex gap-4">
          <input
            type="text"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
            placeholder="Enter category name"
            className="flex-1 border px-3 py-2 rounded"
            required
          />
          <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
            Add
          </button>
        </form>
      </div>

      {/* Image Upload Form */}
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-bold mb-4">📸 Upload Image</h2>
        <form onSubmit={handleImageSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Category</label>
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(Number(e.target.value))}
              className="w-full border px-3 py-2 rounded"
              required
            >
              <option value="">-- Select Category --</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border px-3 py-2 rounded"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Image</label>
            <input
              type="file"
              onChange={(e) => setImage(e.target.files?.[0] || null)}
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

      {/* Render Images Grouped by Category */}
      <div className="space-y-12">
        {categories.map((category) => (
          <div key={category.id}>
            <h3 className="text-xl font-semibold mb-4 text-gray-800">{category.name}</h3>
            {category.images.length === 0 ? (
              <p className="text-gray-500 italic">No images uploaded in this category yet.</p>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {category.images.map((img) => (
                  <div key={img.id} className="border rounded shadow">
                    <img src={`/${img.image_path}`} alt={img.title || 'Untitled'} />

                    <div className="p-2 text-center text-sm text-gray-700">
                      {img.title || 'Untitled'}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
