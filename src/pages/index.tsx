import Link from 'next/link';
import Image from 'next/image';
import { readFile } from 'fs/promises';
import path from 'path';
import { useState } from 'react';
import SearchBar from '../components/SearchBar';
import { Recipe } from '../lib/types';
import { SignedIn, SignedOut, SignInButton } from '@clerk/nextjs';

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

  const filteredRecipes = recipes.filter((recipe) =>
    recipe.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <header className="max-w-4xl mx-auto mb-10 text-center">
        <h1 className="text-4xl font-extrabold text-orange-600 mb-2">
          Welcome to Recipe Viewer
        </h1>
        <p className="text-gray-700 text-lg max-w-xl mx-auto">
          Discover delicious recipes handpicked for you. Search your favorite dishes and get detailed steps to cook them perfectly.
        </p>
      </header>

      <SignedOut>
        <div className="max-w-md mx-auto text-center mt-16 bg-white p-8 rounded-lg shadow-lg">
          <p className="text-xl text-gray-700 mb-6">Please sign in to explore all our amazing recipes.</p>
          <SignInButton>
            <button className="bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-700 transition">
              Sign In
            </button>
          </SignInButton>
        </div>
      </SignedOut>

      <SignedIn>
        <div className="max-w-3xl mx-auto mb-8">
          <SearchBar onSearch={setSearchQuery} />
        </div>

        {filteredRecipes.length ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {filteredRecipes.map((recipe) => (
              <Link
                key={recipe.id}
                href={`/recipes/${recipe.slug}`}
                className="block group"
                passHref
              >
                <div className="bg-white rounded-lg shadow-md overflow-hidden border border-transparent group-hover:border-orange-500 hover:shadow-xl transition-transform transform hover:scale-105 cursor-pointer">
                  <div className="relative w-full h-48">
                    <Image
                      src={recipe.image}
                      alt={recipe.title}
                      layout="fill"
                      objectFit="cover"
                      className="transition-transform group-hover:scale-105"
                    />
                  </div>
                  <div className="p-5">
                    <h2 className="text-2xl font-semibold text-gray-900">{recipe.title}</h2>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="max-w-md mx-auto mt-20 bg-white p-8 rounded-lg shadow-md text-center">
            <p className="text-gray-600 text-lg mb-4">
              No recipes found matching &quot;<span className="italic">{searchQuery}</span>&quot;.
            </p>
            <button
              onClick={() => setSearchQuery('')}
              className="bg-orange-600 text-white px-5 py-2 rounded-md hover:bg-orange-700 transition"
            >
              Clear Search
            </button>
          </div>
        )}
      </SignedIn>
    </div>
  );
}


