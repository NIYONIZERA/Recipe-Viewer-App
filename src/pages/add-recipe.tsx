// Form to add a new recipe
import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Recipe } from '../lib/types';
import { addStoredRecipe } from '../lib/storage';

// Form state for new recipe
interface FormData {
  title: string;
  image: string;
  ingredients: string;
  steps: string;
}

export default function AddRecipe() {
  const [formData, setFormData] = useState<FormData>({
    title: '',
    image: '',
    ingredients: '',
    steps: '',
  });
  const [error, setError] = useState('');
  const router = useRouter();

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validate inputs
    if (!formData.title.trim()) {
      setError('Title is required');
      return;
    }
    if (!formData.image.trim()) {
      setError('Image URL is required');
      return;
    }
    if (!formData.ingredients.trim()) {
      setError('At least one ingredient is required');
      return;
    }
    if (!formData.steps.trim()) {
      setError('At least one step is required');
      return;
    }

    // Create new recipe object
    const newRecipe: Recipe = {
      id: Date.now(),
      slug: formData.title.toLowerCase().replace(/\s+/g, '-'),
      title: formData.title,
      image: formData.image,
      ingredients: formData.ingredients.split('\n').filter((i) => i.trim()),
      steps: formData.steps.split('\n').filter((s) => s.trim()),
    };

    // Store in localStorage
    addStoredRecipe(newRecipe);
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-orange-600 mb-4">Add New Recipe</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-gray-700 font-medium mb-1">
              Recipe Title
            </label>
            <input
              type="text"
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="e.g., Chocolate Cake"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="image" className="block text-gray-700 font-medium mb-1">
              Image URL
            </label>
            <input
              type="text"
              id="image"
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="e.g., /images/cake.jpg"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="ingredients" className="block text-gray-700 font-medium mb-1">
              Ingredients (one per line)
            </label>
            <textarea
              id="ingredients"
              value={formData.ingredients}
              onChange={(e) => setFormData({ ...formData, ingredients: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
              rows={5}
              placeholder="e.g., 1 cup flour\n2 eggs"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="steps" className="block text-gray-700 font-medium mb-1">
              Preparation Steps (one per line)
            </label>
            <textarea
              id="steps"
              value={formData.steps}
              onChange={(e) => setFormData({ ...formData, steps: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
              rows={5}
              placeholder="e.g., Mix ingredients\nBake at 350°F"
            />
          </div>
          <button
            type="submit"
            className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700"
          >
            Add Recipe
          </button>
        </form>
        <Link href="/" className="mt-4 inline-block text-orange-500 hover:underline">
          Back to Home
        </Link>
      </div>
    </div>
  );
}