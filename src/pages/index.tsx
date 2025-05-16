
// Home page with recipe list and search
import Link from 'next/link';
import { readFile } from 'fs/promises';
import path from 'path';
import { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import { Recipe } from '../lib/types';
import { getStoredRecipes } from '../lib/storage';

// Fetch static recipes at build time
export async function getStaticProps() {
  const filePath = path.join(process.cwd(), 'src', 'data', 'recipes.json');
  const jsonData = await readFile(filePath, 'utf-8');
  const recipes: Recipe[] = JSON.parse(jsonData);

  return {
    props: {
      initialRecipes: recipes,
    },
  };
}

interface HomeProps {
  initialRecipes: Recipe[];
}

export default function Home({ initialRecipes }: HomeProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [storedRecipes, setStoredRecipes] = useState<Recipe[]>([]);

  // Fetch stored recipes on client-side only
  useEffect(() => {
    setStoredRecipes(getStoredRecipes());
  }, []);

  const allRecipes = [...initialRecipes, ...storedRecipes];

  // Filter recipes based on search query
  const filteredRecipes = allRecipes.filter((recipe) =>
    recipe.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-orange-600 mb-4 text-center">Recipe Viewer</h1>
      <div className="flex justify-center mb-4">
        <Link href="/add-recipe" className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700">
          Add New Recipe
        </Link>
      </div>
      <div className="flex justify-center">
        <SearchBar onSearch={setSearchQuery} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {filteredRecipes.length ? (
          filteredRecipes.map((recipe) => (
            <Link key={recipe.id} href={`/recipes/${recipe.slug}`} className="block">
              <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-xl font-semibold text-gray-800">{recipe.title}</h2>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-center col-span-full text-gray-600">No recipes found.</p>
        )}
      </div>
    </div>
  );
}
  
