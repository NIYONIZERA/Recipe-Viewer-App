// Home page with recipe list and search
import Link from 'next/link';
import { readFile } from 'fs/promises';
import path from 'path';
import { useState } from 'react';
import SearchBar from '../components/SearchBar';
import { Recipe } from '../lib/types';

// Fetch static recipes at build time
export async function getStaticProps() {
  const filePath = path.join(process.cwd(), 'src', 'data', 'recipes.json');
  const jsonData = await readFile(filePath, 'utf-8');
  const recipes: Recipe[] = JSON.parse(jsonData);

  return {
    props: {
      recipes: recipes,
    },
  };
}

interface HomeProps {
  recipes: Recipe[];
}

export default function Home({ recipes }: HomeProps) {
  const [searchQuery, setSearchQuery] = useState('');

  // Filter recipes based on search query
  const filteredRecipes = recipes.filter((recipe) =>
    recipe.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-orange-600 mb-4 text-center">Recipe Viewer</h1>
      <div className="flex justify-center mb-6">
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
  
